import React, { useState, useEffect, useRef } from "react";
import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";
import io from "socket.io-client";
import { BiSend } from "react-icons/bi";
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

function Chatroom() {
  // // old chatbox before i used new chat component
  // const oldChatBox = (
  //   <Box margin="10% 25% 10% 25%">
  //     <UnorderedList listStyleType="none">{messageList}</UnorderedList>
  //     <FormControl>
  //       <InputGroup>
  //         <InputLeftElement children={<Icon as={BiSend} />} />
  //         <Input
  //           value={input}
  //           variant="filled"
  //           autoComplete="off"
  //           placeholder="Send a message"
  //           onChange={(event) => setInput(event.target.value)}
  //         />
  //         <InputRightAddon
  //           children={
  //             <Button
  //               onClick={handleClick}
  //               bg={useColorModeValue("gray.200", "gray800")}
  //             >
  //               Send
  //             </Button>
  //           }
  //         />
  //       </InputGroup>
  //     </FormControl>
  //   </Box>
  // );

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

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [recieved, setRecieved] = useState("");
  const [messageList, setMessageList] = useState([]);

  //const socket = useRef();

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.on("connection", () => {
      console.log("connected to server from React!");
    });

    socket.on("chat message", (id, msg) => {
      //setRecieved(msg);
      // setMessageList([
      //   ...messageList,
      //   <ListItem>{`${id} wrote: ${msg}`}</ListItem>,
      // ]);

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

      //window.scrollTo(0, document.body.scrollHeight);
    });
  }, []);

  const handleClick = (msg) => {
    //event.preventDefault();
    socket.emit("chat message", socket.id, msg);
    // setMessageList([
    //   ...messageList,
    //   <ListItem>{`${socket.id} wrote: ${input}`}</ListItem>,
    // ]);

    // setMessages([
    //   ...messages,
    //   {
    //     text: msg,
    //     id: socket.id,
    //     sender: {
    //       name: socket.id,
    //       uid: "sender",
    //       avatar: "https://i.ibb.co/84XMhnD/quickchat-logo-dark.png",
    //     },
    //   },
    // ]);

    // setInput("");
  };

  return (
    <>
      {console.log(messages)}
      <ChatBox messages={[...new Set(messages)]} onSubmit={handleClick} />
    </>
  );
}

export default Chatroom;
