export class RequestProfileListDto {
    purpose: string;
    start: number;
    mainFilter?: string;
    payFilter?: string;
    startDateFilter?: string;
    ageFilter?: number;
    areaFilter?: string;
    licenseFilter?: string;
    warningFilter?: boolean;
    strengthFilter?: boolean;
}