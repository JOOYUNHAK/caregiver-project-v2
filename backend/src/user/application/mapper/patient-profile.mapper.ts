import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Time } from "src/common/shared/type/time.type";
import { PatientProfileBuilder } from "src/user/domain/builder/profile.builder";
import { CarePeriod } from "src/user/domain/entity/protector/care-period.entity";
import { PatientProfile } from "src/user/domain/entity/protector/patient-profile.entity";
import { ProtectorRegisterDto } from "src/user/interface/dto/protector-register.dto";

@Injectable()
export class PatientProfileMapper {
    mapFrom(userId: number, protectorRegisterDto: ProtectorRegisterDto): PatientProfile {
        const { secondRegister, lastRegister } = protectorRegisterDto;
        return new PatientProfileBuilder( new ObjectId() )
            .userId(userId)
            .weight(secondRegister.weight)
            .sex(secondRegister.patientSex)
            .diagnosis(secondRegister.diagnosis)
            .carePlace(secondRegister.place)
            .nextHospital(secondRegister.isNext)
            .carePeriod(this.toCarePeriod(
                secondRegister.startPeriod,
                secondRegister.endPeriod,
                secondRegister.totalPeriod
            ))
            .detailedCondition(secondRegister.patientState)
            .helpList(lastRegister)
            .build();
    };

    private toCarePeriod(startDate:Time, endDate: Time, totalDay: number): CarePeriod {
        return new CarePeriod(startDate, endDate, totalDay);
    };
}