import Header from "./components/Header";
import {Navigate} from "react-router";
import {useAuth} from "./authAtom";
import {useState} from "react";
import {Box} from "@chakra-ui/react";
import {Input} from "@chakra-ui/input";

function Terms() {
  return (
    <>
      <Box w="100%" h="100vh" bgGradient="linear(to-r, orange.400, teal.200)">
        <Header />
        <h2>Terms</h2>
        <p>本アプリは個人の学習目的のために作成されたアプリです。</p>
      </Box>
    </>
  );
}

export default Terms;
