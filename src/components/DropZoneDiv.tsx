import React from "react";
import AddFormAndButton from "./AddFormAndButton";
import SecondaryButton from "./atoms/SecondaryButton";
import {todoType} from "./todoType";
import TodoH2 from "./atoms/TodoH2";
import {ListItem, UnorderedList} from "@chakra-ui/react";

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  todoList: todoType[];
  setTodoList: React.Dispatch<React.SetStateAction<todoType[]>>;
  setIsDroppable: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  draggedTodo: todoType | null;
  setDraggedTodo: React.Dispatch<React.SetStateAction<todoType | null>>;
  status: 0 | 1 | 2;

  showFormTodo: boolean;
  showFormInProgress: boolean;
  showFormDone: boolean;

  setShowFormTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFormInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFormDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropZoneDiv: React.FC<Props> = (props) => {
  const {
    inputText,
    setInputText,
    todoList,
    setTodoList,
    setIsDragging,
    setIsDroppable,
    draggedTodo,
    setDraggedTodo,
    status,
    setShowFormDone,
    setShowFormInProgress,
    setShowFormTodo,
    showFormDone,
    showFormInProgress,
    showFormTodo,
  } = props;

  /**
   * drop zone に関するイベント
   */
  //   /* Itemがdrag zoneに入ったとき */
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "drop-zone") {
      setIsDroppable(true);
    }
  };

  /* Itemがdrag zoneから出たとき */
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // 放しても実行される
    if (e.currentTarget.className === "drop-zone") {
      setIsDroppable(false);
    }
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
    if (draggedTodo) {
      // ドラッグされたTODOが存在する場合
      // e.Targetでは、divタグでなく、liやbuttonを拾ってくる
      if (e.currentTarget.classList.contains("inProgressDiv")) {
        handleStatusChange(draggedTodo.id, 1); // statusを1 (着手中) に変更
      }
      if (e.currentTarget.classList.contains("todoDiv")) {
        handleStatusChange(draggedTodo.id, 0); // statusを0 (未着手) に変更
      }
      if (e.currentTarget.classList.contains("doneDiv")) {
        handleStatusChange(draggedTodo.id, 2); // statusを2 (完了) に変更
      }
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
  function divClassName(status: 0 | 1 | 2) {
    switch (status) {
      case 0:
        return "todoDiv";
      case 1:
        return "inProgressDiv";
      case 2:
        return "doneDiv";
    }
  }
  return (
    <div
      className={divClassName(status)}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={onDrop}
    >
      <TodoH2 status={status} />
      <UnorderedList ms="0">
        {todoList
          .filter((todo) => todo.status === status)
          .map((todo) => (
            <>
              <ListItem
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
              </ListItem>
            </>
          ))}
        <ListItem>
          <AddFormAndButton
            inputText={inputText}
            setInputText={setInputText}
            todoList={todoList}
            setTodoList={setTodoList}
            status={status}
            setShowFormTodo={setShowFormTodo}
            setShowFormInProgress={setShowFormInProgress}
            setShowFormDone={setShowFormDone}
            showFormDone={showFormDone}
            showFormInProgress={showFormInProgress}
            showFormTodo={showFormTodo}
          />
        </ListItem>
      </UnorderedList>
    </div>
  );
};

export default DropZoneDiv;
