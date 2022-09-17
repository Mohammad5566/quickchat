import React from "react";

import {
  Box,
  Flex,
  Avatar,
  Link,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLink = ({ children }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Link>
  );

  const themeIcon = (
    <Button
      onClick={toggleColorMode}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );

  const quickchatLogo = (
    <Image
      boxSize="50px"
      src={
        colorMode === "light"
          ? "https://i.ibb.co/WtSfVpz/quickchat-logo.png"
          : "https://i.ibb.co/84XMhnD/quickchat-logo-dark.png"
      }
      alt="Quickchat Logo"
    />
  );

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {themeIcon}

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>

          {quickchatLogo}
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
