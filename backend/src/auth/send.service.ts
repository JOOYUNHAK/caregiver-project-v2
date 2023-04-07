import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Crypto from 'crypto';
import axios from "axios";
import { RedisClientType } from "redis";

@Injectable()
export class SendService {
    constructor(
        private configService: ConfigService,
        @Inject('REDIS_CLIENT')
        private redis: RedisClientType
    ) { }

    //문자발송 서비스
    async sms(id: string, state: string): Promise<{ status: string, message: string }> {

        const accessKey = this.configService.get<string>('naver.sms.accessKey');
        const secretKey = this.configService.get<string>('naver.sms.secretKey');
        const serviceId = this.configService.get<string>('naver.sms.serviceId');
        const myPhoneNumber = this.configService.get<string>('naver.sms.myPhoneNumber');
        const timestamp = Date.now().toString();
        const signature = this.makeSignature(secretKey, accessKey, timestamp, serviceId);
        const authCode = Math.floor(Math.random() * 900000 + 100000);

        await axios({
            method: 'POST',
            url: `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-ncp-apigw-timestamp': timestamp,
                'x-ncp-iam-access-key': accessKey,
                'x-ncp-apigw-signature-v2': signature,
            },
            data: {
                type: 'SMS',
                contentType: 'COMM',
                conturyCode: '82',
                from: myPhoneNumber,
                content: `[믿음으로]\n인증번호 [${authCode}]를 입력해주세요.`,
                messages: [
                    {
                        to: id
                    }
                ]
            },
        }).then(async (res) => {
            //문자 발송에 성공했으면 인증번호 저장
            await this.redis.set(`${id}`, `${authCode}`, {
                'EX': 90
            });
            const tryBlockKey: string = id + 'tryblock'; //인증번호 일치 시도 횟수 초과여부
            const tryCountKey: string = id + 'trycount'; //인증번호 일치 시도 횟수

            await this.redis.del(`${tryBlockKey}`); //그 전 기록 삭제
            await this.redis.del(`${tryCountKey}`);
        })
            .catch((err) => {
                throw new HttpException(
                    '네트워크 오류로 문자 발송에 실패했습니다',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            })

        return { status: state, message: '인증번호를 1분 30초안에 입력해주세요.' };
    }

    //문자발송 서비스
    async email(email: string, state: string): Promise<{ status: string, message: string }> {

        const accessKey = this.configService.get<string>('naver.email.accessKey');
        const secretKey = this.configService.get<string>('naver.email.secretKey');
        const myEmailAddress = this.configService.get<string>('naver.email.myEmailAddress');
        const language = this.configService.get<string>('naver.email.language');
        const timestamp = Date.now().toString();
        const signature = this.makeSignature(secretKey, accessKey, timestamp);
        const authCode = Math.floor(Math.random() * 900000 + 100000);

        await axios({
            method: 'POST',
            url: `https://mail.apigw.ntruss.com/api/v1/mails`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-ncp-apigw-timestamp': timestamp,
                'x-ncp-iam-access-key': accessKey,
                'x-ncp-apigw-signature-v2': signature,
                'x-ncp-lang': language
            },
            data: {
                senderAddress: myEmailAddress,
                senderName: '믿음으로',
                title: '믿음으로 이메일 인증번호 입니다.',
                body: `인증번호 [${authCode}]를 1분 30초 안에 입력해주세요.`,
                recipients: [
                    {
                        address: email,
                        type: 'R'
                    }
                ]
            },
        }).then(async (res) => {
            //문자 발송에 성공했으면 인증번호 저장
            await this.redis.set(`${email}`, `${authCode}`, {
                'EX': 90
            });
            const tryBlockKey: string = email + 'tryblock'; //인증번호 일치 시도 횟수 초과여부
            const tryCountKey: string = email + 'trycount'; //인증번호 일치 시도 횟수

            await this.redis.del(`${tryBlockKey}`); //그 전 기록 삭제
            await this.redis.del(`${tryCountKey}`);
        })
            .catch((err) => {
                console.log(err.response)
                throw new HttpException(
                    '네트워크 오류로 문자 발송에 실패했습니다',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            })

        return { status: state, message: '메일로 전송된 6자리 번호를 1분 30초 안에 입력해주세요' };
    }

    makeSignature(
        secretKey: string, accessKey: string,
        timestamp: string, serviceId?: string): string {
        let uri: string;

        if (serviceId !== undefined)
            uri = `/sms/v2/services/${serviceId}/messages`;
        else
            uri = "/api/v1/mails";

        const space = " ";
        const newLine = "\n";
        const method = "POST";
        const hmac = Crypto.createHmac('sha256', secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(uri);
        hmac.update(newLine);
        hmac.update(timestamp);
        hmac.update(newLine);
        hmac.update(accessKey);
        return hmac.digest('base64')
    };

    //일일 최대 문자 인증 횟수 체크
    async checkDayCount(id: string): Promise<{ status: string }> {

        let key: string;

        if (id.includes('@'))
            key = id + 'emailcount';
        else
            key = id + 'smscount';

        const dayCount: string = await this.redis.get(`${key}`);
        //처음으로 보내는거면
        if (dayCount === null) {
            await this.redis.set(`${key}`, 1, {
                EX: 86400,
            })
            return { status: 'remain' };
        }
        //보낸 횟수가 4번 이하인경우
        else if (parseInt(dayCount) <= 2) {
            await this.redis.incr(`${key}`);
            return { status: 'remain' };
        }
        //이미 보낸횟수가 5번인 경우 
        else {
            const key: string = id + 'blocktime';
            const blocktime: string = await this.redis.get(`${key}`);
            //5번째에서 시도한 경우
            if (blocktime === null) {
                const today: Date = new Date();
                today.setSeconds(today.getSeconds() + 86400);
                const newBlockTime = getNewBlockTime(today);
                await this.redis.set(`${key}`, `${newBlockTime}`, {
                    'EX': 86400
                });
                throw new HttpException(
                    `횟수 초과, ${newBlockTime}이후에 다시 시도해 주세요`,
                    HttpStatus.FORBIDDEN
                );
            }
            throw new HttpException(
                `횟수 초과, ${blocktime}이후에 다시 시도해 주세요`,
                HttpStatus.FORBIDDEN
            );
        }
    }
}

function getNewBlockTime(today: Date): string {
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1;
    const date: number = today.getDate();
    const hours: number = today.getHours();
    const minute: number = today.getMinutes();
    const second: number = today.getSeconds();
    const newString: string =
        year + '년' + month + '월' + date + '일 ' +
        hours + '시' + minute + '분' + second + '초 ';
    return newString;
}