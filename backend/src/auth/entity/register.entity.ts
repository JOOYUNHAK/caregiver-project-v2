import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('caregiver')
export class CareGvier {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'int' })
    weight: number;

    @Column({ type: 'int' })
    career: number;

    @Column({ type: 'varchar', length: 15 })
    pay: string;

    @Column({ type: 'char', length: 1 })
    startDate: string

    @Column({ type: 'varchar', length: 25 })
    nextHospital: string;

    @Column({ type: 'varchar', length: 50 })
    possibleArea: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    license: string;

    @Column({ type: 'varchar', length: 30 })
    suction: string;

    @Column({ type: 'varchar', length: 30 })
    toilet: string;

    @Column({ type: 'varchar', length: 30 })
    bedsore: string;

    @Column({ type: 'varchar', length: 30 })
    washing: string;

    @Column({ type: 'simple-json', nullable: true })
    strength: { strength1: string, strength2: string }

    @Column({ type: 'varchar', length: 15 })
    keywords: string;

    @Column({ type: 'varchar', length: 30 })
    notice: string;

    @Column({ type: 'varchar', length: 100})
    extraFee: string;

    @OneToOne(() => User, (user) => user.id, {
        cascade: ['insert']
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User
}

@Entity('protector')
export class Protector {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'int' })
    patientWeight: number

    @Column( { type: 'char', length: 2 })
    patientSex: string

    @Column({type: 'varchar', length: 25})
    diagnosis: string

    @Column({type: 'varchar', length: 25})
    period: string

    @Column({type: 'varchar', length: 40})
    place: string

    @Column({ type: 'char', length: 2 })
    isNext: string

    @Column({type: 'varchar', length: 100})
    patientState: string

    @Column({type: 'varchar', length: 30, nullable: true})
    suction: string;

    @Column({type: 'varchar', length: 30, nullable: true})
    toilet: string;

    @Column({type: 'varchar', length: 30, nullable: true})
    bedsore: string;

    @Column({type: 'varchar', length: 30, nullable: true})
    washing: string;
    
    @Column({type: 'varchar', length: 30, nullable: true})
    meal: string

    @Column({type: 'varchar', length: 30, nullable: true})
    bathChair: string

    //단방향 OneToOne
    @OneToOne( () => User, ( user ) => user.id, {
        cascade: ['insert']
    } )
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User
}

@Entity('assistant')
export class Assistant {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'int' })
    weight: number;

    @Column({ type: 'int' })
    career: number;

    @Column({ type: 'varchar', length: 20 })
    time: string;

    /* @Column({ type: 'varchar', length: 8 })
    startDate: string; */

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

    @Column({ type: 'varchar', length: 15, nullable: true })
    keywords: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    notice: string

    @OneToOne(() => User, ( user ) => user.id, {
        cascade: ['insert']
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User
}