import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

@Injectable()
export class PhoneValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
        if( !phoneRegExp.test(value.phoneNumber) )
            throw new BadRequestException(ErrorMessage.PhoneNumberFormat);
        return value;
    }
}