import { Inject, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { DataSource, Repository, Brackets, IsNull } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { Assistant, CareGiver, Protector } from "./entity/register.entity";
import { User } from "./entity/user.entity";
import { Token } from "./entity/token.entity";
import { ProfileUpdateDto } from "src/user/dto/profile-update.dto";
import { CareGiverProfileDto, } from "src/user/dto/caregiver-profile.dto";
import { AssistantProfileDto } from "src/user/dto/assistant-profile.dto";
import { RequestProfileListDto } from "src/user/dto/request-profile-list.dto";
import { Heart } from "src/user/entity/heart.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,

        @Inject('PROTECTOR_REPOSITORY')
        private protectorRepository: Repository<Protector>,

        @Inject('HEART_REPOSITORY')
        private heartRepository: Repository<Heart>,

        @Inject('CAREGIVER_REPOSITORY')
        private careGiverRepository: Repository<CareGiver>,

        @Inject('ASSISTANT_REPOSITORY')
        private assistantRepository: Repository<Assistant>,

        @Inject('TOKEN_REPOSITORY')
        private tokenRepository: Repository<Token>,

        @Inject('DATA_SOURCE')
        private dataSoucre: DataSource,

        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    /**
     * 아이디나 이메일로 검색하여 해당 유저가 존재하는지 검사하는 함수
     * @param id 아이디 변경시: 이메일, 이외엔 아이디
     * @returns user
     */
    async findId(id: string): Promise<UserDto | null> {
        if (id.includes('@'))
            return await this.userRepository.findOne({
                where: {
                    email: id
                }
            });
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    /**
     * 해당 사용자의 이메일을 등록해주는 함수
     * @param id 등록하는 사용자의 아이디
     * @param email 등록할 이메일
     */
    async registerEmail(id: string, email: string) {
        await this.userRepository.update({ id: id }, { email: email });
    }

    /**
     * 해당 사용자의 프로필을 업데이트하는 함수
     * @param profileUpdateDto 필수 param 아이디와 업데이트 항목 넘겨받기
     */
    async updateProfile(profileUpdateDto: ProfileUpdateDto) {
        const { id } = profileUpdateDto;
        const range = profileUpdateDto
            ?.private

        await this.userRepository.update({ id: id }, { profile_off: range })
    }

    /**
     * 보조사들의 자격증 반환
     * @param id 조회할 아이디
     * @returns 해당 보조사의 자격증
     */
    async getCertificate(id: string): Promise<{ certificate: string }> {
        const { purpose } = await this.userRepository
            .createQueryBuilder('user')
            .select('user.purpose', 'purpose')
            .where("user.id = :id", { id: id })
            .getRawOne();

        if (purpose === '간병인') {
            return await this.careGiverRepository
                .createQueryBuilder('cg')
                .select('cg.license', 'certificate')
                .where('cg.user_id = :id', { id: id })
                .getRawOne();
        } else {
            return await this.assistantRepository
                .createQueryBuilder('at')
                .select('at.license', 'certificate')
                .where('cg.user_id = :id', { id: id })
                .getRawOne();
        }
    }

    /**W
     * 해당 가입목적의 사용자들 프로필 list 전체(filter 존재시 적용) return
     * @returns 해당 가입 사용자 프로필 list
     */
    async getProfileList(requestProfileListDto: RequestProfileListDto): Promise<CareGiverProfileDto[]> {
        const { purpose, start, mainFilter, payFilter, startDateFilter, sexFilter,
            ageFilter, areaFilter, licenseFilter, warningFilter, strengthFilter, exceptLicenseFilter } = requestProfileListDto;
        if (purpose === 'careGiver') {
            console.log(mainFilter)

            let query;
            // 찜 필터는 찜 개수 구해서 sub query로 넘겨줌
            if (mainFilter === 'heart') {
                
                //서브 쿼리로 카운트 값을 구한 후 merge
                const heartCountSubQuery = this.heartRepository
                    .createQueryBuilder()
                    .subQuery()
                    .select([
                        'heart.heart_id as heartId',
                        'COUNT(heart.heart_id) AS count'
                    ])
                    .from(Heart, 'heart')
                    .groupBy('heartId')
                    .getQuery();

                query = this.careGiverRepository
                    .createQueryBuilder('cg')
                    .innerJoin('cg.user', 'user')
                    .leftJoin(heartCountSubQuery, 'heart', 'heart.heartId = cg.id')
                    .addSelect([
                        'heart.count as count'
                    ])
            }
            else {
                query = this.careGiverRepository
                    .createQueryBuilder('cg')
                    .innerJoin('cg.user', 'user')
            }


            return await query
                .select([
                    'cg.id as id',
                    'cg.career as career',
                    'cg.pay as pay',
                    'cg.startDate as startDate',
                    'cg.possibleArea as possibleArea',
                    'cg.license as license',
                    'cg.keywords as keywords',
                    'cg.notice as notice',
                    'user.name as name',
                    'user.birth as birth',
                    'user.sex as sex',
                    'user.purpose as purpose',
                    'user.isCertified as isCertified',
                    'user.warning as warning',
                ])
                .where('user.profile_off = :profile_off', { profile_off: false })
                .andWhere(
                    new Brackets((qb) => {
                        //일당 필터
                        if (!!payFilter) {
                            qb.andWhere('cg.pay <= :pay', {
                                pay: payFilter === 'under10' ? 10 :
                                    payFilter === 'under15' ? 15 : 20
                            })
                        }
                        //시작가능일 필터
                        if (!!startDateFilter) {
                            qb.andWhere('cg.startDate <= :startDate', {
                                startDate: startDateFilter === 'immediately' ? 1 : startDateFilter === '1week' ? 2
                                    : startDateFilter === '2week' ? 3 : startDateFilter === '3week' ? 4 : 5
                            })
                        }
                        //나이 필터
                        if (!!ageFilter) {
                            const { startAge, endAge } = getStartEndYear(ageFilter);
                            qb.andWhere('user.birth between :startAge and :endAge', {
                                startAge: endAge, endAge: startAge
                            })
                        }
                        //성별 필터
                        if (!!sexFilter) {
                            qb.andWhere('user.sex = :sex', { sex: sexFilter === '남' ? '남' : '여' });
                        }
                        //지역 필터
                        if (!!areaFilter) {
                            const areaList = convertStringToLikeQuery(areaFilter);

                            //첫번째 쿼리문 무조건 필터 한개는 들어오기
                            switch (areaList.length) {
                                case 1:
                                    qb.andWhere('cg.possibleArea like :area', { area: areaList[0] });
                                    break;
                                case 2:
                                    qb.andWhere(new Brackets((sub) => {
                                        sub.where('cg.possibleArea like :firstArea ', { firstArea: areaList[0] })
                                            .orWhere('cg.possibleArea like :secondArea', { secondArea: areaList[1] });
                                    }))
                                    break;
                                case 3:
                                    qb.andWhere(new Brackets((sub) => {
                                        sub.where('cg.possibleArea like :firstArea ', { firstArea: areaList[0] })
                                            .orWhere('cg.possibleArea like :secondArea', { secondArea: areaList[1] })
                                            .orWhere('cg.possibleArea like :thirdArea', { thirdArea: areaList[2] });
                                    }))
                                    break;
                            }
                        }
                        if (!!licenseFilter) {
                            const licenseList = convertStringToLikeQuery(licenseFilter);

                            switch (licenseList.length) {
                                case 1:
                                    qb.andWhere('cg.license like :license', { license: licenseList[0] });
                                    break;
                                case 2:
                                    qb.andWhere(new Brackets((sub) => {
                                        sub.where('cg.license like :firstLicense ', { firstLicense: licenseList[0] })
                                            .orWhere('cg.license like :secondLicense', { secondLicense: licenseList[1] });
                                    }))
                                    break;
                                case 3:
                                    qb.andWhere(new Brackets((sub) => {
                                        sub.where('cg.license like :firstLicense ', { firstLicense: licenseList[0] })
                                            .orWhere('cg.license like :secondLicense', { secondLicense: licenseList[1] })
                                            .orWhere('cg.license like :thirdLicense', { thirdLicense: licenseList[2] });
                                    }))
                                    break;
                            }
                        }
                        if (!!warningFilter) {
                            qb.andWhere('user.warning is null')
                        }
                        if (!!strengthFilter)
                            qb.andWhere('cg.strength != :strength', { strength: '{"first":"","second":""}' })
                        /* if( !!exceptLicenseFilter)
                            qb.andWhere('cg.license is not null') */
                    })
                )
                .orderBy(
                    mainFilter === 'pay' ? 'cg.pay' :
                        mainFilter === 'startDate' ? 'cg.startDate' :
                            mainFilter === 'heart' ? 'heart.count' : null,

                    mainFilter === 'pay' || mainFilter === 'startDate' ? 'ASC' : 'DESC'
                )
                .offset(start)
                .limit(5)
                .getRawMany();
        }
        /* else {
            return await this.assistantRepository
                .createQueryBuilder('at')
                .innerJoin('at.user', 'user')
                .addSelect([
                    'user.name',
                    'user.birth',
                    'user.sex',
                    'user.isCertified',
                    'user.warning',
                ])
                .getMany();
        } */
    }

    /**
     * 특정 사용자의 프로필 return
     * @param purpose 가입목적
     * @param profileId 해당 목적 테이블의 id
     * @returns 특정 사용자 profile
     */
    async getProfileOne(purpose: string, profileId: string, userId: string): Promise<CareGiverProfileDto> {
        if (purpose === 'careGiver') {
            let heart = await this.heartRepository
                .createQueryBuilder('heart')
                .select('COUNT(heart.heart_id) AS heartCount')
                .groupBy('heart.heart_id')
                .having('heart.heart_id =:profileId', { profileId: profileId })
                .addSelect(subQuery => {
                    return subQuery
                        .select('heart.heart_id AS isHearted')
                        .from(Heart, 'heart')
                        .where('heart.user_id = :userId AND heart.heart_id = :profileId', {
                            userId: userId, profileId: profileId
                        })
                }, 'isHearted')
                .getRawOne();
            //조회되는 값이 없으면 만들어서 data return
            heart === undefined ? heart = { heartCount: 0, isHearted: null } : heart

            const profile = await this.careGiverRepository
                .createQueryBuilder('cg')
                .innerJoin('cg.user', 'user')
                .where('cg.id = :profileId', { profileId: profileId })
                .andWhere('user.profile_off = :profile_off', { profile_off: false })
                .addSelect([
                    'user.name',
                    'user.birth',
                    'user.sex',
                    'user.purpose',
                    'user.isCertified',
                    'user.warning',
                ])
                .getOne();

            //찜 관련 db 반환위해
            const result = { ...profile, heart }

            if (profile === null)
                throw new HttpException(
                    '해당 간병인의 프로필은 현재 비공개 및 탈퇴의 이유로 찾을 수 없습니다.',
                    HttpStatus.NOT_FOUND
                )

            return result;
        }
    }

    /**
     * 로그인에 성공한 사용자에게 accessToken 발급해주는 함수
     * @param id 로그인 시도한 아이디
     * @returns accessToken
     */
    async setAccessToken(id: string): Promise<string> {
        const accessPayload = { userid: id, date: new Date() };

        const accessToken = this.jwtService.sign(accessPayload, {
            secret: this.configService.get('jwt.accessToken.secretKey'),
            expiresIn: this.configService.get('jwt.accessToken.expireTime')
        });
        return accessToken;
    }

    //refreshToken 발행
    async setRefreshToken(id: string, refresh?: boolean) {

        const refreshPayload = { userid: id, date: new Date() };
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

        //로그인에 성공시에만 유저 정보 넘겨주고, refreshToken 재발급시에는 업데이트만 해준다.
        if (refresh === undefined) {
            const user = await this.userRepository.findOne({
                select: ['id', 'email', 'name', 'purpose', 'isCertified', 'warning', 'token_index'],
                where: {
                    id: id
                }
            });
            return user;
        }
    };

    //토큰 만료됐을 경우 refreshToken으로 새로운 토큰 발급
    async requestRefreshToken(jwt: string, index: number): Promise<{ accessToken: string, user: UserDto }> {
        const payload = this.jwtService.decode(jwt);

        const userid = payload['userid']; //만료된 accessToken의 userid
        const user = await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect(
                'user.token',
                'token'
            )
            .where('user.id = :id', { id: userid })
            .getOne();

        //token index값이 해당 유저의 refreshtoken index값하고 일치하면 
        //해당 아이디의 refreshToken 유효성 검사
        if (user.token_index == index) {
            const refreshToken = user.token.refreshToken;

            //refreshToken이 db에 없는경우
            if (refreshToken === null)
                throw new HttpException(
                    'refreshToken 없음',
                    HttpStatus.NOT_FOUND
                )
            //refreshToken이 db에 있는 경우
            try {
                const verifyResult = await this.jwtService.verify(
                    refreshToken, { secret: this.configService.get('jwt.refreshToken.secretKey') });

                const refreshTokenExp = verifyResult['exp']; //refreshToken의 남은 시간
                this.checkRefreshTokenExp(userid, refreshTokenExp);
                const accessToken = await this.setAccessToken(userid); //새로 발급 받은 accessToken
                const user = await this.findId(userid); //해당 유저
                return { accessToken: accessToken, user: user }
            }
            catch (err) {
                //signature가 잘못된 경우, 만료기간 지난경우 
                await this.dataSoucre.query(
                    `UPDATE token TOKEN INNER JOIN user USER 
                    ON TOKEN.index = USER.token_index 
                    SET TOKEN.refreshToken = null
                    WHERE USER.id = ?`, [userid]
                )
                throw new HttpException(
                    'refreshToken 권한 문제',
                    HttpStatus.UNAUTHORIZED
                )
            }
        }
    }

    //refreshToken의 유효 기간이 1주일 밑으로 남았을 경우 자동 갱신
    checkRefreshTokenExp(userid: string, refreshTokenExp: number) {
        const today = Date.now();
        const todaySecond = Math.floor(today / 1000);
        const refreshDay = 86400 * 7;
        //refreshToken 만료기간이 1주일 이하면 새로 발급
        if ((refreshTokenExp - todaySecond) < refreshDay)
            this.setRefreshToken(userid, true);
        return;
    }

    //회원가입
    async createUser(createUserDto: CreateUserDto): Promise<{ status: string, accessToken: string, user: UserDto }> {

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

        const accessToken = await this.setAccessToken(user.id); //회원가입과 동시에 로그인처리 위해
        const registerUser = await this.setRefreshToken(user.id); // accessToken과 refreshToken 발급하고 return
        return { status: 'success', accessToken: accessToken, user: registerUser }
    }
}

//간병인 객체
function createCareGiver(createUserDto: CreateUserDto, user: User): CareGiver {

    function getKeywords(): string {
        let keyWords = [];
        keyWords.push(createUserDto.lastRegister['careGiver']['keyWord1']);
        keyWords.push(createUserDto.lastRegister['careGiver']['keyWord2']);
        keyWords.push(createUserDto.lastRegister['careGiver']['keyWord3']);
        return keyWords.join();
    }

    const careGiver = new CareGiver();

    const strength1 = createUserDto.lastRegister['strength']['first'];
    const strength2 = createUserDto.lastRegister['strength']['second'];

    careGiver.weight = createUserDto.secondRegister['weight'];
    careGiver.career = createUserDto.secondRegister['career'];
    careGiver.pay = createUserDto.secondRegister['careGiver']['firstPay'];
    careGiver.startDate = createUserDto.secondRegister['startDate'];
    careGiver.nextHospital = createUserDto.secondRegister['careGiver']['nextHospital'];
    careGiver.possibleArea = createUserDto.secondRegister['possibleArea'].join();
    careGiver.license = createUserDto.secondRegister['license'].join();
    careGiver.suction = createUserDto.lastRegister['suction'];
    careGiver.toilet = createUserDto.lastRegister['toilet'];
    careGiver.bedsore = createUserDto.lastRegister['bedsore'];
    careGiver.washing = createUserDto.lastRegister['washing'];
    careGiver.strength = ({ first: strength1, second: strength2 });
    careGiver.keywords = getKeywords();
    careGiver.notice = createUserDto.lastRegister['careGiver']['notice'];
    careGiver.extraFee = createUserDto.lastRegister['careGiver']['extraFee'];
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
    //assistant.startDate = createUserDto.secondRegister['startDate'];
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
    protector.period = createUserDto.secondRegister['protector']['period'];
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

export function getStartEndYear(ageFilter: number): { startAge: string, endAge: string } {
    let startAge: string, endAge: string;
    const year = new Date().getFullYear();
    switch (Number(ageFilter)) {
        case 20:
            startAge = year - 20 + 2 + '';
            endAge = year - 20 + 1 - 9 + '';
            break;
        case 30:
            startAge = year - 30 + 2 + '';
            endAge = year - 30 + 1 - 9 + '';
            break;
        case 40:
            startAge = year - 40 + 2 + '';
            endAge = year - 40 + 1 - 9 + '';
            break;
        case 50:
            startAge = year - 50 + 2 + '';
            endAge = year - 50 + 1 - 9 + '';
            break;
        case 60:
            startAge = year - 60 + 2 + '';
            endAge = year - 60 + 1 - 9 + '';
            break;
    }
    return { startAge: startAge, endAge: endAge }
}

export function convertStringToLikeQuery(filterString: string): string[] {
    const filterList = filterString.split(',');
    filterList.forEach((filter, index) => {
        const likeQuery = '\%' + filter + '\%';
        filterList[index] = likeQuery;
    });
    return filterList;
}