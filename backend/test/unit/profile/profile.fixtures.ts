import { ObjectId } from "mongodb";
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder";
import { License } from "src/profile/domain/entity/caregiver/license.entity";

export class TestCaregiverProfile {
    static default() {
        return new CaregiverProfileBuilder(new ObjectId())
            .userId(1)
            .weight(50)
            .career(10)
            .pay(10)
            .possibleDate(1)
            .possibleAreaList(['인천', '서울'])
            .nextHosptial('다음 병원 여부')
            .tagList(['태그1', '태그2', '태그3'])
            .isPrivate(false)
            .notice('공지사항입니다.')
            .additionalChargeCase('추가요금이 붙는 상황')
            .helpExperience({ suction: '석션 관련 내용'})
            .licenseList([new License('자격증1', false), new License('자격증2', false)])
            .strengthList(['강점1'])
            .warningList(null)
    }
}