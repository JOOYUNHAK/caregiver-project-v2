import { getRepositoryToken } from "@nestjs/typeorm";
import { CareApplication } from "src/care-application/domain/care-application.entity";

/* Mocking CareApplication Repository */
export const MockCareApplicationRepo = {
    provide: getRepositoryToken(CareApplication),
    useValue: {
        save: jest.fn(),
        findRecentApplicationFromIds: jest.fn(),
    }
}