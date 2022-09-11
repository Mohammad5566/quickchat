import React, { useState } from "react";
import {
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

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
    switch (event.target.type) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
    }
  };

  return (
    <div style={style}>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="username"
          value={username}
          placeholder="Enter your username"
          onChange={handleInputChange}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
      </FormControl>
    </div>
  );
}

export default Login;
