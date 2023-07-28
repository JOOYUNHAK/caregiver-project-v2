export class License {
    private name: string;
    private isCertified: boolean; // 증명됐는지 여부

    constructor(name: string, isCertified: boolean) {
        this.name = name;
        this.isCertified = isCertified;
    };

    getName(): string { return this.name; };
    getIsCertified(): boolean { return this.isCertified; };
}