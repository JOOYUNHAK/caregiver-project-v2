import { CaregiverHelpExperience, PatientHelpList } from "src/user/interface/dto/register-page";
import { License } from "../entity/caregiver/license.entity";
import { PossibleDate } from "../enum/possible-date.enum";
import { ObjectId } from "mongodb";
import { CaregiverProfile } from "../entity/caregiver/caregiver-profile.entity";
import { Warning } from "../entity/caregiver/warning.entity";
import { PatientProfile } from "../entity/protector/patient-profile.entity";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { CarePeriod } from "../entity/protector/care-period.entity";

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

    name(name: string): this {
        this.caregiverProfile.setName(name);
        return this;
    }
    sex(sex: SEX): this { 
        this.caregiverProfile.setSex(sex);
        return this;
    };

    age(age: number): this { 
        this.caregiverProfile.setAge(age);
        return this;
    }
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

    isPrivate(isPrivate: boolean): this {
        this.caregiverProfile.setIsPrivate(isPrivate);
        return this;
    }

    warningList(warningList: Warning [] = []): this {
        this.caregiverProfile.setWarning(warningList);
        return this;
    }

    build(): CaregiverProfile { return this.caregiverProfile; };
};

/* 보호자 회원가입시 환자의 정보 Builder */
export class PatientProfileBuilder {
    private patientProfile: PatientProfile;

    constructor(id: ObjectId) { 
        this.patientProfile = new PatientProfile(id);
    };

    userId(userId: number): this {
        this.patientProfile.setUserId(userId);
        return this;
    };

    weight(weight: number): this {
        this.patientProfile.setWeight(weight);
        return this;
    };

    sex(sex: SEX): this {
        this.patientProfile.setSex(sex);
        return this;
    };

    diagnosis(name: string): this {
        this.patientProfile.setDiagnosis(name);
        return this;
    };

    carePlace(place: string): this {
        this.patientProfile.setCarePlace(place);
        return this;
    };

    carePeriod(carePeriod: CarePeriod): this {
        this.patientProfile.setCarePeriod(carePeriod);
        return this;
    };

    nextHospital(isNext: boolean): this {
        this.patientProfile.setNextHospital(isNext);
        return this;
    };

    detailedCondition(description: string): this {
        this.patientProfile.setDetailedCondition(description);
        return this;
    };

    helpList(list: PatientHelpList): this {
        this.patientProfile.setHelpList(list);
        return this;
    };

    build(): PatientProfile { return this.patientProfile; };
}
