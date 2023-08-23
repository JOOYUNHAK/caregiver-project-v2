import { CaregiverProfileListData } from "src/profile/domain/profile-list-data";

export interface ProfileListDto {
    caregiverProfileListData: CaregiverProfileListData [];
    nextCursor: string;
};