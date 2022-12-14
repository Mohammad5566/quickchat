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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recieved, setRecieved] = useState("");
  const [messageList, setMessageList] = useState([]);

  const usersList = useRef([]);

  useEffect(() => {
    socket = io("http://localhost:4000");

    // socket.on("users", (users) => {
    //   users.forEach((user) => {
    //     user.self = user.userID === socket.id;
    //   });
    //   usersList.current = users;
    // });

    // socket.on("user connected", (user) => {
    //   usersList.push(user);
    // });

    socket.on("chat session", (sessionID, userID) => {
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID;
    });

    socket.on("chat message", ({ id, msg, username }) => {
      if (id !== socket.id && username !== localStorage.getItem(username)) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            text: msg,
            id: id,
            sender: {
              name: username,
              uid: "reciever",
              avatar: "https://i.ibb.co/84XMhnD/quickchat-logo-dark.png",
            },
          },
        ]);
      }
    });
  }, []);

  const handleClick = (msg) => {
    socket.emit("chat message", {
      id: socket.id,
      msg: msg,
      username: localStorage.getItem("username"),
    });
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        text: msg,
        id: socket.id,
        sender: {
          name: localStorage.getItem("username"),
          uid: "user1",
          avatar: "https://i.ibb.co/WtSfVpz/quickchat-logo.png",
        },
      },
    ]);
  };

  const user = {
    uid: "user1",
  };

  // const sessionID = localStorage.getItem("sessionID");
  // if (sessionID) {
  //   socket.auth = { sessionID };
  //   socket.connect();
  // }

  return (
    <>
      {console.log(messages)}
      <ChatBox messages={messages} user={user} onSubmit={handleClick} />
    </>
  );
}

export default Chatroom;
