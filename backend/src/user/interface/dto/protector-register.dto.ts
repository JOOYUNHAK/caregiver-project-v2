import { IsObject, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CommonRegisterForm, PatientHelpList, PatientInfoForm } from "./register-page";

export class ProtectorRegisterDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CommonRegisterForm)
    firstRegister: CommonRegisterForm;

    @IsObject()
    @ValidateNested()
    @Type(() => PatientInfoForm)
    secondRegister: PatientInfoForm;

    @IsObject()
    @Type(() => PatientHelpList)
    lastRegister: PatientHelpList;

    static of( 
        firstRegister: CommonRegisterForm, 
        secondRegister: PatientInfoForm,
        lastRegister: PatientHelpList
    ) {
        return {firstRegister, secondRegister, lastRegister};
    }
}