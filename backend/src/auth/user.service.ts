import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ){}

    async findId(id: string): Promise<UserDto | null> {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }
}