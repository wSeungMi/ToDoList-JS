# ToDoList-JS

<div align="center">
  <img width="100%" alt="preview_img" src="https://github.com/wSeungMi/ToDoList-JS/assets/104605709/ee5295d2-5e11-4d94-9854-d52cf541f061">
</div>

[![바로가기](https://img.shields.io/badge/사이트바로가기-592EC1?style=for-the-badge&logo=github&logoColor=white)](http://wseungmi.github.io/ToDoList-JS/)

## 🎯 Project Goal

- DOM을 이용한 Vanilla JS 프로젝트 완성

## 🛠️ Stack

<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">

## ✨ Features

- 할일 추가
- 할일 수정
- 할일 삭제
- 할일 목록 조회
- 할일 완료

## 👾 Trouble Shooting

### 1. 할일 완료, 삭제에 해당하는 고유 id값 부여

**🤔 문제 원인**  
`새로고침 이후 객체 id값이 다시 1부터 들어가는 이슈`

<img width="100%" alt="id_error" src="https://github.com/wSeungMi/ToDoList-JS/assets/104605709/a631f48f-4469-4cf9-bae1-bd132d3d7060">
새로운 값을 등록할 때마다 객체의 id 값이 1씩 증가하게 되는데, 이때 새로고침을 하면 다시 초깃값인 1부터 값이 생성되는 문제점을 발견했습니다.

<br />
 
**👍 해결 방법**  
👀 기존 코드에서는 id값을 담는 변수인 `nextId`의 초깃값을 1로 주고, 데이터를 추가할 때마다 1이 증가하는 방식이었습니다.
```javascript
let nextId = 1; // id값
// ...
const newTodo = [...todo, { id: nextId, task: newTask, done: false }];
nextId++;
```
<br />

**시도 1.** localStorage 마지막 데이터의 id 값 확인하기

- localStorage에 데이터가 존재한다면 가장 마지막 데이터의 id값을 확인하고, 해당 id 값의 다음 숫자부터 id를 생성해 주는 방법을 시도했습니다.

**적용하기**

```javascript
const currentId = todo.length > 0 ? todo[todo.length - 1].id : 0;
const newTodo = [...todo, { id: currentId + 1, task: newTask, done: false }];
nextId++;
```

<img width="100%" alt="id_solved1" src="https://github.com/wSeungMi/ToDoList-JS/assets/104605709/25e3d5d0-a8f0-4ab5-9627-c17416731b0f">

- 새로고침을 해도 id 값의 순서가 이어지는 것을 확인할 수 있습니다. 하지만 마지막 데이터를 삭제하는 경우 문제점이 있었습니다. 다시 새로운 할 일을 추가했을 때 삭제된 데이터 id의 다음 값이 아닌 방금 삭제했던 데이터의 id 값이 다시 재사용됩니다. 이는 예상치 못한 결과를 초래할 수 있으며, 예측하기 쉬운 id를 사용하는 것은 보안상의 위험을 증가시킬 수 있습니다.

<br />

**시도 2.** UUID로 id값 생성하기

- 이러한 문제를 방지하고자 id값에 고유 식별자를 넣어주기로 결정하였습니다. 자바스크립트에서는 [Crypto:randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)메서드를 이용하여 UUID(Universally Unique Identifier)를 생성할 수 있습니다.

**적용하기**

```javascript
let uuid = self.crypto.randomUUID();
const newTodo = [...todos, { id: uuid, task: newTask, done: false }];
```

<img width="100%" alt="id_before" src="https://github.com/wSeungMi/ToDoList-JS/assets/104605709/875b4afd-dd0f-4f53-b8fd-4808b19f7a9c">
<img width="100%" alt="id_after" src="https://github.com/wSeungMi/ToDoList-JS/assets/104605709/f7bff412-0872-4559-9157-70251a2fbecc">

- 기존에 있던 할 일을 삭제하고 새로 추가하는 경우 삭제된 id 값이 재사용되지 않고 새로 추가되는 것을 확인할 수 있습니다.

## 📑 커밋 컨벤션

```markdown
Feat : 새로운 기능 추가
Fix : 버그 수정
Design : UI 디자인 변경(CSS 스타일링)
Refactor : 리팩토링 작업 진행(코드/코드 스타일 변경 포함)
Docs : 문서 변경
Chore : 패키지 설치 및 환경 설정 변경
Rename : 파일 혹은 폴더명 수정
Remove : 파일 혹은 폴더 삭제
```
