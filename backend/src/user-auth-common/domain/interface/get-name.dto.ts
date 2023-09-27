export class GetNameDto {
    id: number;
    name: string;

    /* Test */
    static of(userId: number, name: string) {
        return { 
            id: userId,
            name
        }
    }
}