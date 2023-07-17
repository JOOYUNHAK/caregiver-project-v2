import * as uuid from 'uuid';

/* UUID관련 Util 모음 */
export class UUIDUtil {
    static generatedUuidV1(): string {
        return uuid.v1();
    }
}