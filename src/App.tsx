import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import "./App.css";
import SecondaryButton from "./components/atoms/SecondaryButton";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";
import AddFormAndButton from "./components/AddFormAndButton";
import DropZoneDiv from "./components/DropZoneDiv";

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

  // Formのオンオフ
  const [showFormTodo, setShowFormTodo] = useState(false);
  const [showFormInProgress, setShowFormInProgress] = useState(false);
  const [showFormDone, setShowFormDone] = useState(false);

  // useRefのconst
  const insideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //対象の要素を取得
    const el = insideRef.current;

    //対象の要素がなければ何もしない
    if (!el) return;

    //クリックした時に実行する関数
    const hundleClickOutside = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        console.log("soto");
        console.log(showFormDone, "開いていない");
        if (showFormDone) {
          //true=開いていたら閉じたい
          setShowFormDone(false);
          setShowFormInProgress(false);
          setShowFormTodo(false);
        } else {
        }
      } else {
        console.log("naka");
      }
    };

    //クリックイベントを設定
    document.addEventListener("click", hundleClickOutside);

    //クリーンアップ関数
    return () => {
      //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
      document.removeEventListener("click", hundleClickOutside);
    };
  }, [insideRef]);

  return (
    <>
      <Header />
      <div className="kanban" ref={insideRef}>
        <DropZoneDiv
          inputText={inputText}
          setInputText={setInputText}
          todoList={todoList}
          setTodoList={setTodoList}
          status={0}
          setIsDroppable={setIsDroppable}
          setIsDragging={setIsDragging}
          draggedTodo={draggedTodo}
          setDraggedTodo={setDraggedTodo}
          showFormInProgress={showFormInProgress}
          showFormTodo={showFormTodo}
          showFormDone={showFormDone}
          setShowFormDone={setShowFormDone}
          setShowFormInProgress={setShowFormInProgress}
          setShowFormTodo={setShowFormTodo}
        />
        <DropZoneDiv
          inputText={inputText}
          setInputText={setInputText}
          todoList={todoList}
          setTodoList={setTodoList}
          status={1}
          setIsDroppable={setIsDroppable}
          setIsDragging={setIsDragging}
          draggedTodo={draggedTodo}
          setDraggedTodo={setDraggedTodo}
          setShowFormDone={setShowFormDone}
          showFormInProgress={showFormInProgress}
          showFormTodo={showFormTodo}
          showFormDone={showFormDone}
          setShowFormInProgress={setShowFormInProgress}
          setShowFormTodo={setShowFormTodo}
        />
        <DropZoneDiv
          inputText={inputText}
          setInputText={setInputText}
          todoList={todoList}
          setTodoList={setTodoList}
          status={2}
          setIsDroppable={setIsDroppable}
          setIsDragging={setIsDragging}
          draggedTodo={draggedTodo}
          setDraggedTodo={setDraggedTodo}
          showFormInProgress={showFormInProgress}
          showFormTodo={showFormTodo}
          showFormDone={showFormDone}
          setShowFormDone={setShowFormDone}
          setShowFormInProgress={setShowFormInProgress}
          setShowFormTodo={setShowFormTodo}
        />
      </div>
    </>
  );
}

export default App;
