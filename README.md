# 간병인 중개 플랫폼 '믿음케어' 
> 개발 인원: 1명 개발 기간: 2022.08 ~ 2022.11

## Introduce
대학교 졸업작품을 진행할 당시 개발하였던 간병인 중개 플랫폼입니다.

## To Solve
기존에 간병인을 구해야 할 상황에서 외부의 도움으로 간병인을 구할 수 있는 방법은 병원에서 자체적으로 제공하는 통합 간병 서비스와 간병인 업체 및 앱을 통해 가능했습니다. 

하지만 간병인이 랜덤이라는 점과 선택할 수 있다 하여도 간병인의 정보를 보고 선택하기에는 해당 정보가 부족해 보였습니다.

그래서 저는 실제 간병인을 선택하는데 도움이 될만한 정보들을 제공하고, 원하는 간병인은 보호자가 직접 비교, 신청할 수 있게 하여 보호자의 선택지를 넓히고자 만들게 되었습니다.

## Environment & Stack
```sh
# 공통 #
# Node Version 18.12.1 #
# Npm Version 8.19.2 #
```
### FrontEnd
Expo환경에서 진행하다 Eject하여 안드로이드 플랫폼만 진행하였습니다.
<p>
<img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Android Studio-3DDC84?style=flat-square&logo=Android Studio&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white"/></a>&nbsp 
</p>

```sh
# React-Native-Cli Verwinoi 2.0.1 #
# React-Native Version  0.68.2 #
# Gradle-Plugin 7.0.4 #
# Gradle Versinon 7.3.3 #
```
### BackEnd
<p>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/TypeORM-18A497?style=flat-square&logo=&logoColor=white"/></a>&nbsp 
</p>

## Implement

**프론트엔드**  
- Redux Toolkit을 활용하여 전역적으로 상태관리
- 초기 목록 조회 시 데이터양을 정해 초기 렌더링 부담 감소
- 무한스크롤을 통한 추가 데이터 조회
- 채팅 시 이전 시간과 같다면 시간 표시 제거(분 단위)
- 현재 나와 있는 앱들과 비슷도록 UI 노력

**백엔드**
- 계정 :point_right: [관련 화면과 간단한 요구사항이 들어있어요](https://github.com/JOOYUNHAK/caregiver-matching-project/blob/main/readme/USER_README.md)
    - 휴대폰 인증을 통한 로그인과 제한
    - 추후 휴대폰 변경을 위한 이메일 인증
    - JWT Token과 Refresh Token으로 인증 및 인가
- 검색 :point_right: [관련 화면과 간단한 요구사항이 들어있어요](https://github.com/JOOYUNHAK/caregiver-matching-project/blob/main/readme/SEARCH_README.md)
    - 검색한 키워드와 일치하는 프로필 제공
    - 최근 검색어 자동저장 켜기/끄기
    - 미리 설정한 비속어 차단
    - 검색 결과에 대해서 새로운 필터 적용( 기존 필터와는 별개 동작 )
- 프로필 :point_right: [관련 화면과 간단한 요구사항이 들어있어요](https://github.com/JOOYUNHAK/caregiver-matching-project/blob/main/readme/PROFILE.README.md)
    - 다양한 필터 제공( 나이, 지역, 일당 낮은 순, 찜 많은 순등)
    - 비공개 설정 기능
    - 찜 기능
- 인기키워드, 인기프로필 :point_right: [관련 화면과 간단한 요구사항이 들어있어요](https://github.com/JOOYUNHAK/caregiver-matching-project/blob/main/readme/FOR_PROTECTOR.md)
    - 많이 찾고 있는 키워드 제공 
    - 많이 조회한 간병인 프로필 제공
    - 각 데이터들 배치로 자동 갱신
- 채팅 :point_right: [관련 화면과 간단한 요구사항이 들어있어요](https://github.com/JOOYUNHAK/caregiver-matching-project/blob/main/readme/CHAT.README.md)
    - Socket.io를 통한 실시간 채팅
    - 최신 채팅의 방은 목록에서 항상 상단으로 이동
    - 방 목록에서 강 방 별로 확인하지 않은 매세지 수 표시
    - 채팅을 통한 간병 신청
    - 간병 신청 응답 상태에 따른 채팅 방 상태 표시    



