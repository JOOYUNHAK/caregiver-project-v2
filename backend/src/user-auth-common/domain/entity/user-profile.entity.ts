import { Time } from "src/common/shared/type/time.type";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_profile')
export class UserProfile {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type: 'int' })
    private birth: number;

    @Column({ type: 'tinyint' })
    private sex: SEX;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    private updatedAt: Time;

}