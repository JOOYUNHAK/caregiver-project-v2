import { ObjectId } from "mongodb";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { CarePeriod } from "./care-period.entity";
import { PatientHelpList } from "src/user/interface/dto/register-page";

export class PatientProfile {
    readonly _id: ObjectId;
    private userId: number;
    private weight: number;
    private sex: SEX;
    private diagnosis: string;
    private carePlace: string;
    private carePeriod: CarePeriod;
    private nextHospital: boolean;
    private detailedCondition: string;
    private helpList: PatientHelpList;

    constructor(id:ObjectId) { this._id = id; };

    /* Set Method */
    setUserId(userId: number) { this.userId = userId; };
    setWeight(weight: number) { this.weight = weight; };
    setSex(sex: SEX) { this.sex = sex; };
    setDiagnosis(name: string) { this.diagnosis = name; };
    setCarePlace(place: string) { this.carePlace = place; };
    setCarePeriod(carePeriod: CarePeriod) { this.carePeriod = carePeriod; };
    setNextHospital(isNext: boolean) { this.nextHospital = this.nextHospital; };
    setDetailedCondition(detail: string) { this.detailedCondition = detail; };
    setHelpList(list: PatientHelpList) { this.helpList = list; };

    getId(): string { return this._id.toHexString(); };
    getUserId(): number { return this.userId; };
    getCarePeriod(): CarePeriod { return this.carePeriod; };
    getHelpList(): PatientHelpList { return this.helpList; };
}