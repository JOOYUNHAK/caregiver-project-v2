export class AuthenticationCode {
    private code: number;
    constructor(code: number) {
        this.code = code;
    };
    
    isEqual(inputCode: number): boolean { return inputCode == this.code; };
    getCode(): number { return this.code; };
}