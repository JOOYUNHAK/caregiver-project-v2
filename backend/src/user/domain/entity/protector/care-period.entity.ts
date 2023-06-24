import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ValueTransformer } from "typeorm";
import { Patient } from "./patient.entity";
import { Time } from "src/common/shared/type/time.type";

@Entity('patient_care_period')
export class CarePeriod {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @OneToOne(() => Patient, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'patient_id' })
    readonly patientId: number;

    @Column({ type: 'timestamp', name: 'start_date',})
    private startDate: Time;

    @Column({ type: 'timestamp', name: 'end_date' })
    private endDate: Time;

    @Column({ type: 'tinyint', name: 'total_day' })
    private totalDay: number;

    constructor(startDate: Time, endDate: Time, totalDay: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalDay = totalDay;
    }
}
