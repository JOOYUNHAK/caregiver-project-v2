import 'reflect-metadata';
import { validate } from "class-validator";
import { plainToInstance } from 'class-transformer';
import { PossibleDate } from 'src/profile/domain/enum/possible-date.enum';
import { GetProfileListDto } from 'src/profile/interface/dto/get-profile-list.dto';
import { ProfileFilter } from 'src/profile/domain/profile-filter';
import { ProfileSortField } from 'src/profile/domain/enum/sort.enum';
import { OrderBy } from 'src/common/shared/enum/sort-order.enum';

describe('GetProfileListDto Test', () => {
    describe('ProfileSort Test', () => {
        it('잘못된 Enum 체크', async () => {
            const wrongSort = { field: ProfileSortField.PAY, orderBy: 'reverse' }
            const sortTestDto = GetProfileListDto.of(undefined, JSON.stringify(wrongSort) as any);
            const instanceDto = plainToInstance(GetProfileListDto, sortTestDto);
            
            const [result] = await validate(instanceDto);
            expect(result.property).toBe('sort');
        });
    })

    describe('ProfileFilter Test', () => {
        it.each([
            ['Age Filter는 숫자, 문자열 숫자가 아니면 오류', 'Higher Than 20', 'age'],
            ['Pay Filter는 숫자, 문자열 숫자가 아니면 오류', 'Lower Than 10', 'pay'],
            ['StartDate Filter에 잘못된 Enum 체크', '1week', 'startDate'],
            ['Sex Filter에 잘못된 Enum 체크', 'Women', 'sex'],
            ['Area Filter에 문자열 배열이 아니면 오류', [1, 2,3], 'area'],
            ['License Filter에 문자열 배열이 아니면 오류', "자격증 이름", 'license'],
            ['StrengthExcept Filter는 boolean 아니면 오류', 'false', 'strengthExcept'],
            ['WarningExcept Filter는 boolean 아니면 오류', 1, 'warningExcept']
        ])('%s', async (testName, wrongValue, testFiled) => {
            const wrongFilter = { [`${testFiled}`]: wrongValue } as unknown as ProfileFilter;
            const filterToInstance = plainToInstance(ProfileFilter, wrongFilter);

            const [result] = await validate(filterToInstance);
            
            expect(result.property).toBe(testFiled)
        })
    })

    it('올바르게 입력된 Dto면 패스되는지 확인', async() => {
        const sortOption = { field: ProfileSortField.PAY, orderBy: OrderBy.ASC };
        const filter = {
            pay: 10,
            age: 20,
            startDate: PossibleDate.IMMEDATELY,
            area: ['인천'],
            license: ['자격증1']
        };
        const testDto = GetProfileListDto.of(JSON.stringify(filter) as any, JSON.stringify(sortOption) as any);
        const toInstanceDto = plainToInstance(GetProfileListDto, testDto);

        const result = await validate(toInstanceDto);
        expect(result.length).toBe(0);
    })
})