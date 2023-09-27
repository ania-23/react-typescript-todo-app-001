import React, {useState} from "react";
import LoginForm from "./LoginForm";
import PrimaryButton from "./PrimaryButton";

const Header: React.FC = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false); // ログインフォームの表示状態
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態

  // ログインボタンをクリックしたときにモーダルを表示
  const handleLoginButtonClick = () => {
    setIsLoginFormVisible(true);
  };

  // ログインが成功したときの処理
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginFormVisible(false);
  };

  // ログアウト処理
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignUpButtonClick = () => {
    console.log("SignUp");
  };

  return (
    <header>
      <h1>Trello?</h1>
      <div className="login">
        {/* <PrimaryButton text="Login" />
      <PrimaryButton text="SignUp" /> */}
        {/** ログインボタンを押下した場合*/}
        {isLoginFormVisible && <LoginForm onLogin={handleLoginSuccess} />}
        {/* ログインしていない場合にログインボタンを表示 */}
        {!isLoggedIn && (
          <PrimaryButton text="Login" onClick={handleLoginButtonClick} />
        )}

        {/* ログインしていない場合にSignUpボタンを表示 */}
        {!isLoggedIn && (
          <PrimaryButton text="SignUp" onClick={handleSignUpButtonClick} />
        )}

        {/* ログイン状態に応じてログアウトボタンを表示 */}
        {isLoggedIn && <PrimaryButton text="Logout" onClick={handleLogout} />}
      </div>
    </header>
  );
};

export default Header;
