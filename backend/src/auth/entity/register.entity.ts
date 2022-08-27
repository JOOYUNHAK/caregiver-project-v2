import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export abstract class Common {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'varchar', length: 30 })
    suction: string;

    @Column({ type: 'varchar', length: 30 })
    toilet: string;

    @Column({ type: 'varchar', length: 30 })
    bedsore: string;

    @Column({ type: 'varchar', length: 30 })
    washing: string;
}

@Entity('caregiver')
export class CareGvier extends Common {

    @Column({ type: 'smallint' })
    weight: number;

    @Column({ type: 'smallint' })
    career: number;

    @Column({ type: 'varchar', length: 15 })
    pay: string;

    @Column({ type: 'varchar', length: 15 })
    startDate: string

    @Column({ type: 'varchar', length: 25 })
    nextHospital: string;

    @Column({ type: 'varchar', length: 50 })
    possibleArea: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    license: string;

    @Column({ type: 'simple-json', nullable: true })
    strength: { strength1: string, strength2: string }

    @Column({ type: 'varchar', length: 15 })
    keywords: string;

    @Column({ type: 'varchar', length: 30 })
    notice: string

    @OneToOne(() => User, (user) => user.birth, {
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

@Entity('protector')
export class Protector extends Common {

    @Column()
    patientWeight: number

    @Column()
    patientSex: string

    @Column({type: 'varchar', length: 25})
    diagnosis: string

    @Column({type: 'varchar', length: 12})
    place: string

    @Column()
    isNext: string

    @Column({type: 'varchar', length: 100})
    patientState: string
    
    @Column({type: 'varchar', length: 30, nullable: true})
    meal: string

    @Column({type: 'varchar', length: 30, nullable: true})
    bathChair: string

    //단방향 OneToOne
    @OneToOne( () => User, ( user ) => user.birth, {
        cascade: ['insert']
    } )
    @JoinColumn({
        //name: 'user_id'
        //referencedColumnName: 'id'
        name: 'birth_id',
        referencedColumnName: 'birth'
    })
    user: User
}

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