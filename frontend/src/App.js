import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Chatroom />
      {/*<Login />*/}
    </ChakraProvider>
  );
}

export default App;
