<div align='center'>

# 🌳 Tutice(튜티스) 🌳

<img width="450" height="400" src="https://github.com/Gwasuwon-shot/Tutice_Client/assets/100409061/d9ba9eb3-fbbc-4e11-9ebc-59ea2ec19f56"/>

🍀 <b> 쉬운 수업 관리로 열리는 정확한 나의 결실 🍀 <br/>
과외의 출결 체크부터 수업비 관리까지 한번의 클릭으로 쉽게 관리하는 서비스</b> <br />

<br/>

</div>

<div >

## 🙋🏻‍♀️ 과수원 FE

<div align='center'>
<b> 🌲 수업 관리 시장에 새로운 표준이 되는  팀 과수원 🌲 </b>
</div>
<br/>
<table align="center">
    <tr align="center">
        <td>
              <b>은빈</b>
              <br/>
            <a href="https://github.com/eunbeann">
              <img style="height: 150px;" src="https://github.com/Gwasuwon-shot/Tutice_Client/assets/100409061/fca3c55e-103b-4174-bb83-8da2df34080b" width="200">
            </a>
        </td>
        <td>
              <b>혠찌</b>
              <br/>
            <a href="https://github.com/hae2ni">
              <img style="height: 150px;" src="https://i.pinimg.com/236x/c7/fa/c8/c7fac8a40e58093ba9388f329ad6b08f.jpg" height='150' width="200">
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
            권은빈 <br/>
           Web FE 🍅
      </td>
        <td>
            권혜인 <br />
           Web FE 🍌
        </td>
    </tr>
</table>
<br/>

original Members [류성경🍒](https://github.com/pinktopaz), [박희정🥝](https://github.com/parkheeddong), [서지수🍑](https://github.com/seojisoosoo)
</aside>

## ⚒️ 기술 스택

<div align="center">

| 역할                 | 종류                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                             |
| Styling              | ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)                                                                           |
| State Management     | ![State Management](https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=Recoil)                                                                                                                   |
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)  |
| Data Fetching        | <img  alt="ReactQuery" src="https://img.shields.io/badge/reactquery-E34F26?style=for-the-badge&logo=reactquery&logoColor=white">                                                                                  |

</div>


## 💡 서비스 핵심 기능 소개

### 1️⃣ 수업 등록하기

![image](https://github.com/Gwasuwon-shot/Tutice_Client/assets/100409061/7187cce7-a6a3-40de-9422-51fe4bbb975f)

#### 💬 <b> what? </b> </br>

학생 과목 등록<br/>
회차, 날짜, 시간 <b>슬라이더</b> 구현</b> </br>
정기 요일 선택 <br/>(첫 수업일 경우 <b>디폴트 값은 현재 날짜</b>이며, 현재 선택한 요일에 해당하지 않는 날짜를 첫 수업일로 선택한 경우, 저장 불가 및 선택된 요일 배열을 순회하며 해당 요일이 아닌 날짜 버튼 비활성화) <br/>
수업 일시 <b>예외 케이스 처리 </b><br/>
-> 조건문을 통해 시간 및 종료 시간을 모두 입력하지 않았을 때 수업 일시 추가 버튼 비활성화 </br>
->시간만 입력하고 요일은 입력하지 않은 경우에는 수업 일시 추가 버튼 비활성화</b> </br>
->요일을 선택할 때, 시작, 종료 시간을 입력하지 않은 경우 다른 버튼 비활성화 <br>
->첫 수업일에 해당하는 요일이 선택한 수업 일시 요일에 해당하지 않는 경우 저장 버튼 비활성화 </br>
->첫 수업일에 해당하는 요일이 선택한 수업 일시 요일에 해당하는 경우 저장 버튼은 활성화

#### 👀 <b> how? </b>

`useState`를 사용해 각 입력폼에 `focus` 되었는 지 관리
입력받은 값 `recoil`로 관리
`swiper` 라이브러리를 사용한 슬라이더 구현

```
<StyledSwiper
               direction="vertical"
               slidesPerView={7}
               spaceBetween={15}
               freeMode={true}
               freeModeSticky={true}
               freeModeMomentumRatio={0.25}
               freeModeMinimumVelocity={0.1}
               loop={true}
               loopAdditionalSlides={5}
               slideToClickedSlide={true}
               centeredSlides={true}
               onSlideChange = {handleSlideChange}
           >
               {slides}
</StyledSwiper>
```

`loop = {true}` 속성값을 통한 <b>스크롤을 이어지도록</b> 구현 </br>
`swiper.realIndex`를 통해 유저가 선택한 인덱스의 <b>슬라이드 추적</b> <br/>
날짜 슬라이더의 경우, 현재 달을 기준으로 이전, 현재, 다음 달의 모든 날짜를 담는 객체 배열을 생성하여 <b>각 개체가 하나의 슬라이드가 되도록</b> 구현

### 2️⃣ 수업 관리

<img width="588" alt="스크린샷 2023-07-20 오후 11 14 28" src="https://github.com/Gwasuwon-shot/Tutice_Client/assets/100409061/75d3523c-0c2e-4847-8a4b-e4d711abd7f3">

<br/>

#### 💬 <b> what? </b> <br/>

수업 관리 ( 출결 및 입금 관리) </br>
출결 체크 후 <b>알림</b> 보내기 </br>
<b>입금 알림</b> 보내고 입금 등록 </br>
연장하지 않은 수업이 있는 경우 <b>배너 띄우기</b> <br/>

#### 👀 <b> how? </b> <br/>

`children, props` 를 이용한 공통 컴포넌트 구현 <br/>
수업 내역 또는 입금 내역인지에 대한 현재 페이지 정보 `recoil`로 불러오기

<br/>

### 3️⃣ 수업 관리 => 출결 체크

<br/>
<img width="699" alt="Untitled" src="https://github.com/Gwasuwon-shot/Tutice_Client/assets/100409061/f5a9c242-c700-495e-9409-917f06b89b4b">

</br>

#### 💬 <b> what? </b> </br>

홈 페이지에서 수업 진행 중인 학생 출석 체크 <br/>
수업 관리 페이지에서 <b>출결 체크 및 수정</b> </br>
놓친 출결 페이지에서 출결 체크 <br/>
출결 수정 시 이전 출걀 사항 버튼 비활성화<br/>
출결 체크 <b>토스트 모달, 출결 체크 선택시 확인 모달</b> 띄우기 </br>
최종 출결 체크 확인 시 <b>체크되는 애니메이션 구현</b> </br>
최종 출결 체크 이후 출결 <b>알림 전송 토스트 모달</b> <br>
푸쉬 알림을 상대가 허용하지 않았을 시,<br> 경고 모달 <br>
출결 <b>알림</b>

#### 👀 <b> how? </b>

-> 모든 경우의 수를 따져서 (출석, 결석, 취소, 출석체크 놓친 이후의 출석, 결석, 취소 선택 등) `switch-case` 문과 `삼항 연산자` 사용

### 4️⃣ 캘린더

![Untitled (2)](https://github.com/Gwasuwon-shot/Tutice_Client/assets/100409061/b15a8c63-3746-445d-b4d9-9eee79ea74e8)

#### 💬 <b> what? </b> </br>

캘린더뷰 <b>`date-fns`</b> 으로 구현 <br/>
오늘 날짜부분 메일 컬러의 배경으로 <b>다른 날짜와 다르게 </b>구성 </br>
`get`해온 데이터에 맞는 날짜에 시간 순서대로 사람 이름 및 시작 시간 불러와 <b>캘린더에 띄워주기</b> <br/>
스케줄 수정 캘린더, 수정이 불가능하고 조회만 가능한 캘린더, 임시로 저장한 수업 시간과 함께 가지고 있는 스케줄을 한 번에 보여주는 캘린더로 나누기 <br/>
각 캘린더에서 원하는 날짜를 클릭할 시, <b>해당 날짜에 있는 스케줄을 모두 보여주는 모달 구현</b> </br>
각 날짜에 4개 이상의 스케줄이 있을 경우, 2개까지만 보여주고 더보기와 관련된 아이콘 띄워주기 </br>
수정이 가능한 캘린더에서 원하는 날짜를 클릭하면 토스트 모달에서 편집버튼을 누를 시에 편집 모드로 전환 </br>
편집 모드 모달에서 편집하기 원하는 스케줄을 클릭하여 편집 페이지로 이동 </br>
편집 페이지에서 슬라이더를 이용해 원하는 <b>스케줄로 수정하고, 저장을 누르면 바로 캘린더로 확인하도록 구현</b>

#### 👀 <b> how? </b>

`date-fns`를 사용한 전체적 레이아웃 구현 </br>
`while`문을 이용해 한 달의 날짜를 보여주도록 구현 </br>
`공통 컴포넌트`를 이용하여, 토스트 모달, 수정 뷰 슬라이더 등 구현 </br>
`react-query`의 get`-`patch`를 사용한 data 관리 </br>

</br>

### 5️⃣ PWA를 활용한 푸쉬 알림

![LockScreen_학부모_8회차 끝](https://github.com/Gwasuwon-shot/Tutice_Client/assets/100409061/bffcd734-aea1-483d-a919-b0f364999df0)

#### 💬 <b> what? </b> </br>

<b>PWA 환경에서 일반 네이티브 앱과 동일하게 푸시 알림을 받을 수 있도록 설정</b></br>
선생님 사용자가 출결 체크 또는 입금 알림을 보낼 경우, <b>학부모 사용자에게 푸쉬 알림이 가도록 구현</b> 

#### 👀 <b> how? </b>
파이어베이스 프로젝트 생성 후 받은 후 <b> sdk를 이용해 FCM을 연결하여</b> 푸시 알림 구현 </br> 
FCM으로부터 유저의 `deviceToken`을 받고, 이를 <b>서버에게 post하여 기기 등록</b></br>
등록된 기기로 알림이 갈 수 있도록 구현</br>. 
PWA 환경에서 일반 네이티브 앱과 동일하게 푸시 알림을 받을 수 있습니다.



## 📁 폴더 구조

```
|-- 📁 .github
|-- 📁 .husky
|-- 📁 node_modules
|-- 📁 public
|-- 📁 src
	|-- 📁 api
	|-- 📁 atom
	|-- 📁 assets
			|-- 📁 icon
			|-- 📁 image
			|-- 📁 assets.d.ts
			|-- 📁 index.ts
	|-- 📁 core
	|-- 📁 components
			|-- 📁 common
	|-- 📁 hooks
	|-- 📁 mocks
	|-- 📁 pages
	|-- 📁 style
			|-- globalStyle.ts
			|-- style.d.ts
			|-- theme.ts
	|-- 📁 utils
	|-- 📁 type
	|-- App.tsx
	|-- main.tsx
	|-- Router.tsx
	|-- vite-env.d.ts
|-- .eslintrc.cjs
|-- .gitignore
|-- .prettierrc
|-- index.html
|-- package.json
|-- README.md
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
|-- yarn.lock
```
