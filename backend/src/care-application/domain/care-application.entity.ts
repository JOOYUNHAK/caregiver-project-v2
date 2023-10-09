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

    getId(): number { return this.id; };
    getApplyUserId(): number { return this.protectorId; };
    getCaregiverId(): number { return this.caregiverId; };
    getStatus(): ApplicationStatus { return this.status; };
    
    watched() { this.status = ApplicationStatus.WATCHED; };
    rejected() { this.status = ApplicationStatus.REJECTED; };

    /* 해당 사용자가 가장 최근에 신청한 내역이 완료됐는지 */
    isCompleted(): boolean {
        return (this.status == ApplicationStatus.REQUESTED || this.status == ApplicationStatus.WATCHED ) ? false : true;
    }
}