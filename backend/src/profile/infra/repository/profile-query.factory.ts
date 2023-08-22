import { Injectable } from "@nestjs/common";
import { MongoQuery, MongoQueryFactory } from "../../../util/mongodb/mongo-query.factory";
import { AggregratePipelineBuilder } from "src/util/mongodb/aggregrate-pipeline.builder";
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options";
import { ProfileSort } from "src/profile/domain/profile-sort";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";
import { ProfileFilter } from "src/profile/domain/profile-filter";
import { Sort } from "src/profile/domain/enum/sort.enum";

@Injectable()
export class ProfileQueryFactory extends MongoQueryFactory {

    /* 프로필 리스트를 조회하는 Query */
    listPipeline(listQueryOptions: ProfileListQueryOptions): any {
        
        /* builder 초기화 */
        const pipelineBuilder = AggregratePipelineBuilder.initialize();

        /* 정렬 조건이 추가로 있는 경우 해당 조건에 맞게 파이프라인 생성 */
        if( listQueryOptions.hasSortOptions() ) {
            this.createListPipelineWithSortOptions(
                pipelineBuilder, listQueryOptions.getNextCursor(),
                listQueryOptions.getSortOptions(), listQueryOptions.getFilters()
            );
        }
        /* 정렬 조건이 추가로 없는 경우 최신순으로만 정렬하여 파이프라인 생성 */ 
        else {
            this.createListPipelineWithNonSortOptions(
                pipelineBuilder, listQueryOptions.getNextCursor(),
                listQueryOptions.getSortOptions(), listQueryOptions.getFilters()
            );
        }

        /* 정렬 조건에 따른 파이프라인 스테이지를 추가하고 마지막 Project 스테이지 추가 */
        return this.addListProjectStage(pipelineBuilder).build();
    };

    /* 정렬 조건이 추가로 있는 경우 */
    private createListPipelineWithSortOptions(
        pipelineBuilder: AggregratePipelineBuilder,
        nextCursor: ProfileListCursor,
        sort: ProfileSort,
        filters: ProfileFilter
    ) {
        const { pay, sex, startDate, age, area, license, strengthExcept } = filters;

        /* 정렬 조건이 일당 낮은 순 */
        if ( sort.getOption() === Sort.LowPay ) {
            pipelineBuilder.match(
                this.equals('isPrivate', false), // 비공개 프로필
                // 마지막 프로필 커서의 일당보다 크거나, 
                // 마지막 프로필 커서의 일당과 같으면서 프로필 아이디가 더 오래된 것 
                this.or([
                    this.gtThan('pay', nextCursor.combinedOtherSortNext()),
                    this.combineOperators(
                        this.equals('pay', nextCursor.combinedOtherSortNext()),
                        this.ltThan('_id', nextCursor.combinedDefaultSortNext())
                    )
                ]),
                this.lteThan('pay', pay), // 필터 조건의 일당보다 낮은 프로필
                this.lteThan('possibleDate', startDate), // 필터 조건의 시작 가능일보다 빠른 프로필
                this.equals('sex', sex), // 필터 조건의 성별과 일치하는 프로필
                // 나이의 필터는 20대, 30대식으로 이루어지기에
                // 필터로 20대가 주어지면 조건은 20 ~ 29로 생성
                this.equals('age',
                    this.combineOperators(
                        this.operator('gte', age),
                        this.operator('lt', age + 10)
                    )
                ),
                this.notEmptyStrengthList(strengthExcept), // 강점 작성한 프로필
                this.matchAnyElementInArray('possibleAreaList', area), // 주어진 지역과 하나라도 일치하는 프로필
                this.matchAnyElementInArray('licenseList', license) // 주어진 자격증과 하나라도 일치하는 프로필
            )
        }
        /* 정렬 조건이 시작일 빠른 순 */
        else if( sort.getOption() === Sort.FastStartDate ) {
            /* 조건은 위와 동일 */
            pipelineBuilder.match(
                this.equals('isPrivate', false),
                this.or([
                    this.gtThan('possibleDate', nextCursor.combinedOtherSortNext()),
                    this.combineOperators(
                        this.equals('possibleDate', nextCursor.combinedOtherSortNext()),
                        this.ltThan('_id', nextCursor.combinedDefaultSortNext())
                    )
                ]),
                this.lteThan('possibleDate', startDate),
                this.lteThan('pay', pay),
                this.equals('sex', sex), 
                this.equals('age',
                    this.combineOperators(
                        this.operator('gte', age),
                        this.operator('lt', age + 10)
                    )
                ),
                this.notEmptyStrengthList(strengthExcept), // 강점 작성한 프로필
                this.matchAnyElementInArray('possibleAreaList', area), // 주어진 지역과 하나라도 일치하는 프로필
                this.matchAnyElementInArray('licenseList', license) // 주어진 자격증과 하나라도 일치하는 프로필
            )
        }
        /* 정렬 조건은 추가로 있는데 첫 요청일 경우 */
        else {
            /* 조건은 위와 동일 */
            pipelineBuilder.match(
                this.equals('isPrivate', false),
                this.lteThan('pay', pay),
                this.lteThan('possibleDate', startDate),
                this.equals('sex', sex), 
                this.equals('age',
                    this.combineOperators(
                        this.operator('gte', age),
                        this.operator('lt', age + 10)
                    )
                ),
                this.notEmptyStrengthList(strengthExcept), // 강점 작성한 프로필
                this.matchAnyElementInArray('possibleAreaList', area), // 주어진 지역과 하나라도 일치하는 프로필
                this.matchAnyElementInArray('licenseList', license) // 주어진 자격증과 하나라도 일치하는 프로필
            )
        }

        /* 호출되는 시점에 정렬 기준으로 들어온 필드와 이후 최신순으로 정렬 */
        pipelineBuilder.sort(
            this.orderBy(sort.otherField(), sort.otherFieldBy()),
            this.orderBy(sort.defaultField(), sort.defaultFieldBy())
        )
    };

    /* 정렬 조건이 추가로 없는 경우 */
    private createListPipelineWithNonSortOptions (
        pipelineBuilder: AggregratePipelineBuilder,
        nextCursor: ProfileListCursor,
        sort: ProfileSort,
        filters: ProfileFilter
    ) {
        const { pay, sex, startDate, age, area, license, strengthExcept } = filters;

        pipelineBuilder
            .match(
                /* 이전 요청에 아이디가 있다면 해당 아이디 다음부터 */
                this.ltThan('_id', nextCursor.defaultSortNext()), 
                this.equals('isPrivate', false),
                this.lteThan('pay', pay), 
                this.lteThan('possibleDate', startDate), 
                this.equals('sex', sex), 
                this.equals('age',
                    this.combineOperators(
                        this.operator('gte', age),
                        this.operator('lt', age + 10)
                    )
                ),
                this.notEmptyStrengthList(strengthExcept), 
                this.matchAnyElementInArray('possibleAreaList', area), 
                this.matchAnyElementInArray('licenseList', license) 
            )
            .sort(
                this.orderBy(sort.defaultField(), sort.defaultFieldBy()) // 최신순 정렬
            )
    }

    /* 프로필 리스트 조회 파이프라인에 Project 스테이지 추가 */
    private addListProjectStage(pipelineBuilder: AggregratePipelineBuilder) {
        pipelineBuilder.project(
            this.rename('id', this.operator('toString', '$_id')), // _id -> id로 변경
            this.exclude('_id'), // _id 필드 제외
            this.select('userId'),
            this.select('name'),
            this.select('age'),
            this.select('sex'),
            this.select('career'),
            this.select('pay'),
            this.select('notice'),
            this.select('possibleDate'),
            this.select('possibleAreaList'),
            this.select('tagList')
        );
        return pipelineBuilder;
    }

    /* 강점을 작성하지 않은 프로필들은 제외 */
    private notEmptyStrengthList(strengthExcept: boolean): MongoQuery<[]> | null {
        if (!strengthExcept) return null;

        return this.notEmptyArray('strengthList');
    }
}