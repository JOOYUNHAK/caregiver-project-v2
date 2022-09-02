import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('token')
export class Token {
    @PrimaryGeneratedColumn('increment')
    index: number

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string
}