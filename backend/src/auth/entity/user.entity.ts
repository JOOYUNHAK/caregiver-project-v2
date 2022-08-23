import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
    @Column({ type: 'varchar', length: 11})
    id: string

    @Column()
    name: string

    @PrimaryColumn()
    birth: string

    @Column({type: 'varchar', length: 7})
    sex: string

    @Column({type: 'varchar', length: 6})
    purpose: string

    @Column({default: false})
    isCertified: boolean

    @CreateDateColumn()
    createDate: Date
}
