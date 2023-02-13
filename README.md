

## DrinkComeTrue



## 💻 설치 방법

    yarn install
    yarn dev

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
