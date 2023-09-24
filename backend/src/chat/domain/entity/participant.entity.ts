import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatRoom } from "./chat-room.entity";

@Entity('chat_room_participant')
export class Participant {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @Column({ name: 'user_id' })
    private userId: number;

    @ManyToOne(() => ChatRoom, (room) => room.participants, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'room_id' })
    room: ChatRoom;

    constructor(userId: number) { this.userId = userId; };

    getParticipantId(): number { return this.userId; };
 }