import { ArgumentsHost, BadRequestException, HttpStatus } from "@nestjs/common";
import { AllExceptionsFilter } from "src/common/exception/all-exception.filter"
import { ResourceConflictException } from "src/common/exception/resource-conflict.exception";

describe('AllExceptionFilter(오류 Catch) Test', () => {
    let exceptionFilter: AllExceptionsFilter, mockHost: any;

    beforeAll(() => {
        exceptionFilter = new AllExceptionsFilter();

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            send: jest.fn()
        };

        mockHost = {
            switchToHttp: () => ({
                getResponse: () => mockResponse
            })
        } as ArgumentsHost;
    });

    afterEach(() => jest.clearAllMocks());

    describe('Custom Data가 있는 경우', () => {
        describe('ResourceConflictException()', () => {
            it('충돌한 ResourceId가 반환되는지 확인', () => {
                const resourceId = 1;
                const resoucreConflictException = new ResourceConflictException(resourceId);

                exceptionFilter.catch(resoucreConflictException, mockHost);

                const responseAfterCatchException = mockHost.switchToHttp().getResponse();

                expect(responseAfterCatchException.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
                expect(responseAfterCatchException.send).toHaveBeenCalledWith({
                    statusCode: HttpStatus.CONFLICT,
                    data: resourceId,
                    message: 'Conflict'
                });
            });
        });
    });

    describe('Custom Data가 없는 경우', () => {
        it('response 객체에 data 필드가 없는지 확인', () => {
            const exception = new BadRequestException();

            exceptionFilter.catch(exception, mockHost);

            const responseAfterCatchException = mockHost.switchToHttp().getResponse();

            expect(responseAfterCatchException.send).toHaveBeenCalledWith({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Bad Request'
            });
        })
    })
})