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
        const signature = this.makeSignature(serviceId, secretKey, accessKey, timestamp);
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
            const tryBlockKey:string = id + 'tryblock'; //인증번호 일치 시도 횟수 초과여부
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
        
        return { status: state, message: '인증번호를 1분 30초안에 입력해주세요.'};
    }

    makeSignature(
        serviceId: string, secretKey: string,
        accessKey: string, timestamp: string): string {
        const space = " ";
        const newLine = "\n";
        const uri = `/sms/v2/services/${serviceId}/messages`;
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
    async checkDayCount(id: string): Promise<{status: string}> {

        const key: string = id + 'smscount'; //아이디 일일 횟수 key
        const dayCount: string = await this.redis.get(`${key}`); 
        //처음으로 보내는거면
        if (dayCount === null) {
            await this.redis.set(`${key}`, 1, {
                EX: 86400,
            })
            return {status: 'remain'};
        }
        //보낸 횟수가 4번 이하인경우
        else if( parseInt(dayCount) <= 2) {
            await this.redis.incr(`${key}`);
            return {status: 'remain'};
        } 
        //이미 보낸횟수가 5번인 경우 
        else {
            const key: string = id + 'blocktime';
            const blocktime: string = await this.redis.get(`${key}`);
            //5번째에서 시도한 경우
            if( blocktime === null) {
                const today:Date = new Date();
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
            ) ;
        }
    }
}

function getNewBlockTime( today: Date): string {
    const year: number= today.getFullYear();
    const month:number = today.getMonth() + 1;
    const date:number = today.getDate();
    const hours:number = today.getHours();
    const minute:number = today.getMinutes();
    const second: number = today.getSeconds();
    const newString:string = 
        year + '년' + month + '월' + date + '일 ' + 
            hours + '시' + minute + '분' + second + '초 ';
    return newString;
}