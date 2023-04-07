export class CheckAuthCodeDto {
    id: string;
    email?: string;
    userInputCode: string;
    path: string;
    newUser?: boolean;
}