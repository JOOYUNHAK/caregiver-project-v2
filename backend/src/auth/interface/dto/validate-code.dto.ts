import { IsNumber, Matches, Max, Min } from "class-validator";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { phoneRegExp } from "src/user-auth-common/domain/enum/user.enum";

export class ValidateSmsCodeDto {
    @Matches(phoneRegExp, { message: ErrorMessage.PhoneNumberFormat})
    phoneNumber: string; 

    @Min(100000)
    @Max(999999)
    @IsNumber()
    code: number;    
}