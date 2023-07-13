import { ConfigService } from "@nestjs/config";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as Crypto from 'crypto';
import axios, { AxiosRequestHeaders } from "axios";
import { Message } from "../../domain/message";

@Injectable()
export class NaverSmsService {
    private accessKey: string;
    private secretKey: string;
    private serviceId: string;
    private from: string; // 발신번호
    private url: string;
    private uri: string; // signature만들 때 필요

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.accessKey = this.configService.get<string>('naver.sms.accessKey');
        this.secretKey = this.configService.get<string>('naver.sms.secretKey');
        this.serviceId = this.configService.get<string>('naver.sms.serviceId');
        this.from = this.configService.get<string>('naver.sms.from');
        this.url = `https://sens.apigw.ntruss.com/sms/v2/services/${this.serviceId}/messages`, 
        this.uri = `/sms/v2/services/${this.serviceId}/messages`;
    };

    async send(message: Message) {
        this.requestNaverApi(message, Date.now().toString());
    };

    /* Naver Cloud Api */
    private requestNaverApi(message: Message, timeStamp: string) {
        axios({
            method: 'POST',
            url: this.url,
            headers: this.setHeaders(timeStamp),
            data: this.setData(message)
        })
        .catch(err => {
            throw new InternalServerErrorException('네트워크 오류로 문자 발송에 실패했습니다.')
        })
    };

    /* 요청에 보낼 Header 구성 */
    private setHeaders(timeStamp: string): AxiosRequestHeaders {
        return {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': timeStamp,
            'x-ncp-iam-access-key': this.accessKey,
            'x-ncp-apigw-signature-v2': this.makeSignature(timeStamp),
        };
    };

    /* 요청에 보낼 Data 구성 */
    private setData(message: Message): any {
        return {
            type: 'SMS',
            contentType: 'COMM',
            conturyCode: '82',
            from: this.from,
            content: message.getContent(),
            messages:[{ to: message.getReceiver() }]
        }
    }

    /* Api에 명시되어 있는 형식 */
    private makeSignature(timeStamp: string): string {
        const space = " ";
        const newLine = "\n";
        const method = "POST";
        const hmac = Crypto.createHmac('sha256', this.secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(this.uri);
        hmac.update(newLine);
        hmac.update(timeStamp);
        hmac.update(newLine);
        hmac.update(this.accessKey);
        return hmac.digest('base64');
    }
}