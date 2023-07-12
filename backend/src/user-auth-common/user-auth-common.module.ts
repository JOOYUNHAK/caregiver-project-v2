import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entity/user.entity";
import { Phone } from "./domain/entity/user-phone.entity";
import { Email } from "./domain/entity/user-email.entity";
import { Token } from "./domain/entity/auth-token.entity";
import { UserProfile } from "./domain/entity/user-profile.entity";
import { PhoneRepositoryProvider } from "./domain/repository/user-phone.repository";
import { UserRepositoryProvider } from "./domain/repository/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Phone, Email, UserProfile, Token]),
    ],
    providers: [PhoneRepositoryProvider, UserRepositoryProvider],
    exports: [TypeOrmModule, PhoneRepositoryProvider, UserRepositoryProvider]
})  
export class UserAuthCommonModule {}