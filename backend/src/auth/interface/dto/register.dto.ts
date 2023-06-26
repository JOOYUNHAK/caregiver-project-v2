import { Matches } from 'class-validator';
import { ErrorMessage } from 'src/common/shared/enum/error-message.enum';
import { phoneRegExp } from 'src/user-auth-common/domain/enum/user.enum';

export class RegisterDto { 
    @Matches(phoneRegExp, { message: ErrorMessage.PhoneNumberFormat})    
    readonly phoneNumber: string; 
};