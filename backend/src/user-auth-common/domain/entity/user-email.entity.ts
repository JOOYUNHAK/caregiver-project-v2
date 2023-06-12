import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UpdateColumnEntity } from "src/common/shared/entity/base-time.entity";

@Entity('user_email')
export class Email extends UpdateColumnEntity {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type: 'varchar', length: 50 })
    private email: string;

    constructor(id: number, userId: number, email: string) {
        super();
        this.id = id;
        this.userId = userId;
        this.email = email;
    };
}