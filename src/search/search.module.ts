import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { RedisModule } from "src/redis/redis.module";
import { UserModule } from "src/user/user.module";
import { SearchMiddleware } from "./middleware/search.middleware";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
    imports: [
        AuthModule,
        UserModule,
        RedisModule,
    ],
    controllers: [SearchController],
    providers: [SearchService]
})

export class SearchModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SearchMiddleware)
            .forRoutes({ path: 'search', method: RequestMethod.GET })
    }
}