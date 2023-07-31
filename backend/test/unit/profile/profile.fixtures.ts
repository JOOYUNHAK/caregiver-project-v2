import { ObjectId } from "mongodb";
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder";

export class TestCaregiverProfile {
    static default() {
        return new CaregiverProfileBuilder(new ObjectId())
            .userId(1)
            .career(10)
            .pay(10)
            .tagList(['태그1', '태그2', '태그3'])
            .isPrivate(false)
            .notice('공지사항입니다.')
            .possibleAreaList(['인천', '서울'])
            .possibleDate(1)
    }
}