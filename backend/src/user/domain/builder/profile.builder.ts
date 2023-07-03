import { CaregiverHelpExperience } from "src/user/interface/dto/register-page";
import { License } from "../entity/caregiver/license.entity";
import { PossibleDate } from "../enum/possible-date.enum";
import { ObjectId } from "mongodb";
import { CaregiverProfile } from "../entity/caregiver/caregiver-profile.entity";
import { Warning } from "../entity/caregiver/warning.entity";

/* 간병인 회원가입 추가 정보 Builder */
export class CaregiverProfileBuilder {
    private caregiverProfile: CaregiverProfile;

    constructor(id: ObjectId) { 
        this.caregiverProfile = new CaregiverProfile(id);
    };

    userId(userId: number): this {
        this.caregiverProfile.setUserId(userId);
        return this;
    };

    weight(weight: number): this {
        this.caregiverProfile.setWeight(weight);
        return this;
    };

    career(career: number): this {
        this.caregiverProfile.setCareer(career);
        return this;
    };

    pay(pay: number): this {
        this.caregiverProfile.setPay((pay));
        return this;
    };

    possibleDate(date: PossibleDate): this {
        this.caregiverProfile.setPossibleDate(date);
        return this;
    };

    nextHosptial(description: string): this {
        this.caregiverProfile.setNextHosptail(description);
        return this;
    };

    notice(notice: string): this {
        this.caregiverProfile.setNotice(notice);
        return this;
    };
    
    helpExperience(list: CaregiverHelpExperience): this {
        this.caregiverProfile.setHelpExperience(list);
        return this;
    };

    additionalChargeCase(situation: string): this {
        this.caregiverProfile.setAdditionalChargeCase(situation);
        return this;
    };

    possibleAreaList(areaList: string []): this {
        this.caregiverProfile.setPossibleAreaList(areaList);
        return this;
    };

    licenseList(licenseList: License []): this {
        this.caregiverProfile.setLicenseList(licenseList);
        return this;
    };

    strengthList(strengthList: string []): this {
        this.caregiverProfile.setStrengthList(strengthList);
        return this;
    };

    tagList(tagList: string []): this {
        this.caregiverProfile.setTagList(tagList);
        return this;
    };

    warningList(warningList: Warning [] = []): this {
        this.caregiverProfile.setWarning(warningList);
        return this;
    }

    build(): CaregiverProfile { return this.caregiverProfile; };
}
