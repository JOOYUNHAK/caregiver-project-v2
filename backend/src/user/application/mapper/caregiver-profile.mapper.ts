import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { CaregiverProfileBuilder } from "src/user/domain/builder/profile.builder";
import { CaregiverProfile } from "src/user/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/user/domain/entity/caregiver/license.entity";
import { CaregiverRegisterDto } from "src/user/interface/dto/caregiver-register.dto";

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
            .warningList()
            .build()
    }

    private toLicenseList(licenseList: string[]): License[] {
        return licenseList.map(license => new License(license))
    };
}