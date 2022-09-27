export class UserDto {
    id: string;
    email: string;
    name: string;
    purpose: string;
    isCertified: boolean;
    profile_off: boolean;
    warning: {
        1: string, 
        2: string,
        3: string
    };
    token_index: number;
}