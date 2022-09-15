import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Token } from "./token.entity";

@Entity('user')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 11})
    id: string

    @Column({ type: 'varchar', length: 30, nullable: true})
    email: string

    @Column({ type: 'varchar', length: 5})
    name: string

    @Column({ type: 'char', length: 8})
    birth: string

    @Column({type: 'varchar', length: 7})
    sex: string

    @Column({type: 'varchar', length: 6})
    purpose: string

    @Column({ default: false })
    isCertified: boolean

    @Column({ type: 'int', default: 0 })
    warning: number

    @Column({ default: false })
    profile_off: boolean

    @CreateDateColumn()
    createDate: Date

    @Column({type: 'int'})
    token_index: number

    @OneToOne(() => Token, (token) => token.index, {
        cascade: ['insert', 'update', 'remove'],
    })
    @JoinColumn({
        name: 'token_index',
        referencedColumnName: 'index'
    })
    token: Token
}
