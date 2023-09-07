import { Time } from "src/common/shared/type/time.type";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_phone')
export class Phone {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, (user) => user.phone, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly user: User;

    @Index()
    @Column({ type :'varchar', length: 11, name: 'phone_number' })
    readonly phoneNumber: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    private updatedAt: Time;

    constructor(phoneNumber: string) { this.phoneNumber = phoneNumber; };
    
    getPhoneNumber(): string { return this.phoneNumber; };
}