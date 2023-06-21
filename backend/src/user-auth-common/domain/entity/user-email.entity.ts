import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Time } from "src/common/shared/type/time.type";

@Entity('user_email')
export class Email {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type: 'varchar', length: 50 })
    private email: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    private updatedAt: Time;
}