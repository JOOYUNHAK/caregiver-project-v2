import { User } from "src/user-auth-common/domain/entity/user.entity";

export interface IRankService {
    /* 횟수 증가시키는 메서드 */
    increment(identify: string, viewUser: User): Promise<void>;
}