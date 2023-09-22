import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApplicationStatus } from "../../chat/domain/enum/application-status.enum";
import { Time } from "src/common/shared/type/time.type";

@Entity('care_application')
@Index(["protectorId", "caregiverId"])
export class CareApplication {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @Column({ name: 'protector_id' })
    private protectorId: number; // 신청한 보호자 아이디

    @Column({ name: 'caregiver_id' })
    private caregiverId: number; // 신청 받은 간병인 아이디

    @Column({ type: 'tinyint' })
    private status: ApplicationStatus;
    
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    private createdAt: Time;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    private updatedAt: Time;

    constructor(protectorId: number, caregiverId: number) {
        this.protectorId = protectorId;
        this.caregiverId = caregiverId;
        this.status = ApplicationStatus.REQUESTED;
    }

    getApplyUserId(): number { return this.protectorId; };
    getCaregiverId(): number { return this.caregiverId; };
}