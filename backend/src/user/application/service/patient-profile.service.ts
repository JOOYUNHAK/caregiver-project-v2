import { ProtectorRegisterDto } from "src/user/interface/dto/protector-register.dto";
import { PatientProfileMapper } from "../mapper/patient-profile.mapper";
import { PatientProfileRepository } from "src/user/infra/repository/patient-profile.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientProfileService {
    constructor(
        private readonly patientProfileMapper: PatientProfileMapper,
        private readonly patientProfileRepository: PatientProfileRepository
    ) {}
    async addProfile(userId: number, protectorRegisterDto: ProtectorRegisterDto): Promise<void> {
        const patientProfile = this.patientProfileMapper.mapFrom(userId, protectorRegisterDto);
        await this.patientProfileRepository.save(patientProfile);
    }
}