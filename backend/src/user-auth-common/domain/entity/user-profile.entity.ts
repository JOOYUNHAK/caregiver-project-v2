import { User } from "src/user-auth-common/domain/entity/user.entity";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class UserProfile {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @ManyToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    readonly user: User;

    @Column({ type: 'int' })
    private birth: number;

    @Column({ type: 'char', length: 1 })
    private sex: SEX;

    constructor(birth: number, sex: SEX) {
         this.birth = birth;
         this.sex = sex;
    }

    getBirth() : number { return this.birth; };
    getSex(): SEX { return this.sex; };
}