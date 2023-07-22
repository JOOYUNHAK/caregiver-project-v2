import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LOGIN_TYPE, ROLE } from "../enum/user.enum";
import { Phone } from "./user-phone.entity";
import { UserProfile } from "./user-profile.entity";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { Time } from "src/common/shared/type/time.type";
import { Email } from "./user-email.entity";
import { NewUserAuthentication } from "../interface/new-user-authentication.interface";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @Column({ type: 'varchar', length: 5 })
    private name: string;

    @Column({ type: 'varchar', length: 15 })
    private role: ROLE;

    @Column({ type: 'varchar', length: 10 })
    private loginType: LOGIN_TYPE;

    @CreateDateColumn({ name: 'registered_at', type: 'timestamp' })
    private registeredAt: Time;

    @OneToOne(() => Email, (email) => email.userId, { cascade: ['insert', 'update'] })
    private email: Promise<Email>;

    @OneToOne(() => Phone, (phone) => phone.userId, { cascade: ['insert', 'update'] })
    private phone: Promise<Phone>;

    @OneToOne(() => UserProfile, (profile) => profile.userId, { cascade: ['insert'] })
    private profile: Promise<UserProfile>;

    @OneToOne(() => Token, (token) => token.userId, { cascade: ['insert', 'update'] })
    private authentication: Token;

    constructor(name: string, role: ROLE, loginType: LOGIN_TYPE, email: Email, phone: Phone, profile: UserProfile, authentication: Token) {
        this.name = name;
        this.role = role;
        this.loginType = loginType;
        this.authentication = authentication;
        this.email = Promise.resolve(email);
        this.phone = Promise.resolve(phone);
        this.profile = Promise.resolve(profile);
    };

    getId(): number { return this.id; };
    getName(): string { return this.name; };
    getRole(): ROLE { return this.role; };
    getAuthentication(): Token { return this.authentication; };

    async getPhone(): Promise<Phone> { return await this.phone; };
    async getEmail(): Promise<Email> { return await this.email; };

    /* 회원가입시 새로 발급된 인증 */
    setAuthentication(newUserAuthentication: NewUserAuthentication) {
        this.authentication = new Token(
            newUserAuthentication.accessToken,
            newUserAuthentication.refreshToken.getKey(),
            newUserAuthentication.refreshToken.getToken()
        );
    };

    /* 로그인에만 성공시 사용할 AccessToken만 변경 */
    changeAuthentication(newAccessToken: string): void {
        this.authentication.changeAccessToken(newAccessToken);
    }
}