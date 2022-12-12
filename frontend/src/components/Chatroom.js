import React, { useState, useEffect } from "react";
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

  const socket = io.connect(`http://localhost:3001`);
  const sendMessage = () => {
    socket.emit("chat message", socket.id, "TEST MESSAGE");
  };

  useEffect(() => {
    socket.on("chat message", (id, msg) => {
      var item = document.createElement("li");
      item.textContent = `${id} wrote: ${msg}`;
      messageList.appendChild(
        <ListItem>
          `${id} wrote: ${msg}`;
        </ListItem>
      );
      window.scrollTo(0, document.body.scrollHeight);
    });
  }, [socket, messageList]);

  return (
    <>
      {console.log(messageList)}
      <UnorderedList id="message-list">{messageList}</UnorderedList>
      <form id="form" action="">
        <input id="input" autocomplete="off" />
        <button onClick={sendMessage}>Send</button>
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
