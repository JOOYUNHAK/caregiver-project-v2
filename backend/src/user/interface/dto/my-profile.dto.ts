import { ROLE } from "src/user-auth-common/domain/enum/user.enum";

export class MyProfileDto {
    phoneNumber: string;
    email: string | null;
    role: ROLE;
    isPrivate?: boolean;
}