import { User } from 'src/auth/entity/user.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { Room } from './room.entity';

@Entity('room_member')
export class RoomMember {

    @PrimaryColumn('tinyint')
    @ManyToOne(() => Room, (room) => room.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'room_id',
        referencedColumnName: 'id'
    })
    room_id: Room

    @Index()
    @PrimaryColumn({ type: 'varchar', length: 11 })
    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user_id: string

}