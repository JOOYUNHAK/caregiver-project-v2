export class AssistantProfileDto {
    id: number;
    weight: number;
    career: number;
    time: string;
    startDate: string;
    training: string;
    possibleArea: string;
    license: string;
    strength: {
        strength1: string,
        strength2: string
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