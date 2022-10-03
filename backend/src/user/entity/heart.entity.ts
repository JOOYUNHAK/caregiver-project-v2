import { User } from 'src/auth/entity/user.entity';
import { CareGiver } from 'src/auth/entity/register.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity('heart')
export class Heart {
    @PrimaryGeneratedColumn('increment')
    seq: number

    @Column({ type: 'varchar' })

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user_id: User

    @ManyToOne(() => CareGiver, (careGiver) => careGiver.id)
    @JoinColumn({
        name: 'heart_id',
        referencedColumnName: 'id'
    })
    heart_id: CareGiver
}