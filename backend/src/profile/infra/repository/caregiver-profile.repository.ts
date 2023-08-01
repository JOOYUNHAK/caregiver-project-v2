import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { AggregationCursor, Db, Document, ObjectId, WithId } from "mongodb";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { ICaregiverProfileRepository } from "src/profile/domain/repository/icaregiver-profile.repository";

@Injectable()
export class CaregiverProfileRepository implements ICaregiverProfileRepository<WithId<CaregiverProfile>> {
    private readonly collectionName: string;

    constructor(
        @Inject('MONGO_CONNECTION')
        private readonly mongodb: Db,
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

    /* 데이터에 접근할 수 있는 Cursor 반환 */
    getProfileList(lastProfileId?: string): AggregationCursor {
        return this.mongodb
                .collection(this.collectionName)
                .aggregate(this.profileListPipelineStage(lastProfileId))
                .batchSize(20)
    }

    /* 조회된 Document를 인스턴스로 변경 */
    private documentToInstance(document: WithId<CaregiverProfile> | Document): CaregiverProfile {
        return plainToInstance(CaregiverProfile, document);
    }

    /* 프로필 리스트 조회하는 Stage */
    private profileListPipelineStage = (lastProfileId: string) => [
        { $match: 
            {
            ...this.ltProfileId(lastProfileId),
            isPrivate: false
            }
        },
        { $sort: { _id: -1 }},
        { $project: {
            userId: 1,
            career: 1,
            pay: 1,
            notice: 1,
            possibleDate: 1,
            possibleAreaList: 1,
            tagList: 1
        }}
    ]

    /* 마지막 프로필 아이디보다 오래된 프로필들 받아오기 위해 */
    private ltProfileId(profileId: string): null | { _id: { $lt: ObjectId }} {
        if( !profileId ) return null;

        return { _id: { $lt: new ObjectId(profileId) } };
    }
}