import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 11})
    id: string

    @Column()
    name: string

    @Column()
    birth: string

    @Column({type: 'varchar', length: 7})
    sex: string

    @Column({type: 'varchar', length: 6})
    purpose: string

    @Column({default: false})
    isCertified: boolean
}
