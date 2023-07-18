export class RefreshToken {
    private key: string;
    private token: string;

    getKey(): string { return this.key; };
    getToken(): string { return this.token; };

    constructor(key: string, token: string) {
        this.key = key;
        this.token = token;
    };
}