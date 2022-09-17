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

  return (
    <div style={style}>
      <FormControl isRequired>{inputPrompts}</FormControl>
    </div>
  );
}

export default Login;
