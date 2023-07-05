import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { Db, ObjectId, WithId } from "mongodb";
import { PatientProfile } from "src/user/domain/entity/protector/patient-profile.entity";
import { IPatientProfileRepository } from "src/user/domain/repository/ipatient-profile.repository";

@Injectable()
export class PatientProfileRepository implements IPatientProfileRepository<WithId<PatientProfile>> {
    private readonly collectionName: string;

    constructor(
        @Inject('MONGO_CONNECTION')
        private readonly mongodb: Db,
        private readonly configService: ConfigService
    ) {
        this.collectionName = configService.get('db.mongodb.collection.patient_profile');
    }

    async save(patientProfile: PatientProfile): Promise<void> {
        await this.mongodb
            .collection<PatientProfile>(this.collectionName)
            .insertOne(patientProfile);
    };

    async findById(id: string): Promise<WithId<PatientProfile>> {
        const findProfile = await this.mongodb
                                .collection<PatientProfile>(this.collectionName)
                                .findOne({ _id: new ObjectId(id) });
        
        return plainToInstance(PatientProfile, findProfile); 
    }

    async delete(id: string): Promise<void> {
        await this.mongodb
            .collection<PatientProfile>(this.collectionName)
            .deleteOne({ _id: new ObjectId(id) });
    }
}