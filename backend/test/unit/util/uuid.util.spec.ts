import * as uuid from 'uuid';

describe('UUID Util 클래스 Test', () => {
    describe('generateUuidV1()', () => {
        it('V1형식의 UUID에 맞아야한다.', () => {
            const uuidV1Reg = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            const uuidV1 = uuid.v1();
            expect(uuidV1).toMatch(uuidV1Reg);
        })
    })
})