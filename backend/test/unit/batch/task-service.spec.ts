import { Test } from "@nestjs/testing";
import { TaskService } from "src/batch/task.service"
import { MockPhoneVerificationRepository } from "../__mock__/auth/repository.mock";
import { RedisClientType } from "redis";
import { PhoneVerificationRepository } from "src/auth/infra/repository/phone-verification.repository";
import { PhoneVerificationUsage } from "src/auth/domain/entity/phone-verification-usage.entity";

describe('TaskService Test', () => {
    let phoneVerificationRepository: PhoneVerificationRepository;
    let taskService: TaskService;
    let redis: RedisClientType;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TaskService,
                MockPhoneVerificationRepository,
                {
                    provide: 'REDIS_CLIENT',
                    useValue: {
                        EXPIRE: jest.fn()
                    }
                }
            ]
        }).compile();

        phoneVerificationRepository = module.get(PhoneVerificationRepository);
        taskService = module.get(TaskService);
        redis = module.get('REDIS_CLIENT');
    });

    describe('DailyPhoneAuthUsageExpiredTask()', () => {
        it('정상적으로 Key에 만료시간이 설정되었다면 임의의값이 추가되지 않는다.', async () => {
            jest.spyOn(redis, 'EXPIRE').mockResolvedValueOnce(true);
            const saveSpy = jest.spyOn(phoneVerificationRepository, 'save');

            await taskService.DailyPhoneAuthUsageExpiredTask();
            expect(saveSpy).not.toBeCalled();
        });

        it('Key가 존재하지 않아 설정에 실패했다면 임의의값을 추가한다.', async () => {
            const testUsage = new PhoneVerificationUsage();
            jest.spyOn(redis, 'EXPIRE').mockResolvedValueOnce(false);
            const saveSpy = jest.spyOn(phoneVerificationRepository, 'save');

            await taskService.DailyPhoneAuthUsageExpiredTask()
            expect(saveSpy).toBeCalledWith('default', testUsage);
        });
    })
})
