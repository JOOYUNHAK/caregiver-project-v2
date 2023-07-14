import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskService } from "./task.service";
import { AuthModule } from "src/auth/auth.module";
import { RedisModule } from "src/common/shared/database/redis/redis.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        AuthModule,
        RedisModule
    ],
    providers: [
        TaskService
    ]
})
export class BatchModule {}