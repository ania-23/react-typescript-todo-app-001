import {useState, useRef, useEffect} from "react";
import "./App.css";
import Header from "./components/Header";
import DropZoneDiv from "./components/DropZoneDiv";
import {Box} from "@chakra-ui/react";

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
        console.log(
          `完了${showFormDone},未完了${showFormTodo},着手中${showFormInProgress}`
        );
        if (showFormDone) {
          //true=開いていたら閉じたい
          setShowFormDone(false);
        }
        if (showFormInProgress) {
          setShowFormInProgress(false);
        }
        if (showFormTodo) {
          setShowFormTodo(false);
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
  }, [insideRef, showFormDone, showFormInProgress, showFormTodo]);

  console.log("App");
  return (
    <>
      <Box w="100%" h="100vh" bgGradient="linear(to-r, orange.400, teal.200)">
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
      </Box>
    </>
  );
}

export default App;
