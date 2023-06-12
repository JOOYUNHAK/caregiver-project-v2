import { BadRequestException } from "@nestjs/common"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity"

describe('휴대폰 객체(Phone) Test', () => {
    describe('validate()', () => {
        it.each([
            '010123456',
            '01012345678910',
            '0101234aaaa'
        ])('잘못된 휴대폰 형식(%s)이면 400에러를 던진다', (wrongPhoneNumber) => {
            const result = () => Phone.validate(wrongPhoneNumber);
            expect(result).toThrowError(new BadRequestException(ErrorMessage.PhoneNumberFormat));
        });

        it('올바른 휴대폰 형식이면 아무 반환값이 없다', () => {
            const result = Phone.validate('01024341111');
            expect(result).toBeUndefined();
        })
    })
})