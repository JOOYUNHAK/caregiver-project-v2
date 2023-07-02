import { Injectable } from "@nestjs/common";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { LOGIN_TYPE } from "src/user-auth-common/domain/enum/user.enum";
import { ClientDto } from "src/user-auth-common/interface/client.interface";
import { CommonRegisterForm } from "src/user/interface/dto/register-page";

@Injectable()
export class UserMapper {
    mapFrom(commonRegisterDto: CommonRegisterForm): User {
        return new User(
            commonRegisterDto.name,
            commonRegisterDto.purpose,
            LOGIN_TYPE.PHONE,
            this.createEmailByLoginType(LOGIN_TYPE.PHONE),
            this.createPhoneByLoginType(LOGIN_TYPE.PHONE, commonRegisterDto.id),
            new UserProfile(commonRegisterDto.birth, commonRegisterDto.sex),
            null
        )
    };

    async toDto(user: User): Promise<ClientDto> {
        return {
            id: user.getId(),
            accessToken: (await user.getAuthentication()).getAccessToken(),
        };
    }

     /* 이메일로 회원가입(현재는 휴대폰으로만 제공) */
     private createEmailByLoginType(loginType: LOGIN_TYPE): null | Email {
        return loginType == LOGIN_TYPE.PHONE ? null : new Email();
    };

    /* 휴대폰으로 회원가입  */
    private createPhoneByLoginType(loginType: LOGIN_TYPE, phoneNumber: string): null | Phone {
        return loginType == LOGIN_TYPE.PHONE ? new Phone(phoneNumber) : null;
    }
}