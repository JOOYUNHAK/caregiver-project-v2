export class SearchProfileDto {
    start: number;
    keyWord: string;
    mainFilter?: string;
    payFilter?: string;
    startDateFilter?: string;
    sexFilter?: string;
    ageFilter?: number;
    areaFilter?: string;
    licenseFilter?: string;
    warningFilter?: boolean;
    strengthFilter?: boolean;
    exceptLicenseFilter?: boolean;
}