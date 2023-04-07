import { User } from 'src/auth/entity/user.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity('payment')
export class Payment {
    @PrimaryColumn({ type: 'varchar', length: 11 })
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user_id: string

    @Column({ type: 'varchar', length: 10 })
    method: string

    @Column('int')
    price: number

    @Column({type: 'varchar', length: 30 })
    bootpay_id: string

    @Column({ type: 'varchar', length: 30 })
    order_id: string

    @Column({ type: 'datetime'})
    requested_at: Date

    @Column({ type: 'datetime' })
    purchased_at: Date
}