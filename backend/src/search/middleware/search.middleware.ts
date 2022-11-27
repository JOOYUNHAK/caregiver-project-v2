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
        //보호자인경우와 인기검색어에 있는 목록을 누르지 
        //않을 경우만 다시 인기검색어 카운트
        if( 
            req.headers['authorization'] !== undefined && 
            req.query.mostKeyWord === undefined
            ) {
            const _authorization = req.headers['authorization'];
            const _accessToken: string = _authorization.split(' ')[1];
            const _userid = this.jwtService.decode(_accessToken)['userid'];
            const { id, purpose } = await this.userService.findId(_userid);
            const { keyWord } = req.query;
             if ( purpose === '보호자' )
                this.searchService.storeSearchKeyWord( id, keyWord );
        }
        next();
    }
}