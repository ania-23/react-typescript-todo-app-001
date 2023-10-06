// authAtom.tsx
import {useAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";

// ローカルストレージに保存するキー
export const STORAGE_KEY_TODO_LIST = "todoList";
export const todoListAtom = atomWithStorage(STORAGE_KEY_TODO_LIST, null); // todoListを管理するアトム

export const useTodo = () => {
  const [todoList, settodoList] = useAtom(todoListAtom);

  return {todoList, settodoList};
};
