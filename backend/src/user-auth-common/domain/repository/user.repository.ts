import { DataSource, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { UUIDUtil } from "src/util/uuid.util";
import { GetNameDto } from "../interface/get-name.dto";

export interface UserRepository extends Repository<User> {
    findById(userId: number): Promise<User>;
    findByRefreshKey(refreshKey: string): Promise<User>;
    findByPhoneNumber(phoneNumber: string): Promise<User>;
    findNamesByIds(userIdList: number []): Promise<GetNameDto []>;
};

export const customUserRepositoryMethods: Pick<
    UserRepository,
    'findById' |
    'findByRefreshKey' | 
    'findByPhoneNumber' |
    'findNamesByIds'
    > = {
        async findById(this: Repository<User>, userId: number)
        :Promise<User> {
            return await this.createQueryBuilder('user')
                .innerJoinAndSelect('user.authentication', 'auth')
                .where('user.id = :userId', { userId })
                .getOne();
        },
        async findByRefreshKey(this: Repository<User>, refreshKey: string)
        :Promise<User> {
            return await this.createQueryBuilder('user')
                .innerJoinAndSelect('user.authentication', 'auth')
                .where('auth.refresh_key = :refreshKey', { refreshKey: UUIDUtil.toBinaray(refreshKey) })
                .getOne();
        },
        async findByPhoneNumber(this: Repository<User>, phoneNumber: string)
        : Promise<User> {
            return await this.createQueryBuilder('user')
                .innerJoin('user.phone', 'phone')
                .innerJoinAndSelect('user.authentication', 'token')
                .where('phone.phone_number = :phoneNumber', { phoneNumber })
                .getOne();
        },

        async findNamesByIds(this: Repository<User>, userIdList: number[]) {
            return await this.createQueryBuilder()
                .select('name')
                .where('id IN (:...userIds)', { userIds: userIdList })
                .getRawMany();
        },
    }

export const UserRepositoryProvider = {
    provide: getRepositoryToken(User),
    inject: [getDataSourceToken()],
    useFactory(dataSource: DataSource) {
        return dataSource
            .getRepository(User)
            .extend(customUserRepositoryMethods);
    }
}