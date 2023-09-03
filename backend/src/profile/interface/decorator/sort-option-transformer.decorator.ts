import { Transform } from "class-transformer";
import { ProfileSortField } from "src/profile/domain/enum/sort.enum";
import { ProfilePaySort, ProfileStartDateSort } from "src/profile/domain/profile-sort";

export const SortOptionTransformer = () => Transform(({ value }) => {
    if( !value ) return null;
    const sortOption = JSON.parse(value);
    switch( sortOption.field ) {
        case ProfileSortField.PAY:
            return new ProfilePaySort(sortOption.orderBy);
        case ProfileSortField.STARTDATE:
            return new ProfileStartDateSort(sortOption.orderBy);
    }
})

