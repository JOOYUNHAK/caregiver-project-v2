import { Controller, Get, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(
        private authService: AuthService 
     ) {}

     @Get(':id')
    async getAuthNumber(@Param('id')id: string ): Promise<number | boolean> {
        return await this.authService.authId(id);
     }
    
}
