import { Time } from "src/common/shared/type/time.type";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { LOGIN_TYPE, ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";

/* Setting 되어있는 기본 사용자 객체 */
export class UserFixtures {
    /* 기본 사용자 */
    static createDefault(): User {
        return new User(
            this.withName(), this.withRole(), this.withLoginType(),
            this.withPhone(), this.withAuthentication()
        )
        .withEmail(this.emptyEmail())
        .withProfile(this.defaulthProfile());
    }

    /* 설정한 역할을 가진 사용자 */
    static createWithRole(role: ROLE): User {
        return new User(
            this.withName(), this.withRole(role), this.withLoginType(),
            this.withPhone(), this.withAuthentication()
        )
        .withEmail(this.emptyEmail())
        .withProfile(this.defaulthProfile());
    };

    /* 설정한 Email을 가지는 사용자 */
    static createWithEmail(email: string): User {
        return new User(
            this.withName(), this.withRole(), this.withLoginType(),
            this.withPhone(), this.withAuthentication()
        )
        .withEmail(new Email(email))
        .withProfile(this.defaulthProfile());
    };

    /* 설정한 프로필을 가지는 사용자 */
    static createWithProfile(birth: number, sex: SEX): User {
        return new User(
            this.withName(), this.withRole(), this.withLoginType(),
            this.withPhone(), this.withAuthentication()
        )
        .withEmail(this.emptyEmail())
        .withProfile(new UserProfile(birth, sex));
    }

    /* 설정한 전화번호 가지는 사용자 */
    static createWithPhone(phone: string): User {
        return new User(
            this.withName(), this.withRole(), this.withLoginType(),
            this.withPhone(phone), this.withAuthentication()
        )
        .withEmail(this.emptyEmail())
        .withProfile(this.defaulthProfile());
    }

    /* 설정한 RefreshKey 가지는 사용자 */
    static createWithRefreshKey(refreshKey: string): User {
        return new User(
            this.withName(), this.withRole(), this.withLoginType(),
            this.withPhone(), this.withAuthentication(this.withAccessToken(), refreshKey, this.withRefreshToken())
        )
        .withEmail(this.emptyEmail())
        .withProfile(this.defaulthProfile());
    }

    private static withName(name: string = '테스트'): string { return name; };
    private static withPhone(phone: string = '01011111111'): Phone { return new Phone(phone); };
    private static withRole(role: ROLE = ROLE.CAREGIVER): ROLE { return role; };
    private static withLoginType(type: LOGIN_TYPE = LOGIN_TYPE.PHONE): LOGIN_TYPE { return type; };
    
    private static emptyEmail(): Email { return new Email(null) };
    private static defaulthProfile(): UserProfile { return new UserProfile(19980101, SEX.MALE); };
    
    private static withAccessToken(accessToken: string = 'testAccessToken'): string { return accessToken; };
    private static withRefreshKey(refreshKey: string = 'aeee4c6ffa88bc50822cab3ce4d783c9'): string { return refreshKey; };
    private static withRefreshToken(refreshToken: string = 'testRefreshToken'): string { return refreshToken; };

    private static withAuthentication(
        accessToken = this.withAccessToken(),
        refreshKey = this.withRefreshKey(),
        refreshToken = this.withRefreshToken()
    ): Token { 
        return new Token(accessToken, refreshKey, refreshToken) 
    }
}


export class TestUser {
    id: number;
    name: string;
    sex: SEX;
    loginType: LOGIN_TYPE;
    role: ROLE;
    phone: Phone;
    email: Promise<Email[]>;
    profile: UserProfile;
    authentication: Token;
    registeredAt: Time;

    constructor(name: string, loginType: LOGIN_TYPE, role: ROLE, phone: Phone, profile: UserProfile, token: Token) {
        this.name = name;
        this.loginType = loginType;
        this.role = role;
        this.phone = phone;
        this.profile = profile;
        this.authentication = token;
    };

    static default() { return new TestUser(
        '테스트', LOGIN_TYPE.PHONE, ROLE.CAREGIVER, 
        new Phone('01011223344'), new UserProfile(19980101, SEX.MALE), 
        new Token('accessToken', 'refreshKey', 'refreshToken')
        )
    };

    withId(id: number): this {
        this.id = id;
        return this;
    };

    withName(name: string): this {
        this.name = name;
        return this;
    }

    withSex(sex: SEX): this {
        this.sex = sex;
        return this;
    }

    withRole(role: ROLE): this {
        this.role = role;
        return this;
    }

    withPhoneNumber(phoneNumber: string): this {
        this.phone = new Phone(phoneNumber);
        return this;
    };

    withEmail(email: string): this {
        this.email = Promise.resolve([new Email(email)]);
        return this;
    };

    withUserProfile(profile: UserProfile): this {
        this.profile = profile;
        return this;
    }

    withToken(token: Token): this {
        this.authentication = token;
        return this;
    };

    getId(): number { return this.id; };
    getName(): string { return this.name; };
    getRole(): ROLE { return this.role; };
    getAuthentication(): Token { return this.authentication; };

    getPhone(): Phone { return this.phone; };
    async getEmail(): Promise<Email[]> { return this.email; };
    getProfile(): UserProfile { return this.profile; };

    /* 회원가입시 새로 발급된 인증 */
    setAuthentication(newAuthentication: NewUserAuthentication) {
        this.authentication = new Token(
            newAuthentication.accessToken,
            newAuthentication.refreshToken.getKey(),
            newAuthentication.refreshToken.getToken()
        );
    };

    /* 인증을 새로 갱신할 때 전체 값만 변경 */
    refreshAuthentication(refreshedAuthentication: NewUserAuthentication) {
        this.authentication.refreshAuthentication(
            refreshedAuthentication.accessToken, 
            refreshedAuthentication.refreshToken.getKey(),
            refreshedAuthentication.refreshToken.getToken()
        );
    }
 }
