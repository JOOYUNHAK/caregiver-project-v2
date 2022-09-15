import { Body, Controller, Get, Param, Put, Query, Request, UseGuards } from "@nestjs/common";
import { UserDto } from "src/auth/dto/user.dto";
import { JwtGuard } from "src/auth/security/guard/jwt.guard";
import { PersonalGuard } from "src/auth/security/guard/personal.guard";
import { UserService } from "src/auth/user.service";
import { CareGiverProfileDto } from "./dto/caregiver-profile.dto";
import { ProfileUpdateDto } from "./dto/profile-update.dto";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
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
    async getProfileList( @Query() query, @Param('purpose') purpose: string): 
        Promise<CareGiverProfileDto [] | CareGiverProfileDto> {
        console.log(query['id'], purpose)
        if(!! query['id']) {
            return await this.userService.getProfileOne(purpose, query['id']);
        }
        return await this.userService.getProfileList(purpose);
    }

    @UseGuards(JwtGuard, PersonalGuard)
    @Put('profile')
    async updateProfile(@Body() profileUpdateDto: ProfileUpdateDto) {
        return await this.userService.updateProfile(profileUpdateDto)
    }

}