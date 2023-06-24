import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Protector } from "./protector.entity";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { CarePeriod } from "./care-period.entity";

@Entity('patient')
export class Patient {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @OneToOne(() => Protector, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'protector_id' })
    readonly protectorId: number;

    @Column({ type: 'smallint' })
    private weight: number;

    @Column({ type: 'char', length: 1 })
    private sex: SEX;

    @Column({ type: 'varchar', length: 50 }) 
    private diagnosis: string;

    @Column({ type: 'varchar', length: 50, name: 'care_place' })
    private carePlace: string;

    @OneToOne(() => CarePeriod, (period) => period.patientId, { cascade: ['insert', 'update'], eager: true },)
    private carePeriod: CarePeriod;

    @Column({ type: 'boolean', name: 'next_hospital' })
    private nextHospital: boolean;

    @Column({ type: 'varchar', length: 100, name: 'detailed_condition' })
    private detailedCondition: string;

    @Column({ type: 'text', name: 'help_list', nullable: true })
    private helpList: string;

    constructor(
        weight: number, sex: SEX, diagnosis: string, carePlace: string, carePeriod: CarePeriod,
        nextHospital: boolean, detailedCondition: string, helpListDetail: string
    ) {
        this.weight = weight;
        this.sex = sex;
        this.diagnosis = diagnosis;
        this.carePlace = carePlace;
        this.carePeriod = carePeriod;
        this.nextHospital = nextHospital;
        this.detailedCondition = detailedCondition;
        this.helpList = helpListDetail;
    };
}