import { IsObject, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CommonRegisterForm, PatientHelpListForm, PatientInfoForm } from "./register-page";

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
    @Type(() => PatientHelpListForm)
    lastRegister: PatientHelpListForm;

    static of( 
        firstRegister: CommonRegisterForm, 
        secondRegister: PatientInfoForm,
        lastRegister: PatientHelpListForm
    ) {
        return {firstRegister, secondRegister, lastRegister};
    }
}