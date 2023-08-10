import { Repository } from "typeorm";
import { ProfileViewRecord } from "./entity/profile-view-record.entity";

export interface IActionRecordRepository<T> extends Repository<T>{
    /* 특정 Action을 수행한 사용자가 있는지 기록 검사 */
    findRecordByActionAndUser(action: string, userId: number): Promise<ProfileViewRecord>;
};

