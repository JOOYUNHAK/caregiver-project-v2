import { ObjectId } from 'mongodb'
import { Warning } from "./warning.entity";
import { PossibleDate } from "../../enum/possible-date.enum";
import { CaregiverHelpExperience } from "src/user/interface/dto/register-page";
import { License } from "./license.entity";
import { ExposeOptions, Transform, TransformFnParams, Type } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessage } from 'src/common/shared/enum/error-message.enum';
import { SEX } from 'src/user-auth-common/domain/enum/user.enum';

/* _id 필드 plainToInstance 시 새로 할당하지 않기 위해 그대로 노출 */
const ExposeId = (options?: ExposeOptions) =>
((target: Object, propertyKey: string) => {
    Transform((params: TransformFnParams) => params.obj[propertyKey])(target, propertyKey);
});

export class CaregiverProfile {
    @ExposeId()
    readonly _id: ObjectId;
    private userId: number; // mysql 사용자 계정 ID
    private name: string; // 이름
    private sex: SEX; // 성별
    private age: number; // 나이
    private weight: number; // 몸무게
    private career: number; // 경력
    private pay: number; // 일당
    private possibleDate: PossibleDate // 가능날짜
    private nextHosptial: string; // 연장
    private notice: string; // 공지
    private helpExperience: CaregiverHelpExperience; //간병 경험
    private additionalChargeCase: string; //추가 요금 상황
    private possibleAreaList: string[]; // 지역
    @Type(() => License)
    private licenseList: License[]; // 자격증
    private strengthList: string[]; // 강점
    private tagList: string[]; // 키워드
    private isPrivate: boolean; // 프로필 비공개, 공개
    private warningList: Warning[];

    constructor(id: ObjectId) { this._id = id; };

    /* Setter Method */
    setUserId(userId: number) { this.userId = userId; };
    setName(name: string) { this.name = name; };
    setSex(sex: SEX) { this.sex = sex; };
    setAge(age: number) { this.age = age; };
    setWeight(weight: number) { this.weight = weight; };
    setCareer(career: number) { this.career = career; };
    setPay(pay: number) { this.pay = pay; };
    setPossibleDate(date: PossibleDate) { this.possibleDate = date; };
    setNextHosptail(description: string) { this.nextHosptial = description; };
    setNotice(notice: string) { this.notice = notice; };
    setHelpExperience(experience: CaregiverHelpExperience) { this.helpExperience = experience; };
    setAdditionalChargeCase(situation: string) { this.additionalChargeCase = situation; };
    setPossibleAreaList(areaList: string[]) { this.possibleAreaList = areaList; };
    setLicenseList(licenseList: License[]) { this.licenseList = licenseList; };
    setStrengthList(strengthList: string[]) { this.strengthList = strengthList; };
    setTagList(tagList: string[]) { this.tagList = tagList; };
    setIsPrivate(isPrivate: boolean) { this.isPrivate = isPrivate; };
    setWarning(warningList: Warning[]) { this.warningList = warningList; };

    getId(): string { return this._id.toHexString(); };
    getUserId(): number { return this.userId; };
    getName(): string { return this.name; };
    getSex(): SEX { return this.sex; };
    getAge(): number { return this.age; };
    getCareer(): number { return this.career; };
    getPay(): number { return this.pay; };
    getNextHosptial(): string { return this.nextHosptial; };
    getPossibleDate(): number { return this.possibleDate; };
    getHelpExperience(): CaregiverHelpExperience { return this.helpExperience; };
    getPossibleAreaList(): string[] { return this.possibleAreaList; };
    getLicenseList(): License[] { return this.licenseList; };
    getTagList(): string[] { return this.tagList; };
    getStrengthList(): string[] { return this.strengthList; };
    getIsPrivate(): boolean { return this.isPrivate; };
    getNotice(): string { return this.notice; };
    getAdditionalChargeCase(): string { return this.additionalChargeCase; };
    getWarningList(): Warning[] { return this.warningList; };

    /* 프로필이 비공개인지 확인 */
    checkPrivacy(): void {
        if( this.isPrivate )
            throw new NotFoundException(ErrorMessage.NotFoundProfile);
    }
}
