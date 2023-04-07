import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { RedisModule } from "src/redis/redis.module";
import { TasksService } from "./tasks.service";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        RedisModule,
        AuthModule,
        DatabaseModule
    ],
    providers: [
        TasksService
    ],
    exports: [
        TasksService
    ]
})

export class TasksModule {}