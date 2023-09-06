import { Time } from "src/common/shared/type/time.type";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { LOGIN_TYPE, ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";
import { RefreshToken } from "src/user-auth-common/domain/refresh-token";

/* Setting 되어있는 기본 사용자 객체 */
export class UserFixtures {
    /* 기본 사용자 */
    static createDefault(): User {
        const user = this.withDefaultInfo()
            .withEmail(this.emptyEmail())
            .withProfile(this.defaulthProfile())
            .withPhone(this.defaultPhone())

        user.setAuthentication(this.withDefaultAuth());

        return user;
    }

    /* 새로 가입한 사용자 */
    static createNewUser(): User {
        return this.withDefaultInfo()
            .withEmail(this.emptyEmail())
            .withProfile(this.defaulthProfile())
            .withPhone(this.defaultPhone());
    }

    /* 설정한 역할을 가진 사용자 */
    static createWithRole(role: ROLE): User {
        const user = this.withRole(role)
            .withEmail(this.emptyEmail())
            .withProfile(this.defaulthProfile())
            .withPhone(this.defaultPhone())

        user.setAuthentication(this.withDefaultAuth());

        return user;
    };

    /* 설정한 Email을 가지는 사용자 */
    static createWithEmail(email: string): User {
        const user = this.withDefaultInfo()
            .withEmail(new Email(email))
            .withProfile(this.defaulthProfile())
            .withPhone(this.defaultPhone())

        user.setAuthentication(this.withDefaultAuth());

        return user;
    };

    /* 설정한 프로필을 가지는 사용자 */
    static createWithProfile(birth: number, sex: SEX): User {
        const user = this.withDefaultInfo()
            .withEmail(this.emptyEmail())
            .withProfile(new UserProfile(birth, sex))
            .withPhone(this.defaultPhone());

        user.setAuthentication(this.withDefaultAuth());

        return user;
    }

    /* 설정한 전화번호 가지는 사용자 */
    static createWithPhone(phone: string): User {
        const user = this.withDefaultInfo()
            .withEmail(this.emptyEmail())
            .withProfile(this.defaulthProfile())
            .withPhone(new Phone(phone));

        user.setAuthentication(this.withDefaultAuth());

        return user;
    }

    /* 설정한 RefreshKey 가지는 사용자 */
    static createWithRefreshKey(refreshKey: string): User {
        const user = this.withDefaultInfo()
            .withEmail(this.emptyEmail())
            .withProfile(this.defaulthProfile())
            .withPhone(this.defaultPhone());

        user.setAuthentication(this.withRefreshKeyAuth(refreshKey));

        return user;
    };

    /* 설정한 RefreshToken을 가지는 사용자 */
    static createWithRefreshToken(refreshToken: string): User {
        const user = this.withDefaultInfo()
            .withEmail(this.emptyEmail())
            .withProfile(this.defaulthProfile())
            .withPhone(this.defaultPhone());

        user.setAuthentication(this.withRefreshToken(refreshToken));

        return user; 
    }

    private static withDefaultInfo(): User { return new User('테스트', ROLE.CAREGIVER, LOGIN_TYPE.PHONE); };
    private static withRole(role: ROLE): User { return new User('테스트', role, LOGIN_TYPE.PHONE); };

    private static emptyEmail(): Email { return new Email(null) };
    private static defaulthProfile(): UserProfile { return new UserProfile(19980101, SEX.MALE); };
    private static defaultPhone(): Phone { return new Phone('01011223344') };

    private static defaultAccessToken(): string { return 'defaultAccessToken'; };
    private static defaultRefreshKey(): string { return 'aeee4c6ffa88bc50822cab3ce4d783c9'; };
    private static defaultRefreshToken(): string { return 'defaultRefreshToken'; };

    private static withDefaultAuth() {
        return new NewUserAuthentication(
            this.defaultAccessToken(),
            new RefreshToken(
                this.defaultRefreshKey(),
                this.defaultRefreshToken()
            )
        )
    }

    private static withRefreshKeyAuth(refreshKey: string) {
        return new NewUserAuthentication(
            this.defaultAccessToken(),
            new RefreshToken(
                refreshKey,
                this.defaultRefreshToken()
            )
        )
    }

    private static withRefreshToken(refreshToken: string) {
        return new NewUserAuthentication(
            this.defaultAccessToken(),
            new RefreshToken(
                this.defaultRefreshKey(),
                refreshToken
            )
        )
    }
}