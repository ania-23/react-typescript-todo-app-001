import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import TodoForm from "./TodoForm";
import {todoType} from "./todoType";
import {Button} from "@chakra-ui/react";
import {
  STORAGE_KEY_USERS,
  STORAGE_KEY_LOGIN_USER,
  useAuth,
  STORAGE_KEY_IS_LOGGEDIN,
} from "../authAtom";

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  todoList: todoType[];
  setTodoList: React.Dispatch<React.SetStateAction<todoType[]>>;

  showFormTodo: boolean;
  showFormInProgress: boolean;
  showFormDone: boolean;

  setShowFormTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFormInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFormDone: React.Dispatch<React.SetStateAction<boolean>>;
  //   onClick: () => void;
  status: 0 | 1 | 2;
}

const AddFormAndButton: React.FC<Props> = (props) => {
  const {
    inputText,
    setInputText,
    todoList,
    setTodoList,
    status,
    setShowFormDone,
    setShowFormInProgress,
    setShowFormTodo,
    showFormDone,
    showFormInProgress,
    showFormTodo,
  } = props;

  const {loginUser, setLoginUser, setUsers, isLoggedIn} = useAuth();
  const [isLoggedInState, setIsLoggedInState] = useState();

  // 画面上のTodoList管理
  const [nowTodoList, setNowTodoList] = useState<todoType[]>([]);

  useEffect(() => {
    // localStorageから保存されたユーザー認証データを取得
    const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
    const storedUser = localStorage.getItem(STORAGE_KEY_LOGIN_USER);
    const storedIsLoggedIn = localStorage.getItem(STORAGE_KEY_IS_LOGGEDIN);

    if (storedIsLoggedIn) {
      const parsedIsLoggedIn = JSON.parse(storedIsLoggedIn);
      setIsLoggedInState(parsedIsLoggedIn);

      if (parsedIsLoggedIn && storedUser && storedUsers) {
        const parsedUser = JSON.parse(storedUser);
        // ログインしていればparsedUserがnullなことがない
        console.log("user上書き？", loginUser);

        // ログインしたままリロードすると、jotaiのisLoggedInとユーザがfalseなのに、ユーザが上書きされる
        if (isLoggedIn) {
          setUsers((prevArray) =>
            prevArray.map((item) =>
              item.username === parsedUser.username ? loginUser : item
            )
          );
        }
      }
    }
    setNowTodoList(todoList);
    // console.log(loginUser);
  }, [todoList, loginUser, nowTodoList]);
  // setNewLoginUser(newUserAndTodo);
  // TODOリストに追加
  function inputTextAdd(event: React.FormEvent, defaultStatus: 0 | 1 | 2) {
    // これを書かないと再レンダリングされる。
    event.preventDefault();
    console.log("inputTextAdd", inputText, defaultStatus, event);
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
        console.log(isLoggedInState, todoList);

        if (isLoggedInState) {
          setLoginUser({
            username: loginUser.username,
            password: loginUser.password,
            todos: [...todoList, newTodo],
          });
        }

        setShowFormTodo(false);
        break;
      case 1:
        setTodoList([...todoList, newTodo]);
        console.log(isLoggedInState, todoList);
        if (isLoggedInState) {
          setLoginUser({
            username: loginUser.username,
            password: loginUser.password,
            todos: [...todoList, newTodo],
          });
        }
        setShowFormInProgress(false);
        break;
      case 2:
        setTodoList([...todoList, newTodo]);
        if (isLoggedInState) {
          setLoginUser({
            username: loginUser.username,
            password: loginUser.password,
            todos: [...todoList, newTodo],
          });
          console.log(todoList, nowTodoList);
          console.log("user上書き？");

          setUsers((prevUser) =>
            prevUser.map((item) =>
              item.username === loginUser.username ? loginUser : item
            )
          );
        }
        setShowFormDone(false);
        break;
    }
  }
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  function renderContent(status: 0 | 1 | 2) {
    switch (status) {
      case 0:
        return (
          <>
            {showFormTodo ? (
              <TodoForm
                inputText={inputText}
                onClick={(event: FormEvent) => inputTextAdd(event, status)}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(event)
                }
              />
            ) : (
              <Button
                // text={"Add a card..."}
                variant="ghost"
                _hover={{bg: "ffffff"}}
                color="gray.400"
                _active={{_active: "none"}}
                onClick={(e) => {
                  setShowFormTodo(true);
                  e.stopPropagation();
                }}
              >
                Add a card...
              </Button>
            )}
          </>
        );
      case 1:
        return (
          <>
            {showFormInProgress ? (
              <TodoForm
                inputText={inputText}
                onClick={(event: FormEvent) => inputTextAdd(event, status)}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(event)
                }
              />
            ) : (
              <Button
                // text={"Add a card..."}
                variant="ghost"
                _hover={{bg: "ffffff"}}
                color="gray.400"
                _active={{_active: "none"}}
                onClick={(e) => {
                  setShowFormInProgress(true);
                  e.stopPropagation();
                }}
              >
                Add a card...
              </Button>
            )}
          </>
        );
      case 2:
        return (
          <>
            {showFormDone ? (
              <TodoForm
                inputText={inputText}
                onClick={(event: FormEvent) => inputTextAdd(event, status)}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(event)
                }
              />
            ) : (
              <Button
                // text={"Add a card..."}
                variant="ghost"
                _hover={{bg: "ffffff"}}
                color="gray.400"
                _active={{_active: "none"}}
                onClick={(e) => {
                  setShowFormDone(true);
                  e.stopPropagation();
                }}
              >
                Add a card...
              </Button>
            )}
          </>
        );
      default:
        return <div>Default content</div>;
    }
  }
  return (
    <>
      <div className="AddFormAndButton">{renderContent(status)}</div>
    </>
  );
};

export default AddFormAndButton;
