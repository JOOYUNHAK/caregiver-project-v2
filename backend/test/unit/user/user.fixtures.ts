import { Time } from "src/common/shared/type/time.type";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { LOGIN_TYPE, ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";

export class TestUser {
    id: number;
    name: string;
    loginType: LOGIN_TYPE;
    role: ROLE;
    phone: Phone;
    email: Email;
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

    withRole(role: ROLE): this {
        this.role = role;
        return this;
    }

    withPhoneNumber(phoneNumber: string): this {
        this.phone = new Phone(phoneNumber);
        return this;
    };

    withEmail(email: string): this {
        this.email = new Email(email);
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
    getEmail(): Email { return this.email; }

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
