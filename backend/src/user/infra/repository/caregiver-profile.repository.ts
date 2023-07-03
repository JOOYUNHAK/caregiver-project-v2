import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { Db, ObjectId, WithId } from "mongodb";
import { CaregiverProfile } from "src/user/domain/entity/caregiver/caregiver-profile.entity";
import { ICaregiverProfileRepository } from "src/user/domain/repository/icaregiver-profile.repository";

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

    async findById(id: string): Promise<WithId<CaregiverProfile>> {
        const findProfile = await this.mongodb
                                .collection<CaregiverProfile>(this.collectionName)
                                .findOne({ _id: new ObjectId(id) });
        
        return plainToInstance(CaregiverProfile, findProfile); 
    }

    async delete(id: string): Promise<void> {
        await this.mongodb
            .collection<CaregiverProfile>(this.collectionName)
            .deleteOne({ _id: new ObjectId(id) });
    }
}