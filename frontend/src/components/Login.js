import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ArrowRightIcon } from "@chakra-ui/icons";

function Login() {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    left: "50%",
    top: "50%",
    paddingTop: "500px",
    transform: "translate(-50%, -50%)",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
    }
  };

  const inputPrompts = ["username", "password"].map((type) => <></>);

  const [isViewPassword, setViewPassword] = useState(false);
  const viewPassword = (
    <Button onClick={() => setViewPassword(!isViewPassword)}>
      {isViewPassword ? <ViewIcon /> : <ViewOffIcon />}
    </Button>
  );

  return (
    <div style={style}>
      <VStack spacing="16px">
        <FormControl isRequired>
          <VStack align="stretch">
            <FormLabel>Username</FormLabel>
            <Input
              type="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder={"Enter your username"}
            />

            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder={"Enter your password"}
                type={isViewPassword ? "text" : "password"}
              />
              <InputRightElement children={viewPassword} />
            </InputGroup>
          </VStack>
        </FormControl>

        <Button w="100%">
          <Box>
            Login <ArrowRightIcon w="3" h="3" />
          </Box>
        </Button>
      </VStack>
    </div>
  );
}

export default Login;
