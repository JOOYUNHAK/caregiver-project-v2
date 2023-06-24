import { User } from "src/user-auth-common/domain/entity/user.entity";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";

@Entity('protector')
export class Protector {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE', cascade: ['insert', 'update'], eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly user: User;

    @OneToOne(() => Patient, (patient) => patient.protectorId, { cascade: ['insert', 'update'] })
    private patient: Promise<Patient>;

    constructor(user: User, patient: Patient) {
        this.user = user;
        this.patient = Promise.resolve(patient);
    }

    getId(): number { return this.id; };
    getUser(): User { return this.user; };

    /* 새로 발급받은 Token들 */
    async setAuthentication(authentication: NewUserAuthentication) { this.user.setAuthentication(authentication) };
}