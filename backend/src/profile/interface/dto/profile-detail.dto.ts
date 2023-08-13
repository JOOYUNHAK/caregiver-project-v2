import { Warning } from "src/profile/domain/entity/caregiver/warning.entity";
import { SEX } from "src/user-auth-common/domain/enum/user.enum"
import { CaregiverHelpExperience } from "src/user/interface/dto/register-page";

export interface ProfileDetailDto {
    user: {
        name: string;
        sex: SEX;
        age: number;
    },
    profile: {
        id: string;
        userId: number;
        career: string;
        pay: number;
        possibleDate: string;
        possibleAreaList: string[] | string;
        notice: string;
        licenseList: string[] | [];
        additionalChargeCase: string | null;
        nextHosptial: string | null;
        helpExperience: CaregiverHelpExperience,
        strengthList: string[] | [],
        warningList: Warning [] | []
    }
}