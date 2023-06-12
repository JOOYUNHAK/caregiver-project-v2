import { BadRequestException } from "@nestjs/common";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { Time } from "src/common/shared/type/time.type";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_phone')
export class Phone {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type :'varchar', length: 11, name: 'phone_number' })
    readonly phoneNumber: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    private updatedAt: Time;

    constructor(userId: number, phoneNumber: string) {
        this.userId = userId;
        this.phoneNumber = phoneNumber;
    };

    static validate(phoneNumber: string): void {
        const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
        if( !phoneRegExp.test(phoneNumber) )
            throw new BadRequestException(ErrorMessage.PhoneNumberFormat);
    }

    getPhoneNumber(): string { return this.phoneNumber; };
}