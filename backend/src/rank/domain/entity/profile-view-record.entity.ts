import { UUIDTransformer } from "src/user-auth-common/domain/entity/transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile_view_record')
export class ProfileViewRecord {
    
    @PrimaryGeneratedColumn('increment')
    private id: number;

    @Column({ 
        name: 'profile_id', 
        type: 'binary', 
        length: 16, 
        transformer: new UUIDTransformer() 
    })
    private profileId: string;

    @Column({ name: 'user_id' })
    private userId: number;

    constructor(profileId: string, viewUserId: number) {
        this.profileId = profileId;
        this.userId = viewUserId;
    };
    
    getProfileId(): string { return this.profileId; };
    getViewUser(): number { return this.userId; };
}