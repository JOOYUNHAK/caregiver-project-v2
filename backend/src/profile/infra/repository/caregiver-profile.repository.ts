import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { Db, Document, ObjectId, WithId } from "mongodb";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { ICaregiverProfileRepository } from "src/profile/domain/repository/icaregiver-profile.repository";
import { ProfileQueryFactory } from "./profile-query.factory";
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options";
import { CaregiverProfileListData } from "src/profile/domain/profile-list-data";

@Injectable()
export class CaregiverProfileRepository implements ICaregiverProfileRepository<WithId<CaregiverProfile>> {
    private readonly collectionName: string;

    constructor(
        @Inject('MONGO_CONNECTION')
        private readonly mongodb: Db,
        private readonly profileQueryFactory: ProfileQueryFactory,
        private readonly configService: ConfigService
    ) {
        this.collectionName = configService.get('db.mongodb.collection.caregiver_profile');
    }

    async save(caregiverProfile: CaregiverProfile): Promise<void> {
        await this.mongodb
            .collection<CaregiverProfile>(this.collectionName)
            .insertOne(caregiverProfile);
    };

    async findById(id: string): Promise<CaregiverProfile> {
        const findProfile = await this.mongodb
                                .collection<CaregiverProfile>(this.collectionName)
                                .findOne({ _id: new ObjectId(id) });
        
        return this.documentToInstance(findProfile);
    }

    async findByUserId(userId: number): Promise<CaregiverProfile> {
        const [findProfile] = await this.mongodb
                                .collection<CaregiverProfile>(this.collectionName)
                                .aggregate()
                                .match({ userId })
                                .toArray();
        
        return this.documentToInstance(findProfile);
    }

    async delete(id: string): Promise<void> {
        await this.mongodb
            .collection<CaregiverProfile>(this.collectionName)
            .deleteOne({ _id: new ObjectId(id) });
    }

    /* 조회된 리스트 반환, 인스턴스로 변경하지 않고 Document 데이터 그대로 반환 */
    async getProfileList(listQueryOptions: ProfileListQueryOptions): Promise<CaregiverProfileListData []> {
        return await this.mongodb
                .collection(this.collectionName)
                .aggregate(this.profileQueryFactory.listPipeline(listQueryOptions))
                .limit(5)
                .toArray() as unknown as Array<CaregiverProfileListData>
    }

    /* 조회된 Document를 인스턴스로 변경 */
    private documentToInstance(document: WithId<CaregiverProfile> | Document): CaregiverProfile {
        return plainToInstance(CaregiverProfile, document);
    }
}