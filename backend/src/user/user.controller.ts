import { Body, Controller, Delete, Get, Param, Put, Query, Request, UseGuards } from "@nestjs/common";
import { UserDto } from "src/auth/dto/user.dto";
import { JwtGuard } from "src/auth/security/guard/jwt.guard";
import { PersonalGuard } from "src/auth/security/guard/personal.guard";
import { RolesGuard } from "src/auth/security/guard/roles.guard";
import { UserService } from "src/auth/user.service";
import { Roles } from "src/decorator/roles.decorator";
import { CareGiverProfileDto } from "./dto/caregiver-profile.dto";
import { HeartListDto } from "./dto/heart-list.dto";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { RequestProfileListDto } from "./dto/request-profile-list.dto";
import { HeartService } from "./heart.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private heartService: HeartService
    ){}
    
    /**
     * 회원 자격증 조회
     * @param id 조회원하는 아이디
     * @todo profile 경로로 query param으로 바꾸기
     * @returns 해당 아이디의 자격증 목록
     */
    @UseGuards(JwtGuard, PersonalGuard)
    @Get('certificate/:id')
    async getCertificate(@Param('id') id: string): Promise<any> {
        return await this.userService.getCertificate(id);
    }

    @Get('profile/:purpose')
    async getProfileList( @Request() req, @Query() query, @Param('purpose') purpose: string): 
        Promise<CareGiverProfileDto [] | CareGiverProfileDto> {
        console.log('hi')
        //한 유저의 profile request
        if(!! query['profileId']) {
            //비회원도 프로필은 볼 수 있어야 하기 때문에 id가 없으면 임의의 전화번호가 될 수 없는 값으로 조회
            return await this.userService.getProfileOne(purpose, query['profileId'], query['userId']);
        }
        // 모든 프로필 request( start는 시작 순번 )
        if( !! query['start']) {
            const requestProfileListDto = new RequestProfileListDto();
            requestProfileListDto.purpose = purpose;
            requestProfileListDto.start = query['start'];
            requestProfileListDto.mainFilter = query['mainFilter'];
            requestProfileListDto.payFilter = query['payFilter'];
            requestProfileListDto.startDateFilter = query['startDateFilter'];
            requestProfileListDto.sexFilter = query['sexFilter'];
            requestProfileListDto.ageFilter = query['ageFilter'];
            requestProfileListDto.areaFilter = query['areaFilter'];
            requestProfileListDto.licenseFilter = query['licenseFilter'];
            requestProfileListDto.warningFilter = query['warningFilter'];
            requestProfileListDto.strengthFilter = query['strengthFilter'];

            return await this.userService.getProfileList(requestProfileListDto);
        }
    }

    @UseGuards(JwtGuard, PersonalGuard)
    @Put('profile')
    async updateProfile(@Body() profileUpdateDto: ProfileUpdateDto) {
        return await this.userService.updateProfile(profileUpdateDto)
    }

    @UseGuards(JwtGuard, PersonalGuard)
    @Get('heartList/:id')
    async getHeartList(@Param('id') id: string): Promise<HeartListDto []> {
        return await this.heartService.getHeartList(id);
    }

    @UseGuards(JwtGuard, PersonalGuard)
    @Delete('heartList/:id')
    async resetHeartList(@Param('id')id: string) {
        console.log(id)
        await this.heartService.resetHeartList(id);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('간병인')
    @Put('heartList')
    async updateHeartList(@Request() req, @Body() data ) {
        const { id } = req.user;
        const { profileId } = data;
        return await this.heartService.updateHeartList( id, profileId );
    }
}