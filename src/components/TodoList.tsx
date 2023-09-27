//未使用
/**
 * App.tsxでは下記のように書いて使ってたが、
 * リストに表示されない（filterで弾かれている？）
 *           <TodoList
            onClick={(event: FormEvent) => inputTextAdd(event, 0)}
            inputText={inputText}
            setInputText={setInputText}
            filterStatus={0}
          />
 */

import React, {FormEvent, ChangeEvent, useState} from "react";
import SecondaryButton from "./SecondaryButton";
import TodoForm from "./TodoForm";

interface Props {
  //   inputText: string;
  onClick: (event: FormEvent) => void;
  inputText: string; // inputText ステート
  setInputText: React.Dispatch<React.SetStateAction<string>>; // setInputText 関数
  filterStatus: 0 | 1 | 2;
  //   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  //   onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
interface todoType {
  id: number;
  todo: string;
  status: 0 | 1 | 2;
}

const TodoList: React.FC<Props> = (props) => {
  const {onClick, inputText, setInputText, filterStatus} = props;

  // useState
  const [isDragging, setIsDragging] = useState(false);
  const [isDroppable, setIsDroppable] = useState(false);
  const [draggedTodo, setDraggedTodo] = useState<todoType | null>(null); // ドラッグされたTODOアイテムの情報を保持
  const [todoList, setTodoList] = useState<todoType[]>([]);
  //   const [inputText, setInputText] = useState<string>("");

  const [showFormTodo, setShowFormTodo] = useState(false);
  const [showFormInProgress, setShowFormInProgress] = useState(false);
  const [showFormDone, setShowFormDone] = useState(false);

  const todoFormDoneRef = useRef(null);

  // フォームがフォーカスを失ったときのハンドラ
  const handleFormBlur = () => {
    setShowFormTodo(false);
    setShowFormInProgress(false);
    setShowFormDone(false);
  };

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

  //   const {inputText, onClick, onChange, onBlur} = props;

  return (
    <ul>
      {todoList
        .filter((todo) => todo.status === filterStatus)
        .map((todo) => (
          <li
            key={todo.id}
            draggable="true"
            onDragStart={(e) => onDragStart(e, todo)}
            onDragEnd={onDragEnd}
          >
            {todo.todo}
            <SecondaryButton onClick={() => handleDelete(todo.id)} text={"×"} />
          </li>
        ))}
      <li>
        {/* {showFormDone ? (
          <TodoForm
            inputText={inputText}
            onClick={onClick}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange(event)
            }
            onBlur={handleFormBlur}
            ref={todoFormDoneRef}
          />
        ) : (
          <SecondaryButton
            text={"Add a card..."}
            onClick={() => setShowFormDone(true)}
          />
        )} */}
      </li>
    </ul>
  );
};

export default TodoList;
function useRef(arg0: null) {
  throw new Error("Function not implemented.");
}
