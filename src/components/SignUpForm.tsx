import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {atomWithStorage, RESET} from "jotai/utils";
import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
} from "react";

// onLogin プロパティの型アノテーションを追加
interface SignUpFormProps {
  onSignUp: () => void;
}

// 実際ローカルストレージに保管したいデータ
export interface UserData {
  username: string;
  password: string;
}

// ローカルストレージに保存するキー
export const STORAGE_KEY = "users";

// Create an atom to store user authentication data
export const usersAtom = atomWithStorage<UserData[]>(STORAGE_KEY, []);
export const isLoggedInAtom = atomWithStorage<boolean>("isLoggedIn", false);
export const loginUserAtom = atomWithStorage<UserData | null>("you", null);

export const useAuth = () => {
  return useAtomValue(usersAtom);
};

export const useAuthMutators = () => {
  const setAuth = useSetAtom(usersAtom);

  const clearAuth = useCallback(() => {
    setAuth([]);
  }, [setAuth]);

  const signUp = useCallback(
    (userData: UserData) => {
      setAuth((prevUsers) => [...prevUsers, userData]);
    },
    [setAuth]
  );
  return {clearAuth, signUp};
};

const SignUpForm = ({onSignUp}: SignUpFormProps) => {
  const [users, setUsers] = useAtom(usersAtom); // Use authAtom to get and set user data
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const {signUp} = useAuthMutators();
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("usersAtom initial value:", usersAtom);
    console.log("STORAGE_KEY:", STORAGE_KEY);
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setUser({...user, conPassword: e.target.value});
    setConPassword(e.target.value);
  };
  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem("you", JSON.stringify(loginUser));
  }, [users, loginUser]);

  const handleSubmit = () => console.log("handleSubmit");

  function isGreater1(value: string) {
    return value.length >= 1;
  }
  const handleSignUp = () => {
    let isValidUserData = true;
    // サインアップのロジックをここに実装する
    // サインアップが成功したら、onLoginコールバックを呼び出して親コンポーネントに通知する

    // バリデーション
    // username,password,conPasswordの桁数1以上
    // 同じusernameが存在していないこと
    // passwordとconPasswordが一致していること
    if (
      !isGreater1(username) ||
      !isGreater1(password) ||
      !isGreater1(conPassword)
    ) {
      isValidUserData = false;
    }
    // 同じユーザー名が既に存在するかをチェック
    const usersArray = Object.values(users);
    const usernameExists = usersArray.some(
      (user) => user.username === username
    );
    if (usernameExists) {
      isValidUserData = false;
    }

    if (password !== conPassword) {
      isValidUserData = false;
    }

    if (isValidUserData) {
      //
      // 新しいユーザーオブジェクトを作成
      const newUser = {username: username, password: password};

      // 現在のユーザー情報をコピーして新しいユーザーを追加
      const updatedUserList = [...users, newUser];

      // 新しいユーザーリストをセット(これでローカルストレージにセットできる？)
      setUsers(updatedUserList);
      setLoginUser(newUser);
      handleSubmit();
      // 親コンポーネントでボタン制御をする
      onSignUp();
    } else {
      alert("登録エラー");
    }
  };

  return (
    <div className="sign-up-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="password"
        placeholder="PasswordForConfirm"
        value={conPassword}
        onChange={handleConPasswordChange}
      />
      <button onClick={handleSignUp}>SignUp</button>
    </div>
  );
};

export default SignUpForm;
