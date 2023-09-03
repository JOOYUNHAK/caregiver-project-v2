import { OrderBy } from "src/common/shared/enum/sort-order.enum";
import { ProfileSortField } from "./enum/sort.enum";
import { IsEnum, IsNotEmpty } from "class-validator";

/* 프로필 정렬 객체 공통 필드, 메서드 */
export class ProfileSort {
    @IsNotEmpty()
    @IsEnum(ProfileSortField)
    private field: ProfileSortField;

    @IsNotEmpty()
    @IsEnum(OrderBy)
    private orderBy: OrderBy;

    constructor(field: ProfileSortField, orderBy: OrderBy) {
        this.field = field;
        this.orderBy = orderBy;
    };

    /* DB 필드에 해당하는 이름 */ 
    public getField(): ProfileSortField { return this.field; };
    /* 정렬 기준 */
    public getOrderBy(): OrderBy { return this.orderBy; };
};

/* 프로필 아이디로 정렬  */
export class ProfileIdSort extends ProfileSort {
    constructor(orderBy: OrderBy) { super( ProfileSortField.ID, orderBy) }
};

/* 프로필 일당으로 정렬 */
export class ProfilePaySort extends ProfileSort {
    constructor(orderBy: OrderBy) { super(ProfileSortField.PAY, orderBy) }
};

/* 프로필의 시작 가능일로 정렬 */
export class ProfileStartDateSort extends ProfileSort {
    constructor(orderBy: OrderBy) { super(ProfileSortField.STARTDATE, orderBy) };
};