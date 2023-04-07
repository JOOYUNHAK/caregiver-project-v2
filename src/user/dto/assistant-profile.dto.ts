export class AssistantProfileDto {
    id: number;
    weight: number;
    career: number;
    time: string;
    training: string;
    possibleArea: string;
    license: string;
    strength: {
        1: string,
        2: string
    };
    withPatient: string;
    keywords: string;
    notice: string;
    user: {
        name: string;
        birth: string;
        sex: string;
        purpose: string;
        isCertified: boolean;
        warning: number;
    }
}