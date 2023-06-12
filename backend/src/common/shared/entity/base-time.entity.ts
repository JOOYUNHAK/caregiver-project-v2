import { CreateDateColumn } from "typeorm";
import { Time } from "../type/time.type";

export class CreateColumnEntity {
    @CreateDateColumn({ name: 'created_at'})
    private createdAt: Time;

    getCreatedTime(): Time { return this.createdAt; };
};

export class UpdateColumnEntity {
    @CreateDateColumn({ name: 'updated_at'})
    private updatedAt: Time;

    getUpdatedTime(): Time { return this.updatedAt; };
};
