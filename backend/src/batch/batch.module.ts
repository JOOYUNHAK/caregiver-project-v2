import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskService } from "./task.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        AuthModule
    ],
    providers: [
        TaskService
    ]
})
export class BatchModule {}