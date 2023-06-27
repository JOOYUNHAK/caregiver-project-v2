import { Injectable } from "@nestjs/common";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { LOGIN_TYPE } from "src/user-auth-common/domain/enum/user.enum";
import { ClientDto } from "src/user-auth-common/interface/client.interface";
import { CarePeriod } from "src/user/domain/entity/protector/care-period.entity";
import { Patient } from "src/user/domain/entity/protector/patient.entity";
import { Protector } from "src/user/domain/entity/protector/protector.entity";
import { ProtectorRegisterDto } from "src/user/interface/dto/protector-register.dto";
import { CommonRegisterForm, PatientHelpListForm, PatientInfoForm } from "src/user/interface/dto/register-page";

@Injectable()
export class ProtectorMapper {
    /* 보호자 회원가입 양식으로부터 보호자 객체 생성 */
    mapFrom(protectorRegisterDto: ProtectorRegisterDto): Protector {
        const {
            firstRegister: commonRegisterForm,
            secondRegister: patientInfo,
            lastRegister: patientHelpList
        } = protectorRegisterDto;

        return new Protector(
            this.mappingUserByCommonRegisterForm(commonRegisterForm),
            this.mappingPatientByPatientInfo(patientInfo, patientHelpList)
        );
    };

    async toDto(protector: Protector): Promise<ClientDto> {
        return {
            accessToken: (await protector.getUser().getAuthentication()).getAccessToken(),
        };
    }

    /* 보호자, 간병인 공통 회원가입 양식으로 새로운 사용자(계정) 생성 */
    private mappingUserByCommonRegisterForm(commonRegisterForm: CommonRegisterForm): User {
        return new User(
            commonRegisterForm.name,
            commonRegisterForm.purpose,
            LOGIN_TYPE.PHONE,
            this.createEmailByLoginType(LOGIN_TYPE.PHONE),
            this.createPhoneByLoginType(LOGIN_TYPE.PHONE, commonRegisterForm.id),
            new UserProfile(commonRegisterForm.birth, commonRegisterForm.sex),
            null
        )
    };

    /* 보호자가 작성한 환자 정보들을 토대로 환자 객체 생성 */
    private mappingPatientByPatientInfo(patientInfo: PatientInfoForm, patientHelpList: PatientHelpListForm): Patient {
        return new Patient(
            patientInfo.weight,
            patientInfo.patientSex,
            patientInfo.diagnosis,
            patientInfo.place,
            new CarePeriod(patientInfo.startPeriod, patientInfo.endPeriod, patientInfo.totalPeriod),
            patientInfo.isNext,
            patientInfo.patientState,
            JSON.stringify(patientHelpList)
        )
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