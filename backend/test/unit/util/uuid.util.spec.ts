import { UUIDUtil } from 'src/util/uuid.util';
import * as uuid from 'uuid';

describe('UUID Util 클래스 Test', () => {
    describe('generateUuidV1()', () => {
        it('V1형식의 UUID에 맞아야한다.', () => {
            const uuidV1Reg = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            const uuidV1 = uuid.v1();
            expect(uuidV1).toMatch(uuidV1Reg);
        })
    });

    describe('generateOrederedUuid()', () => {
        it('중간 하이픈이 없는채로 반환되어야 한다.', () => {
            const uuidV1 = UUIDUtil.generateOrderedUuid();
            expect(uuidV1.includes('-')).toBe(false);
        });
    });

    describe('toBinary()', () => {
        it('String 문자열을 Buffer객체로 변환하는지 확인', () => {
            const inputString = '48656c6c6f20576f726c64';
            const buffer = Buffer.from(inputString, 'hex');
            const result = UUIDUtil.toBinaray(inputString);

            expect(result).toEqual(buffer);
        })
    });

    describe('toString()', () => {
        it('Buffer객체가 String 문자열로 변환되는지 확인', () => {
            const inputString = '48656c6c6f20576f726c64';
            const buffer = UUIDUtil.toBinaray(inputString);
            const result = UUIDUtil.toString(buffer);

            expect(result).toEqual(inputString);
        })
    })
})