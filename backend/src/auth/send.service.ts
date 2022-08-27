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
    async sms(id: string): Promise<string> {

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
                'EX': 180
            })
        })
            .catch((err) => {
                console.log(err.response)
                throw new HttpException(
                    '네트워크 오류로 문자 발송에 실패했습니다',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            })
            
        return '인증번호를 3분안에 입력해주시기 바랍니다.';
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
    async checkDayCount(id: string): Promise<boolean> {

        const key: string = id + 'smscount'; //아이디 일일 횟수 key
        const dayCount: string = await this.redis.get(`${key}`); 
        //처음으로 보내는거면
        if (dayCount === null) {
            await this.redis.set(`${key}`, 1, {
                EX: 86400,
            })
            return true;
        }
        //보낸 횟수가 4번 이하인경우
        else if( parseInt(dayCount) <= 4) {
            await this.redis.incr(`${key}`);
            return true;
        }
        //이미 보낸횟수가 5번인 경우 
        else 
            return false;
    }
}
