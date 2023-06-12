export class Message {
    private receiver: string;
    protected content: string;
    constructor(to: string) { this.receiver = to; };

    getReceiver(): string { return this.receiver; };
    getContent(): string { return this.content; };
}