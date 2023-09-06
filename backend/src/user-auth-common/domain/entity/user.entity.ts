import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => Email, (email) => email.user, { lazy: true, cascade: ['insert', 'update'] })
    email: Promise<Email[]>;

    @OneToOne(() => Phone, (phone) => phone.userId, { cascade: ['insert', 'update'] })
    private phone: Phone;

    @OneToOne(() => UserProfile, (profile) => profile.userId, { cascade: ['insert'] })
    private profile: UserProfile;

    @OneToOne(() => Token, (token) => token.userId, { cascade: ['insert', 'update'] })
    private authentication: Token;

    constructor(name: string, role: ROLE, loginType: LOGIN_TYPE, phone: Phone, profile: UserProfile, authentication: Token) {
        this.name = name;
        this.role = role;
        this.loginType = loginType;
        this.authentication = authentication;
        this.phone = phone;
        this.profile = profile;
    };

    getId(): number { return this.id; };
    getName(): string { return this.name; };
    getRole(): ROLE { return this.role; };
    getAuthentication(): Token { return this.authentication; };

    getPhone(): Phone { return this.phone; };
    async getEmail(): Promise<Email> { return (await this.email)[0]; };
    getProfile(): UserProfile { return this.profile; };

    withEmail(email: Email): User { 
        this.email = Promise.resolve([email]); 
        return this;
    };
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