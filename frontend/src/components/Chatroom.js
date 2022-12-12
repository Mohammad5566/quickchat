import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import {
  Box,
  List,
  Text,
  Avatar,
  VStack,
  HStack,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";

function Chatroom() {
  const userInfo = (
    <HStack padding="2% 2% 2% 2%" justifyContent="start">
      <Avatar size={"sm"} />
      <Text>usernamegoeshere</Text>
    </HStack>
  );

  const chatBox = (
    <VStack
      margin="10% 30% 10% 30%"
      boxShadow="sm"
      rounded="md"
      bg={useColorModeValue("gray.100", "gray.900")}
    ></VStack>
  );

  let messageList = [];
  const [input, setInput] = useState("");
  const [recieved, setRecieved] = useState("");

  const socket = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    socket.current.emit("chat message", socket.id, input);
    setInput("");
  };

  useEffect(() => {
    socket.current = io("http://localhost:4000");

    socket.current.on("connection", () => {
      console.log("connected to server from React!");
    });

    socket.current.on("chat message", (id, msg) => {
      setRecieved(msg);
      var item = document.createElement("li");
      item.textContent = `${id} wrote: ${msg}`;
      messageList.appendChild(
        <ListItem>
          `${id} wrote: ${msg}`;
        </ListItem>
      );
      window.scrollTo(0, document.body.scrollHeight);
    });
  }, [messageList]);

  return (
    <>
      {console.log(messageList)}
      <UnorderedList id="message-list">{messageList}</UnorderedList>
      <form id="form" action="">
        <input id="input" onChange={(event) => setInput(event.target.value)} />
        <button onClick={handleClick}>Send</button>
        {recieved}
      </form>
    </>
  );
}

//   margin="10% 30% 10% 30%"
//   boxShadow="sm"
//   rounded="md"
//   bg={useColorModeValue("gray.100", "gray.900")}
// >
//   {userInfo}
//

export default Chatroom;
