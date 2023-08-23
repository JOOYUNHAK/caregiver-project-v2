// DB에서 조회되는 데이터 형식
export interface CaregiverProfileListData {
    id: string;
    userId: number;
    name: string;
    sex: string;
    age: number;
    career: number;
    pay: number;
    possibleDate: number;
    possibleAreaList: string[];
    tagList: string[];
    notice: string;
};

// 프론트엔드에서 필요한 형식으로 변환
export interface ProfileListDataAsClient {
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
}