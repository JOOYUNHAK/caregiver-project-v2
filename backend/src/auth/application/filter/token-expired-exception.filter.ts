import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from "@nestjs/common";
import { SessionService } from "../service/session.service";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { TokenService } from "../service/token.service";

@Catch(UnauthorizedException)
export class TokenExpiredExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService
  ) { }

  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const [request, response] = [
      host.switchToHttp().getRequest(),
      host.switchToHttp().getResponse()
    ];

    /* 만료된 토큰으로 인한 오류면 세션리스트에서 사용자 삭제 */
    if (exception.message === ErrorMessage.ExpiredToken)
      await this.deleteTokenFromSessionList(request);

    response.status(exception.getStatus())
            .send({ statusCode: exception.getStatus(), message: exception.message });
  }

  /* 세션리스트에서 해당 토큰 삭제 */
  private async deleteTokenFromSessionList(request: any) {
    const accessToken = this.tokenService.extractTokenFromHeader(request); // request로부터 토큰 추출
    const { userId } = this.tokenService.decode(accessToken); // 토큰의 payload에서 userId 추출
    await this.sessionService.deleteUserFromList(userId); // 해당 사용자 세션리스트에서 삭제
  };
}