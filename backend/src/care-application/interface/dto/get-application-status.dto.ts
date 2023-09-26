import { ApplicationStatus } from "src/chat/domain/enum/application-status.enum";

export interface GetApplicationStatusDto {
    id: number;
    status: ApplicationStatus;
}