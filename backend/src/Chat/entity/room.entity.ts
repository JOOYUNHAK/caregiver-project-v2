import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { RoomMember } from './room-member.entity';

@Entity('room')
export class Room {
    @PrimaryGeneratedColumn('increment')
    id: number

    // null: 처음 기본 상태, -1: 거절, 1: 프로필 확인, 2: 수락
    @Column({ type: 'tinyint', default: null })
    profile_state: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date

    @OneToMany(() => RoomMember, (roomMember) => roomMember.room_id, {
        cascade: ['insert'],
    })
    roomMember: RoomMember []

    @OneToMany(() => Message, (message) => message.room_id, {
        cascade: ['insert']
    })
    messages: Message []
}