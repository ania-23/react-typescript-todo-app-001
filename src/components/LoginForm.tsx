import React, {FormEvent, ChangeEvent, useState, useEffect} from "react";
import {STORAGE_KEY, UserData} from "./SignUpForm";

// onLogin プロパティの型アノテーションを追加
interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({onLogin}: LoginFormProps) => {
  // ユーザからの入力を受け付ける
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    // localStorageから保存されたユーザー認証データを取得
    const storedUserData = localStorage.getItem(STORAGE_KEY);
    if (storedUserData) {
      const parsedUserData: UserData[] = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const handleLogin = () => {
    // ログインのロジックをここに実装する
    // ログインが成功したら、onLoginコールバックを呼び出して親コンポーネントに通知する
    const foundUser = userData.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      onLogin();
    } else {
      alert(
        "ユーザー名またはパスワードが違います。未登録の場合はSignUpをしてください"
      );
    }
  };

  return (
    <div className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
