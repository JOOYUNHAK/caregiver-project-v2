# 간병인 중개 플랫폼 '믿음케어' 리팩토링
```javascript
기간: 2023.06.18 ~
```
## Environment & Stack
```sh
# 공통 #
# Node Version 18.12.1 #
# Npm Version 8.19.2 #
```
### FrontEnd
새로운 프로젝트를 생성하여 Expo관련 라이브러리를 지우고 npx를 활용하여 진행하고 있습니다.

<p>
<img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Android Studio-3DDC84?style=flat-square&logo=Android Studio&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white"/></a>&nbsp 
</p>

```sh
# React-Native Version  0.69.2 #
# Gradle Version 7.1.1 #
# openjdk Version 11.0.19 #
```
### BackEnd
**객체지향프그래밍**과 **계층형 아키텍처**, **테스트 코드**를 중심으로 코드의 구조, 분리를 기준으로 리팩토링을 진행하고 있습니다.  

리팩토링의 요약 과정은 [이곳에서](https://velog.io/@wndbsgkr/series/%EA%B0%84%EB%B3%91%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8) 글로 작성중입니다.

<p>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white"/></a>&nbsp 
<img src="https://img.shields.io/badge/TypeORM-18A497?style=flat-square&logo=&logoColor=white"/></a>&nbsp 
</p>

```sh
# nestjs/common  9.0.0 #
# typeorm 0.3.7 #
# mongodb 5.0.0 #
# redis 4.3.1 #
```
## Api Specification
해당 프로젝트의 Api 명세서는 [이곳에서](https://video-dot-project.gitbook.io/undefined/)확인하실 수 있습니다.

## Table Structure
<img width="1299" alt="image" src="https://github.com/JOOYUNHAK/caregiver-project-v2/assets/99117410/11616a9a-027f-4073-bebd-29056571a6cd">

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



