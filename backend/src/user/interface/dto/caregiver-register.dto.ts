import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { CaregiverInfoForm, CaregiverLastRegisterDto, CaregiverThirdRegisterDto, CommonRegisterForm } from "./register-page";

export class CaregiverRegisterDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CommonRegisterForm)
    firstRegister: CommonRegisterForm;

    @IsObject()
    @ValidateNested()
    @Type(() => CaregiverInfoForm)
    secondRegister: CaregiverInfoForm;

    @IsObject()
    @ValidateNested()
    @Type(() => CaregiverThirdRegisterDto)
    thirdRegister: CaregiverThirdRegisterDto;

    @IsObject()
    @ValidateNested()
    @Type(() => CaregiverLastRegisterDto)
    lastRegister: CaregiverLastRegisterDto;

    static of( 
        firstRegister: CommonRegisterForm, 
        secondRegister: CaregiverInfoForm,
        thirdRegister: CaregiverThirdRegisterDto,
        lastRegister: CaregiverLastRegisterDto
    ) {
        return {
            firstRegister, secondRegister, 
            thirdRegister, lastRegister
        };
    }
}