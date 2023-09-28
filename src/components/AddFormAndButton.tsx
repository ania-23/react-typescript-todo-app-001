import React, {ChangeEvent, FormEvent, useState} from "react";
import SecondaryButton from "./atoms/SecondaryButton";
import TodoForm from "./TodoForm";
import {todoType} from "./todoType";

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
  //   const {inputText, setInputText, todoList, setTodoList, onClick, status} =
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
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.value);
    setInputText(event.target.value);
  }
  return (
    <div className="AddFormAndButton">
      {/** ここがDone（完了）のみになっている*/}
      {showFormDone ? (
        <TodoForm
          inputText={inputText}
          onClick={(event: FormEvent) => inputTextAdd(event, status)}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleOnChange(event)
          }
        />
      ) : (
        <SecondaryButton
          text={"Add a card..."}
          onClick={() => {
            switch (status) {
              case 0:
                setShowFormTodo(true);
                break;
              case 1:
                setShowFormInProgress(true);
                break;
              case 2:
                setShowFormDone(true);
            }
          }}
        />
      )}
    </div>
  );
};

export default AddFormAndButton;
