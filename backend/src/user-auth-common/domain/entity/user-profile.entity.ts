import { User } from "src/user-auth-common/domain/entity/user.entity";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class UserProfile {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type: 'int' })
    private birth: number;

    @Column({ type: 'char', length: 1 })
    private sex: SEX;

    constructor(birth: number, sex: SEX) {
         this.birth = birth;
         this.sex = sex;
    }
}