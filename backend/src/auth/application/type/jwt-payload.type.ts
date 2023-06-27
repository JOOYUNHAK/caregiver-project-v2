import { Time } from "src/common/shared/type/time.type";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";

export interface JwtPayload {
    userId: number;
    role: ROLE;
    createdAt: Time;
};