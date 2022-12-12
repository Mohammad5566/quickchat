import React, { useState, useEffect, useRef } from "react";
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
      setRecieved(msg);
      setMessageList([
        ...messageList,
        <ListItem>{`${id} wrote: ${msg}`}</ListItem>,
      ]);

      window.scrollTo(0, document.body.scrollHeight);
    });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    socket.emit("chat message", socket.id, input);
    setMessageList([
      ...messageList,
      <ListItem>{`${socket.id} wrote: ${input}`}</ListItem>,
    ]);
    setInput("");
  };

  return (
    <>
      {console.log(messageList)}
      <UnorderedList listStyleType="none">{messageList}</UnorderedList>
      <FormControl>
        <InputGroup>
          <InputLeftElement children={<Icon as={BiSend} />} />
          <Input
            value={input}
            variant="filled"
            autoComplete="off"
            placeholder="Send a message"
            onChange={(event) => setInput(event.target.value)}
          />
          <InputRightAddon
            children={
              <Button
                onClick={handleClick}
                bg={useColorModeValue("gray.200", "gray800")}
              >
                Send
              </Button>
            }
          />
        </InputGroup>
      </FormControl>
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
