package team.luckyturkey.memberservice.auth.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import team.luckyturkey.memberservice.auth.jwt.RefreshToken;
import team.luckyturkey.memberservice.service.RefreshTokenService;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {

    private final RefreshTokenService refreshTokenService;
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        //헤더에서 토큰 가져오기
        String atc= request.getHeader("Authorization");
        //헤더에 토큰이 있다면
        if(atc != null){
            // access token을 이용해서 redis에서 토큰 검색
            RefreshToken foundTokenInfo = refreshTokenService.findToken(atc);
            // redis에 검색된 토큰이 없다면
            if(foundTokenInfo == null) {
                try {
                    response.sendRedirect("/");
                    return;
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            //토큰이 있으면 검색된 토큰 삭제
            refreshTokenService.deleteRefreshToken(foundTokenInfo.getId());
        }
        //토큰이 없으면...? 메인페이지로 리다이렉트
        try {
            response.sendRedirect("https://repertory.online");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
//        return 리다이렉트 -> 메인페이지;
    }
}
