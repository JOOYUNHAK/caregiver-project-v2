import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { Assistant, CareGvier, Protector } from "./entity/register.entity";
import { User } from "./entity/user.entity";
import { Token } from "./entity/token.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,

        @Inject('PROTECTOR_REPOSITORY')
        private protectorRepository: Repository<Protector>,

        @Inject('CAREGIVER_REPOSITORY')
        private careGiverRepository: Repository<CareGvier>,

        @Inject('ASSISTANT_REPOSITORY')
        private assistantRepository: Repository<Assistant>,

        @Inject('TOKEN_REPOSITORY')
        private tokenRepository: Repository<Token>,

        @Inject('DATA_SOURCE')
        private dataSoucre: DataSource,

        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    //아이디 찾기
    async findId(id: string): Promise<UserDto | null> {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    //accessToken 발행
    async setAccessToken(id: string): Promise<string> {
        const accessPayload = { userid: id, date: new Date()};

        const accessToken = this.jwtService.sign(accessPayload, {
        secret: this.configService.get('jwt.accessToken.secretKey'),
        expiresIn: this.configService.get('jwt.accessToken.expireTime')
        });

        return accessToken;
    }

    //refreshToken 발행
    async setRefreshToken(id: string) {
        const refreshPayload = { userid: id, date: new Date()};
        const refreshToken: string = this.jwtService.sign(refreshPayload, {
            secret: this.configService.get('jwt.refreshToken.secretKey'),
            expiresIn: this.configService.get('jwt.refreshToken.expireTime')
        });

        //로그인에 성공하면 refreshToken 발급하고 유저정보를 넘겨준다.
        await this.dataSoucre.query(
            `UPDATE token TOKEN INNER JOIN user USER 
             ON TOKEN.index = USER.token_index 
             SET TOKEN.refreshToken = ?
             WHERE USER.id = ?`, [refreshToken, id]
        ) 
        const user = await this.userRepository.findOne({ 
            select: ['id', 'email', 'name', 'purpose', 'isCertified', 'warning', 'token_index'],
            where: {
                id: id
            }
         });

         return user;
    };

    //해당 아이디의 refreshTokenIndex return
    /* async getRefreshTokenIndex(id: string): Promise<UserDto> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect(
                'user.token',
                'token'
            )
            .where('user.id = :id', {id: id})
            .getOne()
        
            return user;
    } */

    //회원가입
    async createUser(createUserDto: CreateUserDto) {

        const token = new Token();

        //사용자 기본 정보 객체 생성
        const user = new User();
        user.id = createUserDto.firstRegister['id'];
        user.name = createUserDto.firstRegister['name'];
        user.birth = createUserDto.firstRegister['birth'];
        user.sex = createUserDto.firstRegister['sex'];
        user.purpose = createUserDto.firstRegister['purpose'];
        user.token = token;

        const purpose = createUserDto.firstRegister['purpose']; //가입 목적
        let eachPurposeObj: object = getPurposeObj(); //각 가입 목적별 객체 생성

        //각 목적별 객체 반환받기
        function getPurposeObj(): object {
            switch (purpose) {
                case '간병인':
                    let careGiverObj: object = createCareGiver(createUserDto, user);
                    return careGiverObj;
                case '활동보조사':
                    let assistantObj: object = createAssistant(createUserDto, user);
                    return assistantObj;
                case '보호자':
                    let protectorObj: object = createProtector(createUserDto, user);
                    return protectorObj;
            };
        };

        //목적별 테이블에 저장
        purpose === '간병인' ?
            await this.careGiverRepository.save(eachPurposeObj) :
                purpose === '활동보조사' ?
                    await this.assistantRepository.save(eachPurposeObj) :
                        await this.protectorRepository.save(eachPurposeObj)
    }
}

//간병인 객체
function createCareGiver(createUserDto: CreateUserDto, user: User): CareGvier {

    function getPay(): string {
        return createUserDto.secondRegister['careGiver']['firstPay'] + '만원 ~ ' +
            createUserDto.secondRegister['careGiver']['secondPay'] + '만원'
    }

    function getKeywords(): string {
        let keyWords = [];
        keyWords.push(createUserDto.lastRegister['careGiver']['keyWord1']);
        keyWords.push(createUserDto.lastRegister['careGiver']['keyWord2']);
        keyWords.push(createUserDto.lastRegister['careGiver']['keyWord3']);
        return keyWords.join();
    }

    const careGiver = new CareGvier();

    const strength1 = createUserDto.lastRegister['strength']['first'];
    const strength2 = createUserDto.lastRegister['strength']['second'];

    careGiver.weight = createUserDto.secondRegister['weight'];
    careGiver.career = createUserDto.secondRegister['career'];
    careGiver.pay = getPay();
    careGiver.startDate = createUserDto.secondRegister['startDate'];
    careGiver.nextHospital = createUserDto.secondRegister['careGiver']['nextHospital'];
    careGiver.possibleArea = createUserDto.secondRegister['possibleArea'].join();
    careGiver.license = createUserDto.secondRegister['license'].join();
    careGiver.suction = createUserDto.lastRegister['suction'];
    careGiver.toilet = createUserDto.lastRegister['toilet'];
    careGiver.bedsore = createUserDto.lastRegister['bedsore'];
    careGiver.washing = createUserDto.lastRegister['washing'];
    careGiver.strength = ({ strength1: strength1, strength2: strength2 });
    careGiver.keywords = getKeywords();
    careGiver.notice = createUserDto.lastRegister['careGiver']['notice'];
    careGiver.user = user;
    return careGiver;
}

//활동보조사 객체 하나 만들기
function createAssistant(createUserDto: CreateUserDto, user: User): Assistant {
    const assistant = new Assistant();

    const strength1 = createUserDto.lastRegister['strength']['first'];
    const strength2 = createUserDto.lastRegister['strength']['second'];

    assistant.weight = createUserDto.secondRegister['weight'];
    assistant.career = createUserDto.secondRegister['career'];
    assistant.time = createUserDto.secondRegister['assistant']['time'];
    assistant.startDate = createUserDto.secondRegister['startDate'];
    assistant.training = createUserDto.secondRegister['assistant']['training'];
    assistant.possibleArea = createUserDto.secondRegister['possibleArea'].join();
    assistant.license = createUserDto.secondRegister['license'].join();
    assistant.strength = ({ strength1: strength1, strength2: strength2 });
    assistant.withPatient = createUserDto.lastRegister['assistant']['withPatient'];
    assistant.user = user;
    return assistant;
}

//보호자 객체 하나 만들기
function createProtector(createUserDto: CreateUserDto, user: User): Protector {
    const protector = new Protector();
    protector.patientWeight = createUserDto.secondRegister['weight'];
    protector.patientSex = createUserDto.secondRegister['protector']['patientSex'];
    protector.diagnosis = createUserDto.secondRegister['protector']['diagnosis'];
    protector.place = createUserDto.secondRegister['protector']['place'];
    protector.isNext = createUserDto.secondRegister['protector']['isNext'];
    protector.patientState = createUserDto.secondRegister['protector']['patientState'];
    protector.suction = createUserDto.lastRegister['suction'];
    protector.toilet = createUserDto.lastRegister['toilet'];
    protector.bedsore = createUserDto.lastRegister['bedsore'];
    protector.washing = createUserDto.lastRegister['washing'];
    protector.meal = createUserDto.lastRegister['protector']['meal'];
    protector.bathChair = createUserDto.lastRegister['protector']['bathChair'];
    protector.user = user;
    return protector;
}
