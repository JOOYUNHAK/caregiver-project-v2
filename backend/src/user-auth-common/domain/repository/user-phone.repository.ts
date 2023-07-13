import { DataSource, Repository } from "typeorm";
import { Phone } from "../entity/user-phone.entity";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";

export interface PhoneRepository extends Repository<Phone> {
    this: Repository<Phone>;

    findByPhoneNumber(phoneNumber: string): Promise<Phone>;
};

export const customPhoneRepositoryMethods: Pick<
    PhoneRepository, 
    'findByPhoneNumber'
    > = {
        async findByPhoneNumber(this: Repository<Phone>, phoneNumber: string)
        : Promise<Phone> {
            return (await this.findBy({ phoneNumber }))[0];
        },
    }

export const PhoneRepositoryProvider = {
    provide: getRepositoryToken(Phone),
    inject: [getDataSourceToken()],
    useFactory(dataSource: DataSource) {
        return dataSource
            .getRepository(Phone)
            .extend(customPhoneRepositoryMethods);
    }
}
