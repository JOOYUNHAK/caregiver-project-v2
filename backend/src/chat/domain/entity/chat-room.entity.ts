import { Time } from "src/common/shared/type/time.type";
import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { ChatMessage } from "./chat-message.entity";

@Entity('chat_room')
export class ChatRoom {
    
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToMany(() => Participant, (participant) => participant.room, { cascade: ['insert'] })
    participants: Participant [];

    @OneToMany(() => ChatMessage, (message) => message.room, { cascade: ['insert'] })
    messages: ChatMessage []

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', select: false })
    private createdAt: Time;


    getId(): number { return this.id; };
    
    /* 채팅방 개설 */
    static start(
        member1: Participant, member2: Participant, applicationMessage: ChatMessage
    ): ChatRoom {
        const newRoom = new ChatRoom();
        newRoom.participants = [member1, member2];
        newRoom.messages = [applicationMessage];
        return newRoom;
    };
}