export interface CaregiverProfileListData {
    user: {
        name: string;
        sex: string;
        age: number;
    }
    profile: {
        id: string;
        userId: number;
        career: string;
        pay: number;
        possibleDate: string;
        possibleAreaList: string[] | string;
        tagList: string[];
        notice: string;
    }
};