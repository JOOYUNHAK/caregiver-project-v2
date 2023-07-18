import { UUIDUtil } from "src/util/uuid.util";
import { ValueTransformer } from "typeorm";

export class UUIDTransformer implements ValueTransformer {
    to(entityValue: string): Buffer {
        return UUIDUtil.toBinaray(entityValue);
    };

    from(databaseValue: Buffer): string {
        return UUIDUtil.toString(databaseValue);
    }
};