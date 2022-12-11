import React, { useState } from "react";
import {
  Box,
  Text,
  Avatar,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

function Chatroom() {
  const userInfo = (
    <HStack padding="2% 2% 2% 2%" justifyContent="start">
      <Avatar size={"sm"} />
      <Text>usernamegoeshere</Text>
    </HStack>
  );

  const chatBox = <></>;

  return (
    <Box
      margin="10% 30% 10% 30%"
      boxShadow="sm"
      rounded="md"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      {userInfo}
    </Box>
  );
}

export default Chatroom;
