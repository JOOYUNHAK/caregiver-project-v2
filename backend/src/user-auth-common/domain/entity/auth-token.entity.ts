import { Time } from "src/common/shared/type/time.type";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UUIDTransformer } from "./transformer";

@Entity('auth_token')
export class Token {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type: 'binary', length: 16, name: 'refresh_key', transformer: new UUIDTransformer() })
    private refreshKey: string;

    @Column({ type: 'varchar', name: 'refresh_token' })
    private refreshToken: string;

    @UpdateDateColumn({ name: 'refreshed_at', type: 'timestamp'})
    private refreshedAt: Time;

    private accessToken: string;

    constructor(accessToken: string, refreshKey: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshKey = refreshKey;
        this.refreshToken = refreshToken;
    };

    getAccessToken(): string { return this.accessToken; };
    getRefreshKey(): string { return this.refreshKey; };
    getRefreshToken(): string { return this.refreshToken; };
    refreshAuthentication(accessToken: string, refreshKey: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshKey = refreshKey;
        this.refreshToken = refreshToken;
    }
}