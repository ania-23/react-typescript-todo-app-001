import React, {useState} from "react";
import LoginForm from "./LoginForm";
import PrimaryButton from "./atoms/PrimaryButton";
import {Link, Navigate, useNavigate} from "react-router-dom";
import SignUpForm from "./SignUpForm";

const Header: React.FC = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false); // ログインフォームの表示状態
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false); // サインアップフォームの表示状態
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態

  const navigate = useNavigate();

  // ログインボタンをクリックしたときにモーダルを表示
  const handleLoginButtonClick = () => {
    setIsSignUpFormVisible(false);
    setIsLoginFormVisible(true);
  };

  // ログインが成功したときの処理
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginFormVisible(false);
  };
  // サインアップが成功したときの処理
  const handleSignUpSuccess = () => {
    // そのままログイン
    setIsLoggedIn(true);
    setIsSignUpFormVisible(false);
  };

  // ログアウト処理
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignUpButtonClick = () => {
    setIsLoginFormVisible(false);
    setIsSignUpFormVisible(true);
  };

  const handleSettings = () => {
    navigate("/react-typescript-todo-app-001/settings");
  };
  return (
    <header>
      <h1>
        <Link to={`/react-typescript-todo-app-001/`}>Trello?</Link>
      </h1>
      <div className="login">
        {/** ログインボタンを押下した場合*/}
        {isLoginFormVisible && <LoginForm onLogin={handleLoginSuccess} />}
        {/* ログインしていない場合にログインボタンを表示 */}
        {!isLoggedIn && (
          <PrimaryButton text="Login" onClick={handleLoginButtonClick} />
        )}
        {/** サインアップボタンを押下した場合*/}
        {isSignUpFormVisible && <SignUpForm onSignUp={handleSignUpSuccess} />}
        {/* ログインしていない場合にSignUpボタンを表示 */}
        {!isLoggedIn && (
          <PrimaryButton text="SignUp" onClick={handleSignUpButtonClick} />
        )}

        {/* ログイン状態に応じてログアウトボタンを表示 */}
        {isLoggedIn && <PrimaryButton text="Logout" onClick={handleLogout} />}
        {isLoggedIn && (
          <PrimaryButton text="Settings" onClick={handleSettings} />
        )}
      </div>
    </header>
  );
};

export default Header;
