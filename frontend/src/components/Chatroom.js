import React, { useState, useEffect, useRef } from "react";
import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";
import io from "socket.io-client";
import Login from "./Login";
import {
  Box,
  List,
  Icon,
  Text,
  Input,
  Avatar,
  VStack,
  Button,
  HStack,
  ListItem,
  InputGroup,
  ListIcon,
  OrderedList,
  FormControl,
  FormLabel,
  InputRightAddon,
  FormErrorMessage,
  FormHelperText,
  UnorderedList,
  useColorModeValue,
  InputLeftElement,
} from "@chakra-ui/react";

let socket = null;

function Chatroom(isLoggedIn) {
  // const userInfo = (
  //   <HStack padding="2% 2% 2% 2%" justifyContent="start">
  //     <Avatar size={"sm"} />
  //     <Text>usernamegoeshere</Text>
  //   </HStack>
  // );

  // const chatBox = (
  //   <VStack
  //     margin="10% 30% 10% 30%"
  //     boxShadow="sm"
  //     rounded="md"
  //     bg={useColorModeValue("gray.100", "gray.900")}
  //   ></VStack>
  // );

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recieved, setRecieved] = useState("");
  const [messageList, setMessageList] = useState([]);

  //const socket = useRef();

  useEffect(() => {
    socket = io("http://localhost:4000", { autoConnect: false });

    socket.on("chat session", (sessionID, userID) => {
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID;
    });

    socket.on("connection", () => {
      console.log("connected to server from React!");
    });

    socket.on("chat message", (id, msg) => {
      //setRecieved(msg);
      // setMessageList([
      //   ...messageList,
      //   <ListItem>{`${id} wrote: ${msg}`}</ListItem>,
      // ]);

      if (id !== socket.id) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            text: msg,
            id: id,
            sender: {
              name: id,
              uid: "reciever",
              avatar: "https://i.ibb.co/WtSfVpz/quickchat-logo.png",
            },
          },
        ]);
      }

      //window.scrollTo(0, document.body.scrollHeight);
    });
  }, []);

  const handleClick = (msg) => {
    socket.emit("chat message", socket.id, msg);
    setMessages([
      ...messages,
      {
        text: msg,
        id: socket.id,
        sender: {
          name: socket.id,
          uid: "user1",
          avatar: "https://i.ibb.co/84XMhnD/quickchat-logo-dark.png",
        },
      },
    ]);

    // setInput("");
  };

  const user = {
    uid: "user1",
  };

  const sessionID = localStorage.getItem("sessionID");
  if (sessionID) {
    socket.auth = { sessionID };
    socket.connect();
  }

  return (
    <>
      {console.log(messages)}
      {isLoggedIn ? (
        <ChatBox messages={messages} user={user} onSubmit={handleClick} />
      ) : (
        <Login />
      )}
    </>
  );
}

export default Chatroom;
