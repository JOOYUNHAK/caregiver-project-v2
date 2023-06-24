import { ROLE } from "../domain/enum/user.enum";

export interface ClientDto {
    id: number;
    phoneNumber: string;
    accessToken: string;
    role: ROLE;
}