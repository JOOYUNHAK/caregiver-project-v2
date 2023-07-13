import { BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { phoneRegExp } from "src/user-auth-common/domain/enum/user.enum";
import { ErrorMessage } from "../shared/enum/error-message.enum";

export function phoneValidate(req: Request, res: Response, next: NextFunction) {
    const { phoneNumber } = req.body;
    /* 휴대폰 형식 검사이후 400에러 */
    if( !phoneRegExp.test(phoneNumber) )
        throw new BadRequestException(ErrorMessage.PhoneNumberFormat);
    next();
}