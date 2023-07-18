import { User } from "../domain/entity/user.entity";
import { ClientDto } from "../interface/client.dto";

export abstract class UserAuthCommonMapper {
    toDto(user: User): ClientDto {
        return {
            name: user.getName(),
            accessToken: user.getAuthentication().getAccessToken(),
            refreshKey: user.getAuthentication().getRefreshKey()
        };
    }
}