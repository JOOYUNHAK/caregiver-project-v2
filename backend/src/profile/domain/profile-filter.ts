import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { PossibleDate } from "./enum/possible-date.enum";

export class ProfileFilter {    
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value) )
    readonly pay?: number;

    @IsOptional()
    @IsEnum(PossibleDate)
    readonly startDate?: PossibleDate;

    @IsOptional()
    @IsEnum(SEX)
    readonly sex?: SEX;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value) )
    readonly age?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly area?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly license?: string[];

    @IsOptional()
    @IsBoolean()
    readonly strengthExcept?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly warningExcept?: boolean;
};