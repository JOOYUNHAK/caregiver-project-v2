import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('caregiver')
export class CareGvier {
    
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type: 'smallint'})
    weight: number;

    @Column({type: 'smallint'})
    career: number;

    @Column({type: 'varchar', length: 15})
    pay: string;

    @Column({type: 'varchar', length: 15})
    startDate: string

    @Column({type: 'varchar', length: 25})
    nextHospital: string;

    @Column({type: 'varchar', length: 50})
    possibleArea: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    license: string;

    @Column({type: 'varchar', length: 30})
    suction: string;

    @Column({type: 'varchar', length: 30})
    toilet: string;

    @Column({type: 'varchar', length: 30})
    bedsore: string;

    @Column({type: 'varchar', length: 30})
    washing: string;

    @Column({type: 'varchar', length: 30, nullable: true})
    strength1: string;

    @Column({type: 'varchar', length: 30, nullable: true})
    strength2: string;

    @Column({type: 'varchar', length: 15})
    keywords: string;

    @Column({type: 'varchar', length: 30})
    notice: string

    @OneToOne( () => User, ( user ) => user.birth, {
        cascade: ['insert']
    })
    @JoinColumn({
        name: 'birth_id',
        referencedColumnName: 'birth'
    })
    user: User
}