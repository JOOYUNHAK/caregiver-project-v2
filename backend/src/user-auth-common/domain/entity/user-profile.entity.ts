import { CreateColumnEntity } from "src/common/shared/entity/base-time.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class UserProfile extends CreateColumnEntity {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type: 'int' })
    private birth: number;

    @Column({ type: 'tinyint' })
    private sex: SEX;

    constructor(id: number, userId: number, birth: number, sex: SEX) {
        super();
        this.id = id;
        this.userId = userId;
        this.birth = birth;
        this.sex = sex;
    }
}