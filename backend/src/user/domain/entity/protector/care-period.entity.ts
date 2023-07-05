import { Time } from "src/common/shared/type/time.type";

export class CarePeriod {
    private startDate: Time;
    private endDate: Time;
    private totalDay: number;

    constructor(startDate: Time, endDate: Time, totalDay: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalDay = totalDay;
    };

    getStartDate(): Time { return this.startDate; };
    getEndDate(): Time { return this.endDate; };
    getTotalDay(): number { return this.totalDay; };
}
