
export class CareGiverProfileDto {
    id: number;
    weight: number;
    career: number;
    pay: number;
    startDate: string;
    nextHospital: string;
    possibleArea: string;
    license: string;
    suction: string;
    toilet: string;
    bedsore: string;
    washing: string;
    strength: {
        first: string,
        second: string
    };
    keywords: string;
    notice: string;
    user: {
        name: string;
        birth: string;
        sex: string;
        purpose: string;
        isCertified: boolean;
        warning: {
            first: string,
            second: string,
            third: string
        }
    };
    Heart?: {
        heartCount: number,
        isHearted: number
    }
}