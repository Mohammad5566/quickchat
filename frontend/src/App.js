import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Login />
    </ChakraProvider>
  );
}

export default App;
