import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "src/auth/user.service";
import { SearchProfileListDto } from "./dto/search-profile-list.dto";
import { SearchProfileDto } from "./dto/search-profile.dto";
import { SearchService } from "./search.service";

@Controller('search') 
export class SearchController{
    constructor(
        private userService: UserService,
        private searchService: SearchService,
    ) {}


    @Get()
    async getSearchProfile(
            @Query() searchProfileDto: SearchProfileDto): Promise<SearchProfileListDto []> {
                return await this.searchService.getSearchProfile(searchProfileDto);
    }

    @Get('most/keywords')
    async getMostSearched(): Promise<(string|string[])[]> {
        return await this.searchService.getMostSearched();
    }
}