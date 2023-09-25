import { Repository } from "typeorm";
import { ChatMessage } from "../entity/chat-message.entity";

export interface ChatMessageRepository extends Repository<ChatMessage> {};