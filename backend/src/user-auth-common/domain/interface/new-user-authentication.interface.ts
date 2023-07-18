import { RefreshToken } from "../refresh-token";

export class NewUserAuthentication {
    readonly accessToken: string;
    readonly refreshToken: RefreshToken

    constructor(accessToken: string, refreshToken: RefreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    };
}