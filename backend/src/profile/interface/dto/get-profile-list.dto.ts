import { Transform, Type, plainToInstance } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { ProfileFilter } from "src/profile/domain/profile-filter";
import { ProfileSort } from "src/profile/domain/profile-sort";
import { SortOptionTransformer } from "../decorator/sort-option-transformer.decorator";

export class GetProfileListDto {
    @IsOptional()
    @IsString()
    nextCursor?: string;

    @IsOptional()
    @SortOptionTransformer()
    @ValidateNested()
    @Type(() => ProfileSort)
    sort?: ProfileSort;

    @IsOptional()
    @ValidateNested()
    @Transform(({ value }) => value ? plainToInstance(ProfileFilter, JSON.parse(value)) : undefined)
    @Type(() => ProfileFilter)
    filter?: ProfileFilter;

    static of(filter?: ProfileFilter, sort?: ProfileSort) { return { sort, filter }; };
}