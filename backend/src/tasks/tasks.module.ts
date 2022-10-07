import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { RedisModule } from "src/redis/redis.module";
import { TasksService } from "./tasks.service";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        RedisModule
    ],
    providers: [
        TasksService
    ],
    exports: [
        TasksService
    ]
})

export class TasksModule {}