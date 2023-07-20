import { DataSource, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";

export interface UserRepository extends Repository<User> {
    findByRefreshKey(refreshKey: string): Promise<User>;
    findByPhoneNumber(phoneNumber: string): Promise<User>;
};

export const customUserRepositoryMethods: Pick<
    UserRepository,
    'findByRefreshKey' | 
    'findByPhoneNumber'
    > = {
        async findByRefreshKey(this: Repository<User>, refreshKey: string)
        :Promise<User> {
            return await this.createQueryBuilder('user')
                .innerJoinAndSelect('user.authentication', 'auth')
                .where('auth.refresh_key = :refreshKey', { refreshKey })
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