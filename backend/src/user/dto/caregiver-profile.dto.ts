
export class CareGiverProfileDto {
    id: number;
    weight: number;
    career: number;
    pay: string;
    startDate: string;
    nextHospital: string;
    possibleArea: string;
    license: string;
    suction: string;
    toilet: string;
    bedsore: string;
    washing: string;
    strength: {
        strength1: string,
        strength2: string
    };
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