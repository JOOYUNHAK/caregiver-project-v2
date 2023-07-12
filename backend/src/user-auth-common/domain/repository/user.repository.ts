import { DataSource, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";

export interface UserRepository extends Repository<User> {
    findByPhoneNumber(phoneNumber: string): Promise<User>;
};

export const customPhoneRepositoryMethods: Pick<
    UserRepository, 
    'findByPhoneNumber'
    > = {
        async findByPhoneNumber(this: Repository<User>, phoneNumber: string)
        : Promise<User> {
            return await this.createQueryBuilder('user')
                .innerJoin('user.phone', 'phone')
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
            .extend(customPhoneRepositoryMethods);
    }
}