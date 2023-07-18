import * as uuid from 'uuid';

/* UUID관련 Util 모음 */
export class UUIDUtil {
    static generateOrderedUuid(): string {
        const v1 = uuid.v1();
        const [timeStampHigh, timeStampMiddle, timeStampLow, fourth, fifth] = v1.split('-');
        return timeStampLow + timeStampMiddle + timeStampHigh + fourth + fifth;
    }

    static toBinaray(inputString: string): Buffer {
        return Buffer.from(inputString, 'hex');
    }

    static toString(inputBuffer: Buffer): string {
        return inputBuffer.toString('hex')
    }
}