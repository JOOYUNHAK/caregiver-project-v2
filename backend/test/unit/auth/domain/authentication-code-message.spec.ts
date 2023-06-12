import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message"

describe('인증문자 객체(AuthenticationCodeMessage) Test', () => {
    it('생성된 인증번호는 6자리 숫자여야 한다.', () => {
        const authCodeMessage = new AuthenticationCodeMessage('01011111111');
        const code = authCodeMessage.getAuthenticationCode();

        expect(code).toBeLessThan(1000000);
        expect(code).toBeGreaterThan(99999);
    });

    it('생성된 인증번호가 매시지의 내용에 포함되어야 한다.', () => {
        const authCodeMessage = new AuthenticationCodeMessage('01011111111');
        const code = authCodeMessage.getAuthenticationCode();
        
        expect(authCodeMessage.getContent()).toBe(`[믿음으로]\n인증번호 [${code}]를 입력해주세요.`)
    });
})