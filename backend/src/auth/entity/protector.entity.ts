import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('protector')
export class Protector {
    @PrimaryGeneratedColumn('uuid')
    id: number

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
    suction: string

    @Column({type: 'varchar', length: 30, nullable: true})
    toilet: string

    @Column({type: 'varchar', length: 30, nullable: true})
    bedsore: string

    @Column({type: 'varchar', length: 30, nullable: true})
    meal: string

    @Column({type: 'varchar', length: 30, nullable: true})
    washing: string

    @Column({type: 'varchar', length: 30, nullable: true})
    bathChair: string

    //단방향 OneToOne
    @OneToOne( () => User, ( user ) => user.birth, {
        cascade: ['insert']
    } )
    @JoinColumn({
        name: 'birth_id',
        referencedColumnName: 'birth'
    })
    user: User
}