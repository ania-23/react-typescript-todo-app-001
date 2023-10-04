import Header from "./components/Header";
import {Navigate} from "react-router";
import {useAuth} from "./authAtom";
import {useState} from "react";
import {Box} from "@chakra-ui/react";
import {Input} from "@chakra-ui/input";

function UserSettings() {
  const {isLoggedIn, loginUser} = useAuth();
  console.log("ログイン状態", typeof isLoggedIn, isLoggedIn);

  const [newUserName, setNewUserName] = useState("");

  function handleUsernameChange() {}
  if (!isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <Box
          width="100%"
          // width={[
          //   "100%", // 0-30em
          //   "50%", // 30em-48em
          //   "25%", // 48em-62em
          //   "15%", // 62em+
          // ]}
          h="100vh"
          bgGradient="linear(to-r, orange.400, teal.200)"
        >
          <Header />
          <h2>Settings</h2>
          <p>name: {loginUser.username}</p>
          new Name
          <Input type="text" onClick={handleUsernameChange} />
        </Box>
      </>
    );
  }
}

export default UserSettings;
