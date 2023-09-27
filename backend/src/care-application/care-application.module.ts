import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CareApplication } from "./domain/care-application.entity";
import { careApplicationRepoProvider } from "./domain/care-application.repository";
import { CareApplicationService } from "./application/service/care-application.service";
import { ChatModule } from "src/chat/chat.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CareApplication]),
        forwardRef(() => ChatModule)
    ],
    providers: [
        CareApplicationService,
        careApplicationRepoProvider
    ],
    exports: [
        careApplicationRepoProvider
    ]
})
export class CareApplicationModule {}