import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CareApplication } from "./domain/care-application.entity";
import { careApplicationRepoProvider } from "./domain/care-application.repository";
import { CareApplicationService } from "./application/service/care-application.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CareApplication])
    ],
    providers: [
        CareApplicationService,
        careApplicationRepoProvider
    ]
})
export class CareApplicationModule {}