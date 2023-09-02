import { ProfileLike } from "./entity/profile-like";

export class ProfileLikeMetadata {
    private count: number;
    private isLiked: boolean;
    
    constructor(count: number, profileLike: ProfileLike | null) {
        this.count = count;
        this.isLiked = profileLike ? true : false;
    };

    getCount(): number { return this.count };
    getIsLike(): boolean { return this.isLiked };
}