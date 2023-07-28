import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/profile/domain/entity/caregiver/license.entity";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";

@Injectable()
export class CaregiverProfileMapper {
    mapFrom(userId: number, caregiverRegisterDto: CaregiverRegisterDto): CaregiverProfile {
        const { secondRegister, thirdRegister, lastRegister } = caregiverRegisterDto;
        return new CaregiverProfileBuilder( new ObjectId() )
            .userId(userId)
            .weight(secondRegister.weight)
            .career(secondRegister.career)
            .pay(secondRegister.pay)
            .possibleDate(secondRegister.possibleDate)
            .possibleAreaList(secondRegister.possibleAreaList)
            .licenseList(this.toLicenseList(secondRegister.licenseList))
            .nextHosptial(secondRegister.nextHospital)
            .helpExperience(thirdRegister.helpExperience)
            .strengthList(thirdRegister.strengthList)
            .tagList(thirdRegister.tagList)
            .notice(lastRegister.notice)
            .additionalChargeCase(lastRegister.additionalChargeCase)
            .isPrivate(false) // 처음 프로필 생성될 시 자동 공개 프로필
            .warningList()
            .build()
    }

    private toLicenseList(licenseList: string[]): License[] {
        /* 자격증을 증명전까지 false */
        return licenseList.map(license => new License(license, false))
    };
}