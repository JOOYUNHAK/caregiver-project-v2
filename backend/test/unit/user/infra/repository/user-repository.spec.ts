import { Token } from "src/user-auth-common/domain/entity/auth-token.entity"
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity"
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity"
import { UserRepository, customUserRepositoryMethods } from "src/user-auth-common/domain/repository/user.repository"
import { UUIDUtil } from "src/util/uuid.util"
import { TestTypeOrm } from "test/unit/common/database/datebase-setup.fixture"
import { Email } from "src/user-auth-common/domain/entity/user-email.entity"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import {UserFixtures } from "../../user.fixtures"
import { SEX } from "src/user-auth-common/domain/enum/user.enum"
import { DataSource } from "typeorm"

describe('사용자 저장소(UserRepository) Test', () => {
    let userRepository: UserRepository;
    let dataSource: DataSource;
    
    beforeAll(async() => {
        dataSource = await TestTypeOrm.withEntities(User, Phone, Email, UserProfile, Token);
        userRepository = dataSource.getRepository(User).extend(customUserRepositoryMethods);
    })

    afterAll(async() => await TestTypeOrm.disconnect(dataSource) );

    afterEach(async() => await userRepository.delete({ }));

    describe('findById()', () => {
        it('일치하는 사용자 id로 조회했을 때 반환되는지 확인', async() => {
            const testUser = UserFixtures.createDefault();            
            const savedId = (await userRepository.save(testUser)).getId();
            const result = await userRepository.findById(savedId);

            expect(result.getId()).toBe(savedId);
            expect(result.getName()).toBe(testUser.getName());
            expect(result.getRole()).toBe(testUser.getRole());
            expect(result.getAuthentication().getAccessToken()).toBe(undefined); // AccessToken은 DB에 저장 x
            expect(result.getAuthentication().getRefreshKey()).toBe(testUser.getAuthentication().getRefreshKey());
            expect(result.getAuthentication().getRefreshToken()).toBe(testUser.getAuthentication().getRefreshToken())

            expect(result.getEmail()).toBeInstanceOf(Promise);
            expect(result.getProfile()).toBeInstanceOf(Promise);
        })

        it('Email Lazy Loading 확인', async() => {
            const testEmail = 'test@naver.com';
            const testWithEmailUser = UserFixtures.createWithEmail(testEmail);
            const savedId = (await userRepository.save(testWithEmailUser)).getId();

            const result = await userRepository.findById(savedId);

            expect(result.getEmail()).toBeInstanceOf(Promise);
            expect((await result.getEmail()).getEmail()).toBe(testEmail);
        });

        it('UserProfile Lazy Loading 확인', async() => {
            const [birth, sex] = [19980101, SEX.FEMALE];
            const testUser = UserFixtures.createWithProfile(birth, sex);
            const savedId = (await userRepository.save(testUser)).getId();

            const result = await userRepository.findById(savedId);

            expect(result.getProfile()).toBeInstanceOf(Promise);
            expect((await result.getProfile()).getBirth()).toBe(birth);
            expect((await result.getProfile()).getSex()).toBe(sex);
        });

        it('Phone Lazy Loading 확인', async() => {
            const phoneNumber = '01011223344';
            const testUser = UserFixtures.createWithPhone(phoneNumber);
            const savedId = (await userRepository.save(testUser)).getId();

            const result = await userRepository.findById(savedId);

            expect(result.getPhone()).toBeInstanceOf(Promise);
            expect((await result.getPhone()).getPhoneNumber()).toBe(phoneNumber);
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

    describe('findByPhoneNumber()', () => {
        it('맞는 값 찾는지 확인', async() => {
            const phoneNumber = '01022991101';
            const testUser = UserFixtures.createWithPhone(phoneNumber);

            const savedId = (await userRepository.save(testUser)).getId();

            const result = await userRepository.findByPhoneNumber(phoneNumber);
            
            expect(result.getId()).toBe(savedId);
        })
        
    })
})
