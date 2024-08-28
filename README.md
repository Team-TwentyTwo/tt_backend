# 조각집
기억 저장 및 공유 서비스<br/> <br/>
<img src="https://github.com/user-attachments/assets/51e79810-5dc0-49d3-be78-a3c2f01d3b6e" height="400">
<img src="https://github.com/user-attachments/assets/76a0611b-9496-4a32-9fb8-e80de4fb43ca" height="400">

## 🔧 주요 기능
- **그룹** : 그룹 생성, 그룹 수정, 그룹 삭제, 그룹 목록 조회, 그룹 상세 정보 조회, 그룹 공감하기
- **추억** : 추억 등록, 추억 수정, 추억 삭제, 추억 목록 조회, 추억 상세 정보 조회, 추억 공감하기
- **댓글** : 댓글 등록, 댓글 수정, 댓글 삭제, 댓글 목록 조회
- **배지** : 7일 연속 추억 등록, 추억 수 20개 이상 등록, 그룹 생성 후 1년 달성, 그룹 공간 1만 개 이상 받기, 추억 공감 1만 개 이상 받기

## 📆개발 기간
2024.08.09 ~ 2024.09.06
## 💻기술 스택
<p>
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
    <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/render-000000?style=for-the-badge&logo=render&logoColor=white">
    <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<br/>
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</p>

## 📁폴더 구조

```plaintext
📦 src
├─📂controllers                 # 각 리소스에 대한 비즈니스 로직을 처리하는 컨트롤러들
│  ├─ groupController.js
│  ├─ postController.js
│  ├─ commentController.js
│  └─ imageController.js
├─📂middlewares                 # 요청과 응답 사이에서 공통적으로 처리해야 할 작업을 수행하는 미들웨어
│  ├─ asyncHandler.js            
│  ├─ errorHandler.js            
│  └─ uploadMiddleware.js        
├─📂routers                     # 각 리소스에 대한 라우팅 설정이 위치
│  ├─ groupRouter.js
│  ├─ postRouter.js
│  ├─ commentRouter.js
│  └─ imageRouter.js
├─📂utils                       # 프로젝트 전반에 걸쳐 반복적으로 사용되는 유틸리티 함수들
│  └─ dateUtils.js
├─ struct.js                    # 유효성 검사를 위한 struct 정의
└─ app.js                       # Express 서버 초기화 및 설정
```
## ✨참여자

<table align="center">
    <tr align="center">
        <td style="min-width: 200px;">
            <a href="https://github.com/sumhillj">
              <img src="https://github.com/sumhillj.png" width="130">
              <br />
              <b></b>
            </a>
        </td>
        <td style="min-width: 200px;">
            <a href="https://github.com/CHJIYEON">
              <img src="https://github.com/CHJIYEON.png" width="130">
              <br />
              <b></b>
            </a>
        </td>
        <td style="min-width: 200px;">
            <a href="https://github.com/yujeong430">
              <img src="https://github.com/yujeong430.png" width="130">
              <br />
              <b></b>
            </a>
        </td>
        <td style="min-width: 200px;">
            <a href="https://github.com/koreallama">
              <img src="https://github.com/koreallama.png" width="130">
              <br />
              <b></b>
            </a>
        </td>
    </tr>
       <tr align="center">
        <td>
            Frontend
        </td>
        <td>
            Frontend
        </td>
        <td>
            Backend
        </td>
        <td>
            Backend
        </td>
      </tr>
      <tr align="center">
        <td>
            정하윤
        </td>
        <td>
            최지연
        </td>
        <td>
            박유정
        </td>
        <td>
            최종윤
        </td>
    </tr>
</table>
