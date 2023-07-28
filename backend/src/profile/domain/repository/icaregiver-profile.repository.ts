import { CaregiverProfile } from "../entity/caregiver/caregiver-profile.entity";

export interface ICaregiverProfileRepository<T> {
    save(caregiverProfile: CaregiverProfile): Promise<void>;
    findById(id: string): Promise<T>;
    delete(id: string): Promise<void>;
}