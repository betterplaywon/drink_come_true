

# DrinkComeTrue

### 술 약속을 잡거나 좋아하는 주종을 알 수 있도록 제작한 개인 프로젝트

<br/>

- 프로젝트 참여 인원:

`Front-End, Back-End 강지원 1인`

<br/>

- 사용 기술 스택:

`React(17v), Next.js(12v), styled-component, Axios, node.js, GitHub`

<br/>

- 프로젝트 진행 기간:

`22.12.15 - 23.02.15 (50일)`

<br/>

- env 처리로 인해 서버 연결이 안된다면:

`http://localhost:3065` 로 연결.

<br/>

- 시연 영상:

`https://www.youtube.com/watch?v=PHhNNh2B--Y`

<br/>

## 💻 설치 방법

    yarn install
    yarn dev

<br/>

## 커밋 컨벤션

💄 : UI/스타일 파일 추가/수정

✨ : 새 기능

🐞 : 버그 수정

🔥 : 코드/파일 삭제

🎨 : 코드의 구조/형태 개선🐞

⚡️ : 성능 개선

♻️ : 코드 리팩토링

<br/>

## 📂 파일 구조
```bash
📦actionType
 ┗ 📜index.js
📦components
 ┣ 📂ImagesSlider
 ┃ ┗ 📜index.js
 ┣ 📜AppLayout.js
 ┣ 📜CommentForm.js
 ┣ 📜DrinkChart.js
 ┣ 📜FollowButton.js
 ┣ 📜GoogleLogInButton.js
 ┣ 📜GoogleLogOutButton.js
 ┣ 📜HomeComp.js
 ┣ 📜LoadingComp.js
 ┣ 📜MiniProfile.js
 ┣ 📜NicknameForm.js
 ┣ 📜PostCard.js
 ┣ 📜PostCardContent.js
 ┣ 📜PostForm.js
 ┗ 📜PostImages.js
 📦drinkTestData
 ┗ 📜index.js
📦hooks
 ┣ 📜useInput.js
 ┣ 📜usePlus.js
 ┗ 📜useToggle.js
📦pages
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜[...nextauth].js
 ┃ ┗ 📜hello.js
 ┣ 📂drinkTestResult
 ┃ ┗ 📜[drinkTestResult].js
 ┣ 📂hashtag
 ┃ ┗ 📜[tag].js
 ┣ 📂post
 ┃ ┗ 📜[id].js
 ┣ 📂user
 ┃ ┗ 📜[id].js
 ┣ 📜_app.js
 ┣ 📜_document.js
 ┣ 📜community.js
 ┣ 📜cycle.js
 ┣ 📜drinkTestQna.js
 ┣ 📜drinktest.js
 ┣ 📜index.js
 ┗ 📜usersign.js
📦reducers
 ┣ 📜index.js
 ┣ 📜post.js
 ┗ 📜user.js
📦sagas
 ┣ 📜index.js
 ┣ 📜post.js
 ┗ 📜user.js
📦store
 ┗ 📜configureStore.js
📦styles
 ┣ 📜drinkTestMain.module.css
 ┣ 📜drinkTestQna.module.css
 ┣ 📜drinkTestResult.module.css
 ┣ 📜globals.css
 ┣ 📜homeCompAnimation.module.css
 ┗ 📜userSign.module.css
📦.eslintrc
📦.gitignore      
📦.prettierrc             
📦next.config.js      
📦package.json     
📦README.md  
 ```

## 기능

### 1. Community page

- 유저가 술을 마시는 약속을 잡거나 술을 마신 후기를 작성할 수 있도록 만든 페이지.

<br/>

- FormData를 사용해 작성한 content와 image를 업로드할 수 있게 구현.

    - content를 처리하기 위한 custom hook을 만들어 content state를
        
        FormData에 실어 보내도록 구현.
        
        <br/>
        
    - image에 따라 보여지는 view를 다르게 구현.
    
        - image가 3개 이상일 땐 swiper 라이브러리를 사용해 보여지도록 구현.

- user의 id와 게시글을 작성한 user의 id가 일치한다면
    
    게시글 삭제가 가능한 버튼이 활성화도록 구현.
    
    <br/>

- 추가적인 게시물이 존재한다면 볼 수 있도록 infinity scroll 구현.

    - scrollHeight가 scrollY값과 clientHeight를 더한 값이 될 때
        
         infinity scroll  코드가 실행되도록 구현했으며 분기처리를 통해 더 이상 불러올 게시글이 없다면 작동하지 않도록 구현.
         
         <br/>
        
    - useEffect에서 생성한 infinite scroll 함수가 중복 생성되지 않도록 제거해
        
        memory leak을 방지하기 위해 cleanup 적용.

<br/>

- 게시글에 댓글을 달 수 있도록 기능 구현
    - user의 id와 게시글의 id에 따른 분기처리를 통해
        
        게시글을 작성한 user의 게시글에는 댓글을 달지 못하도록 기능
        
        <br/>
        
### 2. userSign page

- signup 기능과 signin 기능 통합 페이지

    - css animation을 통해 한 페이지에서 signup을 마치고
        
        버튼 클릭으로 signin으로 이동할 수 있도록 만듦.
        
        <br/>
        
        
    - user가 signup에서 작성한 input값을 signin에서 유지함으로서
        
        email과 password를 작성하지 않고 signin 할 수 있도록 처리
        
        <br/>
        
    - signup과정에서 password 유효성 검사를 통해
        
        동일한 비밀번호를 입력할 수 있도록 처리
        
        <br/>
        
    - signin이 정상동작을 하게된다면 홈화면으로 라우팅 되어질 수 있도록 분기처리
    
    <br/>
    
    ### 3. cycle page

- 유저가 업로드한 게시글의 내용 중 술 키워드를 대상으로 자주 마신 술을 시각화한 페이지.
    - chart.js, react-chartjs-2의 pie를 사용한 데이터 시각화
        - user가  업로드한 게시글에서 술 keyword를 정제하기 위해 for문을 사용
            - for문 내부에서 정제 작업을 통해 각 배열에 넣어 배열에 추가된 데이터의 length를 사용해 숫자를 표기.
                
                <br/>
                
    - user가 게시글을 작성하지 않았다면 그래프 표시가 되지 않도록 분기처리.
    
    <br/>
    
    ### 4. drinkTest page

- 유저가 술을 좋아하는지 알 수 있는 테스트 진행이 가능한 페이지
    - npm에서 커스텀 로딩 라이브러리를 검색해 @ronchalant/react-loading-overlay 라이브러리를 채택
        
        - custom hook을 사용한 로딩처리
        
        <br/>
        
    - state와 css의 width 속성을 이용해 테스트 진행도를 시각화.
    
    <br/>
    
    - 결과 페이지는Dynamic Routes를 사용하여 router.query로 다른 test 결과를 렌더링
