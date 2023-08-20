import { Transform, Type, plainToInstance } from "class-transformer";
import { IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { Sort } from "src/profile/domain/enum/sort.enum";
import { ProfileFilter } from "src/profile/domain/profile-filter";

export class GetProfileListDto {
    @IsOptional()
    @IsString()
    nextCursor?: string;

    @IsOptional()
    @IsEnum(Sort)
    sort: Sort;

    @IsOptional()
    @ValidateNested()
    @Transform(({ value }) => value ? plainToInstance(ProfileFilter, JSON.parse(value)) : undefined)
    @Type(() => ProfileFilter)
    filter?: ProfileFilter;

    static of(filter?: ProfileFilter, sort?: Sort) { return { sort, filter }; };
}