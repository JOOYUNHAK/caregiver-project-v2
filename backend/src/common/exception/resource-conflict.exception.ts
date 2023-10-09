import { HttpException, HttpStatus } from "@nestjs/common";

/* 409에러와 함께 데이터를 넘겨주어야 하는 경우  */
export class ResourceConflictException extends HttpException {
    constructor(resourceId: any) {
        super(
            {
                status: HttpStatus.CONFLICT,
                message: 'Conflict',
                data: resourceId
            },
            HttpStatus.CONFLICT
        );
    };
}