export class RedisMessageValueDto {
    messageSeq: number;
    type: number;
    visible: string;
    content: string;
    sendId: string
    time: Date;
}