![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&text=어디에🗑️&height=350&fontSize=100&animation=twinkling)

## 🗑️ BinFinder 프로젝트 개요

쓰레기통 위치를 알려주는 웹 애플리케이션은 사용자들에게 가장 가까운 쓰레기통의 위치를 제공하여 환경 보호와 쓰레기 처리를 돕는 서비스입니다. 


## 🐣 Intro

- 안녕하세요. 팀 에배레스트 입니다.
- 배포링크 : https://binfinder43.link/


## 주요 기능

- 사용자 위치 기반 쓰레기통 탐색: 사용자가 현재 위치를 가져와 주변에 있는 쓰레기통의 위치를 지도상에 표시합니다.
- 쓰레기통 상세 정보 제공: 사용자가 선택한 쓰레기통에 대한 상세 정보를 제공합니다. 이 정보에는 분리수거 유형(일반쓰레기,재활용쓰레기,담배꽁초) 등이 포함될 수 있습니다.
- 쓰레기통 등록 기능: 쓰레기통을 새로 등록하려는 사용자는 애플리케이션을 통해 해당 쓰레기통의 위치와 기타 정보를 등록할 수 있습니다.
- 쓰레기통 상태 업데이트 기능: 쓰레기통의 상태가 변경되면, 관리자나 등록한 사용자는 애플리케이션을 통해 쓰레기통의 상태를 업데이트할 수 있습니다.
- 일반 커뮤니티 게시판 기능: 사용자들은 자유롭게 글을 작성하고 읽을 수 있는 커뮤니티 게시판을 이용할 수 있습니다.
- 플로깅 게시판 기능: 사용자들은 쓰레기통 위치를 기반으로 플로깅할 멤버를 모집하는 게시판을 이용할 수 있습니다.
- OAUTH 기반(카카오톡,구글) 로그인을 지원합니다. 

## 🛠 Skils

- 프론트엔드: HTML, CSS, JavaScript, React.js
- 백엔드: Spring Boot, Gradle, Java 11, Rest
- 데이터베이스: MySQL
- AWS : EC2, Route 53, Certificate Manager, RDS

### 🔨 Front-end
| Html | JavaScript | React |
| :---: | :---: | :---: |
| <img alt="Html" src ="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/440px-HTML5_logo_and_wordmark.svg.png" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /></div> |

### ⛏ Back-end
| Java | mySQL | Rest | AWS | Spring | Spring<br>Boot |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/java-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="spring logo" src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" height="50" width="50" > | <img alt="spring-boot logo" src="https://t1.daumcdn.net/cfile/tistory/27034D4F58E660F616" width="65" height="65" > |
<br/>

## 프로젝트 구성
- `client` 폴더: 프론트엔드 소스 코드가 들어있는 폴더입니다.
- `backend` 폴더: 백엔드 서버 소스 코드가 들어있는 폴더입니다.
- `applicaion.yml` 파일: 데이터베이스 관련 파일 수정이 가능한 파일입니다.
- `public` 폴더: 정적 파일(이미지, CSS 파일 등)이 들어있는 폴더입니다.

## 설치 및 실행 방법

1. 이 저장소를 클론합니다
2. `cd redeam` 명령어를 사용하여 프로젝트 폴더로 이동합니다.
3. 필요한 의존성을 설치합니다: `npm install`.
4. 프론트엔드 및 백엔드를 각각 빌드합니다:
   - 프론트엔드 빌드: `npm run build` 명령어를 사용하여 `cleint` 폴더 내의 소스 코드를 번들링합니다.
   - 백엔드 빌드: Spring Boot 프로젝트를 빌드합니다.
5. 데이터베이스 설정을 위해 `database` 파일을 수정합니다.
6. 애플리케이션을 실행합니다: Spring Boot 애플리케이션을 실행하고, 웹 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인합니다.





## Git Hub 커밋 메시지

- `Feat` : 새로운 기능 추가
- `Fix` : 버그 수정
- `Docs` : 문서 수정 (README.md 등)
- `Comment` : 필요한 주석 추가 및 변경
- `Style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `Refactor` : 코드 리팩토링
- `Test` : 테스트 코드, 리팩토링 테스트 코드 추가
- `Chore` : 빌드 업무 수정, 패키지 매니저 수정 등 모듈의 변경 (프로덕션 코드 변경 X)
- `Rename` : 파일 혹은 폴더명을 수정하거나 경로 이동
- `Remove` : 파일 삭제
- `Merge`: 브랜치 merge


## 기여하기

이 프로젝트에 기여하고 싶다면, 다음과 같은 단계를 따르세요:
1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다: `git checkout -b feature/your-feature`.
3. 변경 사항을 커밋합니다: `git commit -m 'Add some feature'`.
4. 변경 사항을 포크한 저장소에 푸시합니다: `git push origin feature/your-feature`.
5. 풀 리퀘스트를 생성하여 변경 사항을 제안합니다.


## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.


## 👩‍💻 Team

### Front
| 최승원<br>(FE팀장) | 유슬기<br> | 전형호<br> | 원영은<br> |
| :---: | :---: | :---: | :---: |
| <img alt="최승원" src="https://avatars.githubusercontent.com/u/112051914?v=4" height="100" width="100"> | <img alt="유슬기" src="https://avatars.githubusercontent.com/u/119473025?v=4" height="100" width="100"> | <img alt="전형호" src="https://avatars.githubusercontent.com/u/120395025?v=4" height="100" width="100"> | <img alt="원영은" src="https://avatars.githubusercontent.com/u/119933024?v=4" height="100" width="100"> |
| [@RomaneeChoiti](https://github.com/RomaneeChoiti) |   [@Seulgi-Yoo](https://github.com/Seulgi-Yoo) | [@JHH0906](https://github.com/JHH0906) | [@lulu242](https://github.com/lulu242) | 
|<p align="left">- Front </p> | <p align="left">- Front </p>| <p align="left">- Front </p> | <p align="left">- Front </p> |

### Back
| 손정훈<br>(BE팀장) | 백서연<br> | 김나연<br> | 이난영<br> |
| :---: | :---: | :---: | :---: |
| <img alt="손정훈" src="https://avatars.githubusercontent.com/u/84003339?v=4" height="100" width="100"> |<img alt="백서연" src="https://avatars.githubusercontent.com/u/97516208?v=4" height="100" width="100"> | <img alt="김나연" src="https://avatars.githubusercontent.com/u/120254001?v=4" height="100" width="100"> | <img alt="이난영" src="https://avatars.githubusercontent.com/u/105438919?s=400&u=4b7fa72a06d36daad6da24e94a6545ab9983e633&v=4" height="100" width="100"> |
| [@sjh4172](https://github.com/sjh4172) |[@yeri134](https://github.com/yeri134) | [@0324skdus](https://github.com/0324skdus) | [@NYinJP](https://github.com/NYinJP) |
| <p align="left">- Back </p>| <p align="left">- Back </p>| <p align="left">- Back </p>| <p align="left">- Back </p>|

![footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&animation=twinkling&section=footer)

