import React, {FormEvent, ChangeEvent, useState} from "react";

// onLogin プロパティの型アノテーションを追加
interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({onLogin}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ログインのロジックをここに実装する
    // ログインが成功したら、onLoginコールバックを呼び出して親コンポーネントに通知する
    if (username === "a" && password === "a") {
      onLogin();
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
