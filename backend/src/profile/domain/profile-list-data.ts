export interface CaregiverProfileListData {
    id: string;
    userId: number;
    name: string;
    sex: string;
    age: number;
    career: string;
    pay: number;
    possibleDate: string;
    possibleAreaList: string[] | string;
    tagList: string[];
    notice: string;
};