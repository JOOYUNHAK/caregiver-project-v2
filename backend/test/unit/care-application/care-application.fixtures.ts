import { CareApplication } from "src/care-application/domain/care-application.entity";

export class ApplicationFixtures {
    static watchedApplication() {
        const application = new CareApplication(1, 10);
        application.watched();
        return application;
    }

    static rejectedApplication() {
        const application = new CareApplication(1, 10);
        application.rejected();
        return application;
    }
}