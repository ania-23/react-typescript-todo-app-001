import React, {ChangeEvent, FormEvent, useState, useRef} from "react";
import "./App.css";
import SecondaryButton from "./components/SecondaryButton";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";

interface todoType {
  id: number;
  todo: string;
  status: 0 | 1 | 2;
}

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDroppable, setIsDroppable] = useState(false);
  const [draggedTodo, setDraggedTodo] = useState<todoType | null>(null); // ドラッグされたTODOアイテムの情報を保持

  const [showFormTodo, setShowFormTodo] = useState(false);
  const [showFormInProgress, setShowFormInProgress] = useState(false);
  const [showFormDone, setShowFormDone] = useState(false);

  // useRefのconstがあった
  // useRefの関数があった

  // drag itemを持ったとき
  const onDragStart = (e: React.DragEvent<HTMLLIElement>, todo: todoType) => {
    setIsDragging(true);
    setDraggedTodo(todo); // ドラッグされたTODOの情報をセット
  };

  // Itemがドラッグ終了したとき
  const onDragEnd = () => {
    setIsDragging(false);
    setDraggedTodo(null);
  };

  // drop zoneにドロップされたとき
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e);
    if (draggedTodo) {
      console.log("TODOがドロップされました");
      // ドラッグされたTODOが存在する場合
      // e.Targetでは、divタグでなく、liやbuttonを拾ってくる
      if (e.currentTarget.classList.contains("inProgressDiv")) {
        console.log("着手中に変更になります。");
        handleStatusChange(draggedTodo.id, 1); // statusを1 (着手中) に変更
      }
      if (e.currentTarget.classList.contains("todoDiv")) {
        handleStatusChange(draggedTodo.id, 0); // statusを0 (未着手) に変更
      }
      if (e.currentTarget.classList.contains("doneDiv")) {
        handleStatusChange(draggedTodo.id, 2); // statusを2 (完了) に変更
      }
    }

    console.log(todoList);
  };
  /**
//    * drop zone に関するイベント
//    */
  //   /* Itemがdrag zoneに入ったとき */
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log("on drag enter", e);
    if (e.currentTarget.id === "drop-zone") {
      setIsDroppable(true);
    }
  };

  /* Itemがdrag zoneから出たとき */
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // 放しても実行される
    // console.log("on drag leave", e);
    if (e.currentTarget.className === "drop-zone") {
      setIsDroppable(false);
    }
  };

  // Todoのstatusを変更する関数
  function handleStatusChange(id: number, newStatus: 0 | 1 | 2) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {...todo, status: newStatus};
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }
  function handleDelete(id: number) {
    // todoListのコピーを作成
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);

    // 状態を更新
    setTodoList(updatedTodoList);
  }
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.value);
    setInputText(event.target.value);
  }

  // TODOリストに追加
  function inputTextAdd(event: React.FormEvent, defaultStatus: 0 | 1 | 2) {
    // これを書かないと再レンダリングされる。
    event.preventDefault();
    console.log("inputTextAdd", inputText, defaultStatus);
    if (!inputText) {
      return;
    }

    const newTodo: todoType = {
      id: todoList.length + 1,
      todo: inputText,
      status: defaultStatus,
    };
    setInputText("");
    switch (defaultStatus) {
      case 0:
        setTodoList([...todoList, newTodo]);
        setShowFormTodo(false);
        break;
      case 1:
        setTodoList([...todoList, newTodo]);
        setShowFormInProgress(false);
        break;
      case 2:
        setTodoList([...todoList, newTodo]);
        setShowFormDone(false);
        break;
    }
  }
  return (
    <>
      <Header />
      <div className="kanban">
        <div
          className="todoDiv drop-zone"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={onDrop}
        >
          <h2>未着手</h2>
          <ul>
            {todoList
              .filter((todo) => todo.status === 0)
              .map((todo) => (
                <>
                  <li
                    key={todo.id}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, todo)}
                    onDragEnd={onDragEnd}
                  >
                    {todo.todo}
                    <SecondaryButton
                      onClick={() => handleDelete(todo.id)}
                      text={"×"}
                    />
                  </li>
                </>
              ))}
            <li>
              {showFormTodo ? (
                <TodoForm
                  inputText={inputText}
                  onClick={(event: FormEvent) => inputTextAdd(event, 0)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(event)
                  }
                  // ref={todoFormTodoRef}
                />
              ) : (
                <SecondaryButton
                  text={"Add a card..."}
                  onClick={() => setShowFormTodo(true)}
                />
              )}
            </li>
          </ul>
        </div>
        <div
          className="inProgressDiv drop-zone"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={onDrop}
        >
          <h2>着手中</h2>
          <ul>
            {todoList
              .filter((todo) => todo.status === 1)
              .map((todo) => (
                <>
                  <li
                    key={todo.id}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, todo)}
                    onDragEnd={onDragEnd}
                  >
                    {todo.todo}
                    <SecondaryButton
                      onClick={() => handleDelete(todo.id)}
                      text={"×"}
                    />
                  </li>
                </>
              ))}
            <li>
              {showFormInProgress ? (
                <TodoForm
                  inputText={inputText}
                  onClick={(event: FormEvent) => inputTextAdd(event, 1)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(event)
                  }
                  // ref={todoFormInProgressRef}
                />
              ) : (
                <SecondaryButton
                  text={"Add a card..."}
                  onClick={() => setShowFormInProgress(true)}
                />
              )}
            </li>
          </ul>
        </div>
        <div
          className="doneDiv  drop-zone"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={onDrop}
        >
          <h2>完了</h2>
          <ul>
            {todoList
              .filter((todo) => todo.status === 2)
              .map((todo) => (
                <>
                  <li
                    key={todo.id}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, todo)}
                    onDragEnd={onDragEnd}
                  >
                    {todo.todo}
                    <SecondaryButton
                      onClick={() => handleDelete(todo.id)}
                      text={"×"}
                    />
                  </li>
                </>
              ))}
            <li>
              <div>
                {showFormDone ? (
                  <TodoForm
                    inputText={inputText}
                    onClick={(event: FormEvent) => inputTextAdd(event, 2)}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleOnChange(event)
                    }
                  />
                ) : (
                  <SecondaryButton
                    text={"Add a card..."}
                    onClick={() => setShowFormDone(true)}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
