import { BadRequestException } from "@nestjs/common";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { PhoneValidatorPipe } from "src/user-auth-common/interface/pipe/phone-validator.pipe";

describe('휴대폰 번호 유효성 검사 Pipe(PhoneValidatorPipe) Test', () => {
    let target: PhoneValidatorPipe = new PhoneValidatorPipe();

    it.each([
        '010123456',
        '01012345678910',
        '0101234aaaa'
    ])('잘못된 휴대폰 형식(%s)이 요청으로 들어오면 400에러를 던진다', (wrongPhoneNumber) => {
        const result = () => target.transform({ phoneNumber: wrongPhoneNumber}, {} as any );

        expect(result).toThrowError(new BadRequestException(ErrorMessage.PhoneNumberFormat));
    });

    it('정상적인 휴대폰 형식이 들어오면 들어온 요청의 값이 그대로 반환된다', () => {
        const phoneDto = { phoneNumber: '01011111111' };
        const result = target.transform( phoneDto, {} as any );

        expect(result).toEqual(phoneDto);
    })
})