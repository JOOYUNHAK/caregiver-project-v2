import { DataSource } from "typeorm";
import { Token } from "./entity/token.entity";

export const tokenRepository = [
    {
        provide: 'TOKEN_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
        inject: ['DATA_SOURCE']
    }
];