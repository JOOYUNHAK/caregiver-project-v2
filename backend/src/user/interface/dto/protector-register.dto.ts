import { CommonRegisterForm, PatientHelpListForm, PatientInfoForm } from "./register-page";

export class ProtectorRegisterDto {
    firstRegister: CommonRegisterForm;
    secondRegister: PatientInfoForm;
    lastRegister: PatientHelpListForm;
}