import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CareApplication } from "./domain/care-application.entity";
import { careApplicationRepoProvider } from "./domain/care-application.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CareApplication])
    ],
    providers: [
        careApplicationRepoProvider
    ]
})
export class CareApplicationModule {}