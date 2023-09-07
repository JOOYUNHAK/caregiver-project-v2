import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Time } from "src/common/shared/type/time.type";

@Entity('user_email')
export class Email {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User,(user) => user.email, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly user: User;

    @Column({ type: 'varchar', length: 50, nullable: true })
    private email: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    private updatedAt: Time;

    constructor(email: string) { this.email = email; };

    getEmail(): string { return this.email; };
}