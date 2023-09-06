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
import {UserFixtures } from "../../user.fixtures"

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

    afterAll(async() => await module.close() );

    afterEach(async() => await userRepository.delete({ }));

    describe('findById()', () => {
        it('일치하는 사용자 id로 조회했을 때 반환되는지 확인', async() => {
            const testUser = UserFixtures.createDefault();            
            const savedId = (await userRepository.save(testUser)).getId();
            const result = await userRepository.findById(savedId);

            expect(result.getId()).toBe(savedId);
            expect(result.getName()).toBe(testUser.getName());
            expect(result.getRole()).toBe(testUser.getRole());
            expect(result.getProfile()).toEqual(testUser.getProfile());
            expect(result.getAuthentication().getAccessToken()).toBe(undefined); // AccessToken은 DB에 저장 x
            expect(result.getAuthentication().getRefreshKey()).toBe(testUser.getAuthentication().getRefreshKey());
            expect(result.getAuthentication().getRefreshToken()).toBe(testUser.getAuthentication().getRefreshToken())
        })

        it('Email Lazy Loading 확인', async() => {
            const testEmail = 'test@naver.com';
            const testWithEmailUser = UserFixtures.createWithEmail(testEmail);
            const savedId = (await userRepository.save(testWithEmailUser)).getId();

            const result = await userRepository.findById(savedId);

            expect(result.getEmail()).toBeInstanceOf(Promise);
            expect(await result.getEmail()).toBeInstanceOf(Email);
        })
    });

    describe('findByRefreshKey()', () => {
        it('일치하는 RefreshKey로 찾는지 확인', async() => {
            const testRefreshKey = UUIDUtil.generateOrderedUuid();
            const testUser = UserFixtures.createWithRefreshKey(testRefreshKey);
            
            await userRepository.save(testUser);

            const findResult = await userRepository.findByRefreshKey(testRefreshKey);

            expect(findResult.getAuthentication()).not.toBe(null);
            expect(findResult.getAuthentication().getRefreshKey()).toBe(testRefreshKey);        
        });
    });
})
