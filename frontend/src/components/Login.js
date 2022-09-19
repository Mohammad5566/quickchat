import React, { useState } from "react";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

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

  const inputPrompts = ["username", "password"].map((type) => (
    <>
      <FormLabel>{type.charAt(0).toUpperCase() + type.slice(1)}</FormLabel>
      <Input
        type={type}
        name={type}
        onChange={handleInputChange}
        placeholder={`Enter your ${type}`}
        value={type === "username" ? username : password}
      />
    </>
  ));

  const [isViewPassword, setViewPassword] = useState(false);
  const viewPassword = (
    <Button onClick={() => setViewPassword(!isViewPassword)}>
      {isViewPassword ? <ViewIcon /> : <ViewOffIcon />}
    </Button>
  );

  return (
    <div style={style}>
      <FormControl isRequired>
        {inputPrompts[0]}

        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={isViewPassword ? "text" : "password"}
            name="password"
            onChange={handleInputChange}
            placeholder={`Enter your password`}
            value={password}
          />
          <InputRightElement children={viewPassword} />
        </InputGroup>
      </FormControl>
    </div>
  );
}

export default Login;
