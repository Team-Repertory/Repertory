package team.luckyturkey.memberservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import team.luckyturkey.memberservice.Status.MemberAuthorityStatus;
import team.luckyturkey.memberservice.dto.CustomOAuth2Member;
import team.luckyturkey.memberservice.dto.GoogleResponse;
import team.luckyturkey.memberservice.dto.NaverResponse;
import team.luckyturkey.memberservice.dto.OAuth2Response;
import team.luckyturkey.memberservice.entity.Member;
import team.luckyturkey.memberservice.repository.MemberRepository;

@Slf4j
@Service
public class CustomOAuth2MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public CustomOAuth2MemberService (MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{

        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("OAuth2User = {}", oAuth2User.getAttributes());

        //provider를 구분해야함
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        OAuth2Response oAuth2Response = null;


        if(registrationId.equals("naver")){

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());

        }else if(registrationId.equals(("google"))){

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());

        }else{
            return null;
        }

        //id만들어서 이미 회원가입한 회원인지 체크
        //todo : 적절한 아이디 가져오는 로직으로 수정
        String memberLoginId = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();

        Member existData = memberRepository.findByMemberLoginId(memberLoginId);


        String memberRole = null;
        if(existData == null){

            Member member = new Member();

            member.setMemberLoginId(memberLoginId);
            member.setMemberEmail(oAuth2Response.getEmail());
            member.setMemberRole(MemberAuthorityStatus.ROLE_SOCIAL_LOGIN_MEMBER.getAuthority());

            memberRepository.save(member);
            memberRole = MemberAuthorityStatus.ROLE_SOCIAL_LOGIN_MEMBER.getAuthority();
        }else{
            memberRole = existData.getMemberRole();
            //새로 받은 데이터로 업데이트
            existData.setMemberEmail(oAuth2Response.getEmail());


        }

        return new CustomOAuth2Member(oAuth2Response, memberRole);

    }
}
