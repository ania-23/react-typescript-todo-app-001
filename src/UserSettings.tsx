import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import {UserData, STORAGE_KEY} from "./components/SignUpForm";

function UserSettings() {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    // localStorageから保存されたユーザー認証データを取得
    const storedUserData = localStorage.getItem("you");
    if (storedUserData) {
      const parsedUserData: UserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <>
      <Header />
      <h2>Settings</h2>
      <p>Name: {userData ? userData!.username : "error"}</p>
    </>
  );
}

export default UserSettings;
