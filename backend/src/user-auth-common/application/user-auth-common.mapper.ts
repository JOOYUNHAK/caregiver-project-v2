import { User } from "../domain/entity/user.entity";
import { ClientDto } from "../interface/client.dto";

export abstract class UserAuthCommonMapper {
    async toDto(user: User): Promise<ClientDto> {
        return {
            id: user.getId(),
            accessToken: (await user.getAuthentication()).getAccessToken(),
        };
    }
}