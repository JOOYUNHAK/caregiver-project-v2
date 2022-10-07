import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/auth/user.service";
import { SearchService } from "../search.service";

@Injectable()
export class SearchMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private searchService: SearchService
    ) {}
    async use(req: any, res: any, next: (error?: any) => void) {

        if( req.headers['authorization'] !== undefined ) {
            const _authorization = req.headers['authorization'];
            const _accessToken: string = _authorization.split(' ')[1];
            const _userid = this.jwtService.decode(_accessToken)['userid'];
            const { id, purpose } = await this.userService.findId(_userid);
            const { keyWord } = req.query;
             if ( purpose === '간병인' )
                this.searchService.storeSearchKeyWord( id, keyWord );
        }
        next();
    }
}