// authAtom.tsx
import {useAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";
import {todoType} from "./components/todoType";
// 実際ローカルストレージに保管したいデータ
export interface UserData {
  username: string;
  password: string;
  todos: todoType[];
}
// ローカルストレージに保存するキー
export const STORAGE_KEY_USERS = "users";
export const STORAGE_KEY_IS_LOGGEDIN = "isLoggedIn";
export const STORAGE_KEY_LOGIN_USER = "you";

export const isLoggedInAtom = atomWithStorage(STORAGE_KEY_IS_LOGGEDIN, false); // ログイン状態を管理するアトム
export const loginUserAtom = atomWithStorage(STORAGE_KEY_LOGIN_USER, {
  username: "",
  password: "",
  todos: [] as todoType[],
}); // ログインユーザを管理するアトム

// Create an atom to store user authentication data
export const usersAtomStorage = atomWithStorage<UserData[]>(
  STORAGE_KEY_USERS,
  []
);

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const [users, setUsers] = useAtom(usersAtomStorage); // Use authAtom to get and set user data

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return {isLoggedIn, login, logout, loginUser, setLoginUser, users, setUsers};
};
