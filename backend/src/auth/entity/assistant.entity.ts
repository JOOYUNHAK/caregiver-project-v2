import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('assistant')
export class Assistant {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'smallint' })
    weight: number;

    @Column({ type: 'smallint' })
    career: number;

    @Column({ type: 'varchar', length: 20 })
    time: string;

    @Column({ type: 'varchar', length: 20 })
    startDate: string;

    @Column({ type: 'char', length: 2 })
    training: string;

    @Column({ type: 'varchar', length: 50 })
    possibleArea: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    license: string;

    @Column({ type: 'simple-json', nullable: true })
    strength: { strength1: string, strength2: string }

    @Column({ type: 'varchar', length: 30 })
    withPatient: string;

    @OneToOne(() => User, ( user ) => user.birth, {
        cascade: ['insert']
    })
    @JoinColumn({
        //name: 'user_id'
        //referencedColumnName: 'id'
        name: 'birth_id',
        referencedColumnName: 'birth'
    })
    user: User
}