import { PatientProfile } from "../entity/protector/patient-profile.entity";

export interface IPatientProfileRepository<T> {
    save(patientProfile: PatientProfile): Promise<void>;
    findById(id: string): Promise<T>;
    delete(id: string): Promise<void>;
}