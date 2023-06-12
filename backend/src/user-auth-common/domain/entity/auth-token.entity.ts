import { User } from "src/user-auth-common/domain/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth_token')
export class Token {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    readonly userId: number;

    @Column({ type: 'varchar', name: 'refresh_token' })
    private refreshToken: string;

    @Column({ name: 'refreshed_at', type: 'timestamp' })
    private refreshedAt: Date;
}