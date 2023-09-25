import { Time } from "src/common/shared/type/time.type";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageType } from "../enum/chat-message-type.enum";
import { ChatRoom } from "./chat-room.entity";
import { ApplicationCode } from "./application-code.entity";

@Entity('chat_messages')
export class ChatMessage {
    @PrimaryGeneratedColumn('increment')
    private id: number;
    
    @Column({ type: 'int', name: 'room_id' })
    private roomId: number;
    
    @Column({ name: 'send_user_id' })
    private sendUserId: number;

    @Column({ name: 'receive_user_id' })
    private receiveUserId: number;

    @Column({ type: 'tinyint' })
    private type: number; 

    @Column({ type: 'varchar' })
    private content: string;

    @Column({ type: 'boolean', name: 'is_read' })
    private isRead: boolean;

    @ManyToOne(() => ChatRoom, (room) => room.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'room_id'})
    room: ChatRoom;

    @OneToOne(() => ApplicationCode, (code) => code.message, { cascade: ['insert'], nullable: true })
    applicationCode: ApplicationCode

    @CreateDateColumn({ name: 'sended_at', type: 'timestamp' })
    private sendedAt: Time;

    constructor(
        from: number, to: number, type: MessageType, 
        content: string) {
            this.sendUserId = from;
            this.receiveUserId = to;
            this.type = type;
            this.content = content;
            this.isRead = false;
    }

    withApplicationCode(applicationId: number): this { 
        this.applicationCode = new ApplicationCode(applicationId);
        return this;
    };
};