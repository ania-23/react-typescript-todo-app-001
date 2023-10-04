import React, {useState} from "react";
import PrimaryButton from "./atoms/PrimaryButton";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
  STORAGE_KEY_IS_LOGGEDIN,
  STORAGE_KEY_LOGIN_USER,
  useAuth,
} from "../authAtom";
import PrimaryButtonOutline from "./atoms/PrimaryButtonOutline";
import {Heading} from "@chakra-ui/react";
import {ModalForm} from "../ModalForm";

const Header: React.FC = () => {
  // const [isLoginFormVisible, setIsLoginFormVisible] = useState(false); // ログインフォームの表示状態
  // const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false); // サインアップフォームの表示状態
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態
  const {isLoggedIn, login, logout, loginUser, setLoginUser} = useAuth();

  // useEffectでログイン状態をローカルストレージから持ってくる。
  // useEffect(() => {
  // Save user data to localStorage whenever it changes
  // const storedIsLoggedIn = localStorage.getItem(STORAGE_KEY_IS_LOGGEDIN);
  // if (isLoggedIn) {
  // const parsedIsLoggedIn = JSON.parse(storedIsLoggedIn);
  // console.log("ログインしてる");
  // if (parsedIsLoggedIn) {
  //   login();
  //   const storedLoginUser = localStorage.getItem(STORAGE_KEY_LOGIN_USER);
  //   if (storedLoginUser) {
  //     const parsedUser: UserData = JSON.parse(storedLoginUser);
  //     setLoginUser(parsedUser);
  //   }
  // } else {
  //   // logout();
  // }
  //   }
  // }, []);
  // useEffect(() => {
  //   // Save user data to localStorage whenever it changes
  //   const storedIsLoggedIn = localStorage.getItem(STORAGE_KEY_IS_LOGGEDIN);
  //   if (storedIsLoggedIn) {
  //     const parsedIsLoggedIn = JSON.parse(storedIsLoggedIn);
  //     if (parsedIsLoggedIn) {
  //       login();
  //       const storedLoginUser = localStorage.getItem(STORAGE_KEY_LOGIN_USER);
  //       if (storedLoginUser) {
  //         const parsedUser: UserData = JSON.parse(storedLoginUser);
  //         setLoginUser(parsedUser);
  //       }
  //     } else {
  //       // logout();
  //     }
  //   }
  // }, []);

  // ログインが成功したときの処理
  const handleLoginSuccess = () => {
    login();
    // setIsLoginFormVisible(false);
  };
  // サインアップが成功したときの処理
  const handleSignUpSuccess = () => {
    // そのままログイン
    login();
    // setIsSignUpFormVisible(false);
  };

  // ログアウト処理
  const handleLogout = () => {
    localStorage.setItem(STORAGE_KEY_IS_LOGGEDIN, JSON.stringify(false));
    localStorage.setItem(STORAGE_KEY_LOGIN_USER, JSON.stringify(null));
    logout();
    console.log(isLoggedIn);
  };

  const navigate = useNavigate();
  const handleSettings = () => {
    // パラメータ
    navigate("/settings");
  };
  const location = useLocation();
  const isSettingPage =
    location.pathname === "/react-typescript-todo-app-001/settings";

  return (
    <header>
      <Heading as="h1" size="xl" noOfLines={1}>
        <Link to={`/`}>Trello?</Link>
      </Heading>

      <div className="login">
        {isLoggedIn && (
          <Heading pr="10px" as="h2" size="xl" noOfLines={1}>
            This is {loginUser?.username}'s Todo list
          </Heading>
        )}
        {/* ログインしていない場合にログインボタンとサインアップボタンを表示 */}
        {/* ボタン押下でモーダル表示*/}
        {!isLoggedIn && (
          <ModalForm onSubmit={handleLoginSuccess} text={"Login"} />
        )}
        {!isLoggedIn && (
          <ModalForm onSubmit={handleSignUpSuccess} text={"SignUp"} />
        )}

        {/* ログイン状態に応じてログアウトボタンを表示 */}
        {isLoggedIn && (
          <PrimaryButtonOutline text="Logout" onClick={handleLogout} />
        )}
        {isLoggedIn && !isSettingPage && (
          <PrimaryButton text="Settings" onClick={handleSettings} />
        )}
      </div>
    </header>
  );
};

export default Header;
