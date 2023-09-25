import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatMessage } from "./chat-message.entity";

@Entity('care_application_code')
export class ApplicationCode {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @Column({ name: 'application_id', type: 'int' })
    private applicationId: number

    @OneToOne(() => ChatMessage, (message) => message.applicationCode)
    @JoinColumn({ referencedColumnName: 'id', name: 'message_id' })
    message: ChatMessage;
    
    constructor(applicationId: number) {
        this.applicationId = applicationId;
    };
}