import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from "@nestjs/common";
import { SessionService } from "../service/session.service";
import { JwtService } from "@nestjs/jwt";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

@Catch(UnauthorizedException)
export class TokenExpiredExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService
  ) { }

  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();

    /* 만료된 토큰으로 인한 오류면 세션리스트에서 사용자 삭제 */
    if (exception.message === ErrorMessage.ExpiredToken)
      await this.deleteTokenFromSessionList(request);
    return;
  }

  /* 세션리스트에서 해당 토큰 삭제 */
  private async deleteTokenFromSessionList(request: any) {
    const accessToken = this.extractTokenFromHeader(request);
    const { userId } = this.decodeToken(accessToken);
    await this.sessionService.deleteUserFromList(userId);
  };

  /* 헤더에서 토큰 추출 */
  private extractTokenFromHeader(request: any): string {
    const { authorization } = request.headers;
    return authorization.split(" ")[1];
  };

  /* 토큰을 검증하지 않고 단순 decode */
  private decodeToken(accessToken: string): any {
    return this.jwtService.decode(accessToken, {
      complete: false,
      json: true
    })
  };
}