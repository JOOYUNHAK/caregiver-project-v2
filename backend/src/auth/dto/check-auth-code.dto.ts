export class CheckAuthCodeDto {
    id: string;
    userInputCode: string;
    path: string;
    newUser?: boolean;
}