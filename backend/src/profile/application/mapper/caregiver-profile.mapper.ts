import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/profile/domain/entity/caregiver/license.entity";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { ProfileListDto } from "src/profile/interface/dto/profile-list.dto";
import { User } from "src/user-auth-common/domain/entity/user.entity";

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
    };

    /* 사용자 데이터와 프로필 데이터로 클라이언트 노출용 데이터 변환 */
    toListDto(user: User, caregiverProfile: CaregiverProfile): ProfileListDto {
        return {
            user: {
                name: user.getName(),
                sex: user.getProfile().getSex(),
                age: this.toDtoAge(user.getProfile().getBirth())
            },
            profile: {
                _id: caregiverProfile.getId(),
                userId: caregiverProfile.getUserId(),
                career: this.toDtoCareer(caregiverProfile.getCareer()),
                pay: caregiverProfile.getPay(),
                possibleDate: this.toDtoPossibleDate(caregiverProfile.getPossibleDate()),
                possibleAreaList: this.toDtoAreaList(caregiverProfile.getPossibleAreaList()),
                tagList: caregiverProfile.getTagList(),
                notice: caregiverProfile.getNotice()
            }
        }
    };

    /* 클라이언트 데이터 노출에 맞게 나이 변환 */
    private toDtoAge(birth: number): number {
        const [currentYear, userYear] = [
            new Date().getFullYear(), 
            parseInt(birth.toString().substring(0, 4))
        ];

        return currentYear - userYear;
    };

    /* 클라이언트 데이터 노출에 맞게 경력 변환 */
    private toDtoCareer(career: number): string {
        if( career < 12 ) return `${career}개월`;

        const [year, month] = [Math.floor(career / 12), career % 12];
        return month ? `${year}년 ${month}개월` : `${year}년`;
    };

    /* ENUM으로 변경 요망 */
    private toDtoPossibleDate(value: number): string {
        switch(value) {
            case 1:
                return '즉시가능';
            case 2:
                return '1주이내';
            case 3:
                return '2주이내';
            case 4:
                return '3주이내';
            case 5: 
                return '한달이내';
        };
    };

    /* 클라이언트 데이터 노출에 맞게 가능 지역 변환 */
    private toDtoAreaList(areaList: string[]): string[] | string {
        return areaList.length >= 4 ? '상세보기참고' : areaList;
    }

    private toLicenseList(licenseList: string[]): License[] {
        /* 자격증을 증명전까지 false */
        return licenseList.map(license => new License(license, false))
    };
}