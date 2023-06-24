import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entity/user.entity";
import { Phone } from "./domain/entity/user-phone.entity";
import { Email } from "./domain/entity/user-email.entity";
import { Token } from "./domain/entity/auth-token.entity";
import { UserProfile } from "./domain/entity/user-profile.entity";
import { PhoneValidatorPipe } from "./interface/pipe/phone-validator.pipe";
import { PhoneRepositoryProvider } from "./domain/repository/user-phone.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Phone, Email, UserProfile, Token]),
    ],
    providers: [PhoneValidatorPipe, PhoneRepositoryProvider],
    exports: [TypeOrmModule, PhoneValidatorPipe]
})  
export class UserAuthCommonModule {}