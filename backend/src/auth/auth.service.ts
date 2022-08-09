import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdDto } from './dto/id';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    findOne(id: string): Promise<User> {
        return this.userRepository.findOneBy({ id })
    }

    async authId(id: string): Promise<number | boolean> {
        const result = await this.findOne(id);
        if(result)
            return true;
        return false;
    }
}
