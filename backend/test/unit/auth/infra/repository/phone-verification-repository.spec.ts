import { ConfigService } from "@nestjs/config";
import { RedisClientType } from "redis";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";
import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository"
import { ConnectRedis, DisconnectRedis, getRedis } from "test/unit/common/database/datebase-setup.fixture"

describe('휴대폰인증 횟수 내역 저장소(PhoneVerificationRepository) Test', () => {
    let repo: PhoneVerificationRepository, redis: RedisClientType;
    const phoneNumber = '01011111111', phoneVerificationUsage = new PhoneVerificationUsage();

    const mockConfigService = {
        get: jest.fn().mockReturnValue('test_phone_verification')
    } as unknown as ConfigService;

    beforeAll(async () => {
        await ConnectRedis();
        repo = new PhoneVerificationRepository(getRedis(), mockConfigService);
        redis = getRedis();
    });

    afterEach(async () => await repo.delete(phoneNumber))

    afterAll(async () => await DisconnectRedis() );

    describe('save()', () => {

        it('저장시 클래스의 메소드는 제외하고 필드만 저장되어야 한다.', async () => {
            await repo.save(phoneNumber, phoneVerificationUsage);
            const findResult = await redis.HGET(mockConfigService.get(''), phoneNumber);

            expect(findResult).toEqual(phoneVerificationUsage.toSerializedString());
        });
    });

    describe('findByPhoneNumber()', () => {
        it('찾은 결과는 Class Instance로 변환되어 반환되어야 한다.', async () => {
            await repo.save(phoneNumber, phoneVerificationUsage);
            const findResult = await repo.findByPhoneNumber(phoneNumber);

            expect(findResult).toBeInstanceOf(PhoneVerificationUsage);
        });
    });

    describe('delete()', () => {
        it('삭제한 이후에는 해당 키로 조회시 존재하지 않아야 한다.', async () => {
            await repo.save(phoneNumber, phoneVerificationUsage);
            let findResult = await repo.findByPhoneNumber(phoneNumber);

            expect(findResult).not.toBeNull();

            await repo.delete(phoneNumber);
            findResult = await repo.findByPhoneNumber(phoneNumber);
 
            expect(findResult).toBe(null);
        })
    })

})