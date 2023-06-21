import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LOGIN_TYPE, ROLE } from "../enum/user.enum";
import { Phone } from "./user-phone.entity";
import { UserProfile } from "./user-profile.entity";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { Time } from "src/common/shared/type/time.type";
import { Email } from "./user-email.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @Column({ type: 'varchar', length: 5 })
    private name: string;

    @Column({ type: 'tinyint' })
    private role: ROLE;

    @Column({ type: 'tinyint' })
    private loginType: LOGIN_TYPE;

    @CreateDateColumn({ name: 'registered_at', type: 'timestamp' })
    private registeredAt: Time;

    @OneToOne(() => Email, (email) => email.userId, { cascade: ['insert', 'update']})
    private email: Promise<Email>;

    @OneToOne(() => Phone, (phone) => phone.userId, { cascade: ['insert', 'update'] })
    private phone: Promise<Phone>;

    @OneToOne(() => UserProfile, (profile) => profile.userId, { cascade: ['insert'] })
    private profile: Promise<UserProfile>;

    @OneToOne(() => Token, (token) => token.userId, { cascade: ['insert', 'update']})
    private authentication: Promise<Token>;

}