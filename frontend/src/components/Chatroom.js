import React, { useState } from "react";
import { Box, Avatar, VStack, HStack } from "@chakra-ui/react";

function Chatroom() {
  return (
    <Box>
      <VStack>
        <HStack>
          <Avatar size={"sm"} />
        </HStack>
      </VStack>
    </Box>
  );
}

export default Chatroom;
