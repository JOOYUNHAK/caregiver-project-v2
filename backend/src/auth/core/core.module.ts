import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtModuleOptions } from "./jwt-module/jwt-module.option";

@Global()
@Module({
    imports:[ 
        JwtModule.registerAsync(jwtModuleOptions) 
    ],
    exports: [JwtModule]
})

export class CoreModule {}