import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { CareGvier } from "./entity/caregiver.entity";
import { Protector } from "./entity/protector.entity";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        
        @Inject('PROTECTOR_REPOSITORY')
        private protectorRepository: Repository<Protector>,

        @Inject('CAREGIVER_REPOSITORY')
        private careGiverRepository: Repository<CareGvier>
    ){}

    //아이디 찾기
    async findId(id: string): Promise<UserDto | null> {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    //회원가입
    async createUser(createUserDto: CreateUserDto) {
        
        //사용자 기본 정보 객체 생성
        const user = new User();
        user.id = createUserDto.firstRegister['id'];
        user.name = createUserDto.firstRegister['name'];
        user.birth = createUserDto.firstRegister['birth'];
        user.sex = createUserDto.firstRegister['sex'];
        user.purpose = createUserDto.firstRegister['purpose'];

        const purpose = createUserDto.firstRegister['purpose']; //가입 목적
        let eachPurposeObj: object = getPurposeObj(); //각 가입 목적별 객체 생성

        //목적별 테이블에 저장
        purpose === '간병인' ? 
            await this.careGiverRepository.save(eachPurposeObj) : 
                purpose === '보호자' ? await this.protectorRepository.save(eachPurposeObj) : null
    
        //각 목적별 객체 반환받기
        function getPurposeObj(): object {
            switch (purpose) {
                case '간병인':
                    let careGiverObj: object = createCareGiver(createUserDto, user);
                    return careGiverObj;
                case '보호자':
                    let protectorObj: object = createProtector(createUserDto, user);
                    return protectorObj;     
            }  
        }
    }
}

//간병인 객체
function createCareGiver(createUserDto: CreateUserDto, user: User): object {

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
    careGiver.strength1 = createUserDto.lastRegister['strength']['strength1'];
    careGiver.strength2 = createUserDto.lastRegister['strength']['strength2'];
    careGiver.keywords = getKeywords();
    careGiver.notice = createUserDto.lastRegister['careGiver']['notice'];
    careGiver.user = user;
    return careGiver;
}

//보호자 객체 하나 만들기
function createProtector(createUserDto: CreateUserDto, user: User): object {
    const protector = new Protector();
    protector.patientWeight = createUserDto.secondRegister['patientWeight'];
    protector.patientSex = createUserDto.secondRegister['protectorSecondRegister']['patientSex'];
    protector.diagnosis = createUserDto.secondRegister['protectorSecondRegister']['diagnosis'];
    protector.place = createUserDto.secondRegister['protectorSecondRegister']['place'];
    protector.isNext = createUserDto.secondRegister['protectorSecondRegister']['isNext'];
    protector.patientState = createUserDto.secondRegister['protectorSecondRegister']['patientState'];
    protector.suction = createUserDto.lastRegister['suction'];
    protector.toilet = createUserDto.lastRegister['toilet'];
    protector.bedsore = createUserDto.lastRegister['bedsore'];
    protector.washing = createUserDto.lastRegister['washing'];
    protector.meal = createUserDto.lastRegister['meal'];
    protector.bathChair = createUserDto.lastRegister['bathChair'];
    protector.user = user;
    return protector
}