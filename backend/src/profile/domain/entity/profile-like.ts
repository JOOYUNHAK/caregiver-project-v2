import { UUIDTransformer } from "src/user-auth-common/domain/entity/transformer";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile_like_history')
export class ProfileLike {
    @PrimaryGeneratedColumn('increment')
    private id: number;

    /* 프로필 아이디 */
    @Index()
    @Column({ 
        name: 'profile_id', 
        type: 'binary', 
        length: 12, 
        transformer: new UUIDTransformer() 
    })
    private profileId: string;

    /* 찜 누른 사용자 아이디 */
    @Column({ name: 'like_user_id', type: 'int' })
    private likeUserId: number;

    constructor(profileId: string, userId: number) {
        this.profileId = profileId;
        this.likeUserId = userId;
    }

    getProfileId(): string { return this.profileId; };
    getLikeUserId(): number { return this.likeUserId; };
}