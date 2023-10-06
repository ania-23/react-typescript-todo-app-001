import {useAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";
import {ChangeEvent, useState, useEffect} from "react";
import {STORAGE_KEY_USERS, UserData, useAuth} from "../authAtom";
import {Input} from "@chakra-ui/input";
import PrimaryButton from "./atoms/PrimaryButton";
import {todoType} from "./todoType";

// onLogin プロパティの型アノテーションを追加
interface SignUpFormProps {
  onSubmit: () => void;
  onClose: () => void;
}

const SignUpForm = ({onSubmit, onClose}: SignUpFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const {setLoginUser, users, setUsers} = useAuth();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("STORAGE_KEY:", STORAGE_KEY_USERS);
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
    if (!users) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    }
  }, [users]);

  const handleSubmit = () => console.log("handleSubmit");

  function isGreater1(value: string) {
    return value.length >= 1;
  }
  const handleSignUp = () => {
    let isValidUserData = true;
    // サインアップのロジックをここに実装する
    // サインアップが成功したら、onSignUpコールバックを呼び出して親コンポーネントに通知する

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
      // 表示テスト用Todos
      const displayTestTodos: todoType[] = [
        {id: 1, todo: "テスト1", status: 0},
        {id: 2, todo: "テスト3", status: 1},
        {id: 3, todo: "テスト3", status: 2},
      ];
      // 新しいユーザーオブジェクトを作成
      // const newUser = {username: username, password: password, todos: []};
      const newUser = {
        username: username,
        password: password,
        todos: displayTestTodos,
      };

      // 現在のユーザー情報をコピーして新しいユーザーを追加
      const updatedUserList = [...users, newUser];

      // 新しいユーザーリストをセット(これでローカルストレージにセットできる？)
      setUsers(updatedUserList);
      setLoginUser(newUser);
      handleSubmit();
      // 親コンポーネントでボタン制御をする
      onSubmit();
      onClose();
    } else {
      alert("登録エラー");
    }
  };

  return (
    <div className="sign-up-form">
      <Input
        type="text"
        m="5px"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <Input
        type="password"
        m="5px"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Input
        type="password"
        m="5px"
        placeholder="PasswordForConfirm"
        value={conPassword}
        onChange={handleConPasswordChange}
      />
      <PrimaryButton onClick={handleSignUp} text={"SignUp"} />
    </div>
  );
};

export default SignUpForm;
