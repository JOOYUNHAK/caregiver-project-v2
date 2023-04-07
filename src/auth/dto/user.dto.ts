export class UserDto {
    id: string;
    email: string;
    name: string;
    purpose: string;
    isCertified: boolean;
    profile_off: boolean;
    warning: {
        first: string, 
        second: string,
        third: string
    };
    token_index: number;
}