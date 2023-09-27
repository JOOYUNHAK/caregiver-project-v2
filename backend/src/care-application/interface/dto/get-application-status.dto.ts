import { ApplicationStatus } from "src/chat/domain/enum/application-status.enum";

export class GetApplicationStatusDto {
    id: number;
    status: ApplicationStatus;

    /* Test */
    static of(applicationId: number): GetApplicationStatusDto {
        return {
            id: applicationId,
            status: ApplicationStatus.REQUESTED
        };
    }
}