import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";
import TodoForm from "./components/TodoForm";
import LoginForm from "./components/LoginForm";

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

  const [showFormTodo, setShowFormTodo] = useState(false);

  const [showFormInProgress, setShowFormInProgress] = useState(false);
  const [showFormDone, setShowFormDone] = useState(false);

  const [draggedTodo, setDraggedTodo] = useState<todoType | null>(null); // ドラッグされたTODOアイテムの情報を保持

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false); // ログインフォームの表示状態

  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態

  // ログインボタンをクリックしたときにモーダルを表示
  const handleLoginButtonClick = () => {
    setIsLoginFormVisible(true);
  };

  // ログインが成功したときの処理
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginFormVisible(false);
  };

  // ログアウト処理
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignUpButtonClick = () => {
    console.log("SignUp");
  };

  // フォームのref
  // const formRefTodo = useRef<HTMLDivElement | null>(null);
  // const formRefInProgress = useRef<HTMLDivElement | null>(null);
  // const formRefDone = useRef<HTMLDivElement | null>(null);
  // // ドキュメントクリック時のイベントリスナー
  // const handleClickOutside = (ev: React.MouseEvent): any => {
  //   if (
  //     formRefTodo.current &&
  //     !formRefTodo.current.contains(ev.target as Node)
  //   ) {
  //     console.log("useRefTodo");
  //     // フォームの外部をクリックした場合、フォームを非表示にする
  //     // setShowFormInProgress(false);
  //     // setShowFormDone(false);
  //     setShowFormTodo(true);
  //   } else {
  //     setShowFormTodo(false);
  //   }
  // };

  // useEffect(() => {
  //   // ドキュメント全体にクリックイベントリスナーを追加
  //   document.addEventListener("click", handleClickOutside as React.FC);

  //   // コンポーネントがアンマウントされたらリスナーを削除
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside as React.FC);
  //   };
  // }, []);

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

  // statusを変更する関数
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
  function inputTextAdd(event: React.FormEvent, defautStatus: 0 | 1 | 2) {
    // これを書かないと再レンダリングされる。
    event.preventDefault();
    console.log("a");
    if (!inputText) {
      return;
    }

    setInputText("");
    switch (defautStatus) {
      case 0:
        setTodoList([
          ...todoList,
          {id: todoList.length + 1, todo: inputText, status: 0},
        ]);
        setShowFormTodo(false);
        break;
      case 1:
        setTodoList([
          ...todoList,
          {id: todoList.length + 1, todo: inputText, status: 1},
        ]);
        setShowFormInProgress(false);
        break;
      case 2:
        setTodoList([
          ...todoList,
          {id: todoList.length + 1, todo: inputText, status: 2},
        ]);
        setShowFormDone(false);
        break;
    }
  }
  return (
    <>
      <header>
        <h1>Trello?</h1>
        <div className="login">
          {/* <PrimaryButton text="Login" />
          <PrimaryButton text="SignUp" /> */}
          {/** ログインボタンを押下した場合*/}
          {isLoginFormVisible && <LoginForm onLogin={handleLoginSuccess} />}
          {/* ログインしていない場合にログインボタンを表示 */}
          {!isLoggedIn && (
            <PrimaryButton text="Login" onClick={handleLoginButtonClick} />
          )}

          {/* ログインしていない場合にSignUpボタンを表示 */}
          {!isLoggedIn && (
            <PrimaryButton text="SignUp" onClick={handleSignUpButtonClick} />
          )}

          {/* ログイン状態に応じてログアウトボタンを表示 */}
          {isLoggedIn && <PrimaryButton text="Logout" onClick={handleLogout} />}
        </div>
      </header>
      <div>{/**空 */}</div>
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
              .filter((todo) => !todo.status)
              .map((todo, index, list) => (
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
              ))}
            <li>
              {showFormTodo ? (
                <TodoForm
                  inputText={inputText}
                  onClick={(event: FormEvent) => inputTextAdd(event, 0)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(event)
                  }
                />
              ) : (
                <SecondaryButton
                  text={"Add a card..."}
                  onClick={() => setShowFormTodo(true)}
                />
              )}
            </li>
          </ul>
          {/* <div ref={formRefTodo}> */}

          {/* </div> */}
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
              {/* <div ref={formRefInProgress}> */}
              {showFormInProgress ? (
                <TodoForm
                  inputText={inputText}
                  onClick={(event: FormEvent) => inputTextAdd(event, 1)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(event)
                  }
                />
              ) : (
                <SecondaryButton
                  text={"Add a card..."}
                  onClick={() => setShowFormInProgress(true)}
                />
              )}
              {/* </div> */}
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
              {/* <div ref={formRefDone}> */}
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
              {/* </div> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
