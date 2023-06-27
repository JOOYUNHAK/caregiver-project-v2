import { Injectable } from "@nestjs/common";
import { ProtectorRegisterDto } from "src/user/interface/dto/protector-register.dto";
import { ProtectorMapper } from "../mapper/protector.mapper";
import { TokenService } from "src/auth/application/service/token.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Protector } from "src/user/domain/entity/protector/protector.entity";
import { Repository } from "typeorm";
import { ClientDto } from "src/user-auth-common/interface/client.interface";

@Injectable()
export class RegisterService {
    constructor( 
        private readonly protectorMapper: ProtectorMapper,
        private readonly tokenService: TokenService,
        @InjectRepository(Protector)
        private readonly protectorRepository: Repository<Protector>
    ) {}
    /* 보호자로 회원가입 */
    async registerAsProtector(protectorRegisterDto: ProtectorRegisterDto): Promise<ClientDto> {
        /* 회원가입 양식으로부터 보호자 객체로 변환 */
        const protector = this.protectorMapper.mapFrom(protectorRegisterDto);
        /* 새로운 인증 토큰들 발급 */
        const authentication = await this.tokenService.generateNewUsersToken(protector.getUser());
        protector.setAuthentication(authentication);
        /* DB에 저장하고 Client용 데이터에 맞게 전달 */
        const savedProtector = await this.protectorRepository.save(protector);
        await this.tokenService.addAccessTokenToSessionList(savedProtector.getId(), authentication.accessToken);
        return await this.protectorMapper.toDto(savedProtector);
    }
}