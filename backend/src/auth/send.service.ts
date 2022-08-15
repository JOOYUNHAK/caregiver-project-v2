import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Crypto from 'crypto';
import axios from "axios";
import { Cache } from "cache-manager";

@Injectable()
export class SendService {
    constructor(
        private configService: ConfigService,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

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
        })
            .catch((err) => {
                console.log(err.response)
                throw new HttpException(
                    '네트워크 오류로 문자 발송에 실패했습니다',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            })
        await this.cacheManager.set(`${id}`, `${authCode}`, { ttl: 180 })
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
    
}