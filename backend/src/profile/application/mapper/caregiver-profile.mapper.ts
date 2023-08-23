import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/profile/domain/entity/caregiver/license.entity";
import { CaregiverProfileListData, ProfileListDataAsClient } from "src/profile/domain/profile-list-data";
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";
import { ProfileSort } from "src/profile/domain/profile-sort";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { GetProfileListDto } from "src/profile/interface/dto/get-profile-list.dto";
import { ProfileDetailDto } from "src/profile/interface/dto/profile-detail.dto";
import { User } from "src/user-auth-common/domain/entity/user.entity";

@Injectable()
export class CaregiverProfileMapper {
    mapFrom(user: User, caregiverRegisterDto: CaregiverRegisterDto): CaregiverProfile {
        const { secondRegister, thirdRegister, lastRegister } = caregiverRegisterDto;
        return new CaregiverProfileBuilder(new ObjectId())
            .userId(user.getId())
            .name(user.getName())
            .sex(user.getProfile().getSex())
            .age(this.toDtoAge(user.getProfile().getBirth()))
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

    /* 리스트의 쿼리 옵션으로 변환 */
    toListQueryOptions(getProfileListDto: GetProfileListDto): ProfileListQueryOptions {
        return new ProfileListQueryOptions(
            new ProfileListCursor(getProfileListDto.nextCursor),
            new ProfileSort(getProfileListDto.sort),
            getProfileListDto.filter
        );
    };

    /* 사용자 데이터와 프로필 데이터로 클라이언트 노출용 데이터 변환 */
    toListDto(caregiverProfileListData: CaregiverProfileListData): ProfileListDataAsClient {
        return {
            id: caregiverProfileListData.id,
            name: caregiverProfileListData.name,
            sex: caregiverProfileListData.sex,
            age: this.toDtoAge(caregiverProfileListData.age),
            userId: caregiverProfileListData.userId,
            career: this.toDtoCareer(caregiverProfileListData.career),
            pay: caregiverProfileListData.pay,
            possibleDate: this.toDtoPossibleDate(caregiverProfileListData.possibleDate),
            possibleAreaList: this.toDtoAreaList(caregiverProfileListData.possibleAreaList, 'list'),
            tagList: caregiverProfileListData.tagList,
            notice: caregiverProfileListData.notice
        }
    };

    /* 프로필 상세보기에 필요한 데이터에 맞춰 변환 */
    toDetailDto(caregiverProfile: CaregiverProfile): ProfileDetailDto {

        return {
            id: caregiverProfile.getId(),
            name: caregiverProfile.getName(),
            sex: caregiverProfile.getSex(),
            age: this.toDtoAge(caregiverProfile.getAge()),
            userId: caregiverProfile.getUserId(),
            career: this.toDtoCareer(caregiverProfile.getCareer()),
            pay: caregiverProfile.getPay(),
            possibleDate: this.toDtoPossibleDate(caregiverProfile.getPossibleDate()),
            possibleAreaList: this.toDtoAreaList(caregiverProfile.getPossibleAreaList(), 'detail'),
            notice: caregiverProfile.getNotice(),
            licenseList: this.toDtoLicenseList(caregiverProfile.getLicenseList()),
            additionalChargeCase: caregiverProfile.getAdditionalChargeCase(),
            nextHosptial: caregiverProfile.getNextHosptial(),
            helpExperience: caregiverProfile.getHelpExperience(),
            strengthList: caregiverProfile.getStrengthList(),
            warningList: caregiverProfile.getWarningList()
        }
    };

    private toLicenseList(licenseList: string[]): License[] {
        /* 자격증을 증명전까지 false */
        return licenseList.map(license => new License(license, false))
    };

    /* 클라이언트 데이터 노출에 맞게 인증이 완료된 자격증만 노출 */
    private toDtoLicenseList(licenseList: License[]): string[] {
        return licenseList.filter(license => license.getIsCertified())
            .map(certificatedLicense => certificatedLicense.getName());
    }

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
        if (career < 12) return `${career}개월`;

        const [year, month] = [Math.floor(career / 12), career % 12];
        return month ? `${year}년 ${month}개월` : `${year}년`;
    };

    /* ENUM으로 변경 요망 */
    private toDtoPossibleDate(value: number): string {
        switch (value) {
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
    private toDtoAreaList(areaList: string[], page: string): string[] | string {
        /* 메인 페이지에서는 화면이 잘리므로 지역이 많으면 줄여서 노출 */
        return (areaList.length >= 4 && page === 'list') ? '상세보기참고' : areaList.join(',');
    }
}