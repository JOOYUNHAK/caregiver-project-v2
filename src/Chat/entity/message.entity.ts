import { User } from 'src/auth/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity('message')
export class Message {

    @PrimaryGeneratedColumn('increment')
    seq: number

    @Column('tinyint')
    @ManyToOne(() => Room, (room) => room.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'room_id',
        referencedColumnName: 'id'
    })
    room_id: Room

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'send_id',
        referencedColumnName: 'id'
    })
    send_id: string
/* 
    @ManyToOne(() => User)
    @JoinColumn({
        name: 'receive_id',
        referencedColumnName: 'id'
    })
    receive_id: string */

    // null: 둘 다 볼 수 있는 상태, -1: 두명 다 방 나간 상태, 1: 신청서 마감인 상태
    // 해당 유저 아이디: 해당 유저 아이디만 볼 수 있는 상태
    @Column({ type: 'varchar', length: 35, default: null })
    visible: string

    //0이면 신청 메시지, 1이면 일반 메시지, -1이면 거절, 2이면 승락
    @Column({ type: 'tinyint', default: 0 })
    type: number

    @Column({ type: 'varchar', nullable: true })
    content: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    send_date: Date

}