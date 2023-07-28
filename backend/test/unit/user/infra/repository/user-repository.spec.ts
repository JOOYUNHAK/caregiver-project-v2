import { Test, TestingModule } from "@nestjs/testing"
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm"
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity"
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity"
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity"
import { UserRepository, customUserRepositoryMethods } from "src/user-auth-common/domain/repository/user.repository"
import { UUIDUtil } from "src/util/uuid.util"
import { TestTypeOrmOptions } from "test/unit/common/database/datebase-setup.fixture"
import { Email } from "src/user-auth-common/domain/entity/user-email.entity"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { TestUser } from "../../user.fixtures"

describe('사용자 저장소(UserRepository) Test', () => {
    let userRepository: UserRepository;
    let module: TestingModule;
    beforeAll(async() => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(TestTypeOrmOptions),
                TypeOrmModule.forFeature([User, Phone, Email, UserProfile, Token])
            ],
        }).compile();
        
        userRepository = module.get(getRepositoryToken(User));
        userRepository = userRepository.extend(customUserRepositoryMethods);
    })

    afterAll(async() => module.close() );


    describe('findByUserId', () => {
        it('일치하는 사용자 id로 조회했을 때 반환되는지 확인', async() => {
            const [phoneNumber, refreshKey, refreshToken] = ['01022221111', UUIDUtil.generateOrderedUuid(), 'refresh'];

            const token = new Token(null, refreshKey, refreshToken);
            const testUser = TestUser.default().withPhoneNumber(phoneNumber).withToken(token);
            
            const savedId = (await userRepository.save(testUser as unknown as User)).getId();
            const result = await userRepository.findById(savedId);
            
            expect(result.getId()).toBe(savedId);
            expect(result.getAuthentication().getRefreshKey()).toBe(refreshKey);
            expect(result.getAuthentication().getRefreshToken()).toBe(refreshToken);
            expect(result.getPhone().getPhoneNumber()).toBe(phoneNumber);

            await userRepository.delete({ id: savedId })
        })
    });

    describe('findByRefreshKey()', () => {
        it('일치하는 RefreshKey가 있을 때 Authentication Entity까지 로드되는지 확인', async() => {
            const [testUuid, testRefreshToken] = [UUIDUtil.generateOrderedUuid(), 'refreshToken'];
            
            const token = new Token(null, testUuid, testRefreshToken);
            const testUser = TestUser.default().withToken(token);

            const id = (await userRepository.save(testUser as unknown as User)).getId();
            const findResult = await userRepository.findByRefreshKey(testUuid);

            expect(findResult.getAuthentication()).not.toBe(null);
            expect(findResult.getAuthentication().getRefreshKey()).toBe(testUuid);
            expect(findResult.getAuthentication().getRefreshToken()).toBe(testRefreshToken);
            
            await userRepository.delete({ id })
        });
    });
})