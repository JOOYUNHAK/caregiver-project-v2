import { DataSource, Repository } from "typeorm";
import { CareApplication } from "./care-application.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";

export interface CareApplicationRepository extends Repository<CareApplication> {
    findRecentApplicationFromIds(protectorId: number, caregiverId: number): Promise<CareApplication>;
}

export const customApplicationRepositoryMethods: Pick<
    CareApplicationRepository,
    'findRecentApplicationFromIds'
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