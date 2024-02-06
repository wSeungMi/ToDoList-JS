let todos = [];
const $input = document.querySelector("input");
const $button = document.querySelector("button");
const $listItem = document.getElementById("todo_list");
let newTask = ""; // 새로운 할일 임시저장

// 데이터 받아오기(localStorage)
function init() {
  let storedTodos = JSON.parse(localStorage.getItem("todo-list"));
  if (storedTodos) {
    todos = storedTodos;
  }
  reloadTodoList();
}

init();

// 리스트 조회
function reloadTodoList() {
  $listItem.innerHTML = "";

  // 리스트 렌더링
  todos.map((list) => {
    const $li = document.createElement("li");
    $li.setAttribute("key", list.id);
    $li.classList.add("todo_item");

    // 할일 내용
    const $todoWrapper = document.createElement("div");
    $todoWrapper.classList.add("todo_wrapper");

    const $span = document.createElement("span");
    $span.classList.add("todo_content");

    const liText = document.createTextNode(list.task);
    const $checkbox = document.createElement("div");
    $checkbox.classList.add("checkbox_btn");

    $li.appendChild($checkbox);
    $span.appendChild(liText);
    $todoWrapper.appendChild($checkbox);
    $todoWrapper.appendChild($span);
    $li.appendChild($todoWrapper);
    $listItem.appendChild($li);

    // 할일 수정 버튼, 삭제 버튼
    const $buttonWrapper = document.createElement("div");
    $buttonWrapper.classList.add("button_wrapper");

    const $editBtn = document.createElement("button");
    $editBtn.classList.add("edit_btn");
    $editBtn.insertAdjacentHTML(
      "afterbegin",
      '<i class="fa-solid fa-pen-to-square"></i>'
    );

    const $deleteBtn = document.createElement("button");
    $deleteBtn.classList.add("delete_btn");
    $deleteBtn.insertAdjacentHTML(
      "beforeend",
      '<i class="fa-solid fa-xmark fa-1g"></i>'
    );

    $buttonWrapper.appendChild($editBtn);
    $buttonWrapper.appendChild($deleteBtn);
    $li.appendChild($buttonWrapper);

    // 할일 완료
    $checkbox.addEventListener("click", () => handlecompletedTodo(list.id));

    if (list.done) {
      $checkbox.classList.add("checked");
      $span.classList.add("checked");
    }

    // 할일 삭제
    $deleteBtn.addEventListener("click", () => {
      const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

      if (isConfirmed) {
        handleDeleteTodo(list.id);
      } else {
        return;
      }
    });

    // 할일 수정
    $editBtn.addEventListener("click", (e) => {
      handleEditTodo(e, list.id);
    });
  });
}

const handlecompletedTodo = (doneListId) => {
  const isCompleted = todos.map((list) =>
    list.id === doneListId ? { ...list, done: !list.done } : list
  );
  setList(isCompleted);
  reloadTodoList();
};

const handleEditTodo = (e, editListId) => {
  const currentTargetElement = e.target;

  if (currentTargetElement) {
    const $selectTodo = e.target.closest("li");
    const $newInput = document.createElement("input");
    $newInput.classList.add("edit_input");

    const currentTextContent = $selectTodo.textContent;
    $selectTodo.textContent = ""; // 기존 텍스트 삭제
    $newInput.setAttribute("value", currentTextContent);

    const $buttonWrapper = document.createElement("div");
    $buttonWrapper.classList.add("button_wrapper");

    const $cancleBtn = document.createElement("button");
    $cancleBtn.classList.add("cancle_btn");
    $cancleBtn.insertAdjacentHTML(
      "afterbegin",
      '<i class="fa-solid fa-xmark fa-1g"></i>'
    );

    $cancleBtn.addEventListener("click", reloadTodoList);

    // 수정 완료 버튼 추가
    const $editDoneBtn = document.createElement("button");
    $editDoneBtn.classList.add("edit_done_btn");
    $editDoneBtn.insertAdjacentHTML(
      "afterbegin",
      '<i class="fa-solid fa-check"></i>'
    );

    $editDoneBtn.addEventListener("click", () => {
      if (editListId && $newInput.value !== "") {
        const newEditTodo = todos.map((list) =>
          list.id === editListId ? { ...list, task: $newInput.value } : list
        );
        setList(newEditTodo);
        reloadTodoList();
      } else {
        alert("할일을 입력해주세요🙌!");
        return;
      }
    });

    $buttonWrapper.appendChild($editDoneBtn);
    $buttonWrapper.appendChild($cancleBtn);
    $selectTodo.appendChild($newInput);
    $selectTodo.appendChild($buttonWrapper);

    // input Focus
    const $focusInput = document.querySelector(".edit_input");
    $focusInput.focus();
    $focusInput.setSelectionRange(
      $focusInput.value.length,
      $focusInput.value.length
    );
  }
};

// 할일 삭제
const handleDeleteTodo = (delListId) => {
  const updateList = todos.filter((list) => list.id !== delListId);
  setList(updateList);
  reloadTodoList();
};

// 할일 추가
const setList = (newTodo) => {
  todos = newTodo;

  if (!todos.length) {
    localStorage.removeItem("todo-list");
  } else {
    localStorage.setItem("todo-list", JSON.stringify(todos));
  }
};

const onInput = (e) => {
  newTask = e.target.value;

  if (e.key === "Enter") {
    if (e.isComposing) return;
    handlerAddTodo(newTask);
  }
};

const handlerAddTodo = () => {
  if (!newTask) {
    alert("할일을 입력해주세요🙌!");
    return;
  }

  // id값을 고유 식별자로 대체
  let uuid = self.crypto.randomUUID();
  const newTodo = [...todos, { id: uuid, task: newTask, done: false }];
  setList(newTodo);
  $input.value = ""; // input value 초기화
  newTask = ""; // newTask value 초기화
  reloadTodoList();
};

$input.addEventListener("keydown", onInput);
$input.focus();
$button.addEventListener("click", handlerAddTodo);
