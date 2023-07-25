import { DataSource, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { UUIDUtil } from "src/util/uuid.util";

export interface UserRepository extends Repository<User> {
    findById(userId: number): Promise<User>;
    findByRefreshKey(refreshKey: string): Promise<User>;
    findByPhoneNumber(phoneNumber: string): Promise<User>;
};

export const customUserRepositoryMethods: Pick<
    UserRepository,
    'findById' |
    'findByRefreshKey' | 
    'findByPhoneNumber'
    > = {
        async findById(this: Repository<User>, userId: number)
        :Promise<User> {
            return await this.createQueryBuilder('user')
                .innerJoinAndSelect('user.authentication', 'auth')
                .innerJoinAndSelect('user.phone', 'phone')
                .leftJoinAndSelect('user.email', 'email')
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