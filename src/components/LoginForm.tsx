import {useState, useEffect} from "react";
import {STORAGE_KEY_USERS, UserData, useAuth} from "../authAtom";
import {Input} from "@chakra-ui/input";
import PrimaryButton from "./atoms/PrimaryButton";

// onSubmit プロパティの型アノテーションを追加
interface LoginFormProps {
  onSubmit: () => void;
  onClose: () => void;
}

const LoginForm = ({onSubmit, onClose}: LoginFormProps) => {
  // ユーザからの入力を受け付ける
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setLoginUser} = useAuth();
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    // localStorageから保存されたユーザー認証データを取得
    const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
    if (storedUsers) {
      const parsedUsers: UserData[] = JSON.parse(storedUsers);
      setUserData(parsedUsers);
    }
  }, []);

  const handleLogin = () => {
    // ログインのロジックをここに実装する
    // ログインが成功したら、onLoginコールバックを呼び出して親コンポーネントに通知する
    // jotaiの更新は親がする
    const foundUser = userData.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setLoginUser(foundUser);
      onSubmit();
      onClose();
      console.log("LoginForm");
    } else {
      alert(
        "ユーザー名またはパスワードが違います。未登録の場合はSignUpをしてください"
      );
    }
  };

  return (
    <div className="login-form">
      <Input
        m="5px"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        m="5px"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PrimaryButton onClick={handleLogin} text={"Login"} />
    </div>
  );
};

export default LoginForm;
