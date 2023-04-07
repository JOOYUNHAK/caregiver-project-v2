import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('token')
export class Token {
    @PrimaryGeneratedColumn('increment')
    @OneToOne(() => User, (user) => user.token_index, {
        onDelete: 'CASCADE'
    })
    index: number

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string
}