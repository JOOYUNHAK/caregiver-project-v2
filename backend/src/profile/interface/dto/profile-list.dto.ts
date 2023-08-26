import { ProfileListDataAsClient } from "src/profile/domain/profile-list-data";

export interface ProfileListDto {
    caregiverProfileListData: ProfileListDataAsClient [];
    nextCursor: string;
};