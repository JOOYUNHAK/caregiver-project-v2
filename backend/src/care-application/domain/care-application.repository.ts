import { DataSource, Repository } from "typeorm";
import { CareApplication } from "./care-application.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { GetApplicationStatusDto } from "../interface/dto/get-application-status.dto";

export interface CareApplicationRepository extends Repository<CareApplication> {
    findRecentApplicationFromIds(protectorId: number, caregiverId: number): Promise<CareApplication>;
    findStatusByIds(applicationIds: number[]): Promise<GetApplicationStatusDto []>;
}

export const customApplicationRepositoryMethods: Pick<
    CareApplicationRepository,
    'findRecentApplicationFromIds' |
    'findStatusByIds'
> = {
    async findRecentApplicationFromIds(
        this: Repository<CareApplication>,
        protectorId: number,
        caregiverId: number
    ) {
        return await this.createQueryBuilder()
            .where('protector_id = :protectorId')
            .andWhere('caregiver_id = :caregiverId')
            .setParameter('protectorId', protectorId)
            .setParameter('caregiverId', caregiverId)
            .orderBy('id', 'DESC')
            .getOne();
    },

    async findStatusByIds(this: Repository<CareApplication>, applicationIds: number []) {
        return await this.createQueryBuilder()
            .select(['id', 'status'])
            .where('id IN (:...ids)', { ids: applicationIds })
            .getRawMany()
    },
};

export const careApplicationRepoProvider = {
    provide: getRepositoryToken(CareApplication),
    inject: [getDataSourceToken()],
    useFactory(dataSource: DataSource) {
        return dataSource
            .getRepository(CareApplication)
            .extend(customApplicationRepositoryMethods)

    }
}