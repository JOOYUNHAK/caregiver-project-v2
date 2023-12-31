import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entity/user.entity";
import { Phone } from "./domain/entity/user-phone.entity";
import { Email } from "./domain/entity/user-email.entity";
import { Token } from "./domain/entity/auth-token.entity";
import { UserProfile } from "./domain/entity/user-profile.entity";
import { UserRepositoryProvider } from "./domain/repository/user.repository";
import { UserAuthCommonService } from "./application/user-auth-common.service";
import { PhoneRepositoryProvider } from "./domain/repository/user-phone.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Phone, Email, UserProfile, Token]),
    ],
    providers: [UserRepositoryProvider, PhoneRepositoryProvider, UserAuthCommonService],
    exports: [TypeOrmModule, UserRepositoryProvider, UserAuthCommonService]
})  
export class UserAuthCommonModule {}