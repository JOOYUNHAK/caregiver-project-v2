import { Controller, Get, Query, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { JwtGuard } from 'src/auth/security/guard/jwt.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) {}
    @UseGuards(JwtGuard)
    @Get()
    async getWrittenProfile(@Request() req, @Query('page', ParseIntPipe) page:number) {
        const { id } = req.user;
        return await this.profileService.getWrittenProfile( id, page );
    }
}