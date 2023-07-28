import { Injectable } from "@nestjs/common";
import { UserAuthCommonMapper } from "src/user-auth-common/application/user-auth-common.mapper";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { LOGIN_TYPE } from "src/user-auth-common/domain/enum/user.enum";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { CommonRegisterForm } from "src/user/interface/dto/register-page";

@Injectable()
export class UserMapper extends UserAuthCommonMapper{
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

    /* 내 정보 -> 내 프로필 조회에 쓰이는 Dto */
    async toMyProfileDto(user: User, profile?: CaregiverProfile) {
        return {
            phoneNumber: user.getPhone().getPhoneNumber(),
            role: user.getRole(),
            email: this.checkEmailVerificationStatus(user.getEmail()),
            isPrivate: profile ? profile.getIsPrivate() : undefined, // 간병인일 경우에만 프로필 비공개인지
        }
    }

     /* 이메일로 회원가입(현재는 휴대폰으로만 제공) */
     private createEmailByLoginType(loginType: LOGIN_TYPE): null | Email {
        return loginType == LOGIN_TYPE.PHONE ? null : null;
    };

    /* 휴대폰으로 회원가입  */
    private createPhoneByLoginType(loginType: LOGIN_TYPE, phoneNumber: string): null | Phone {
        return loginType == LOGIN_TYPE.PHONE ? new Phone(phoneNumber) : null;
    }

    /* 인증된 이메일이 있는지 */
    private checkEmailVerificationStatus(email: Email): null | string {
        if( email ) return email.getEmail();
        return null;
    }
}