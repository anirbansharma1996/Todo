import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Signup } from "./Signup";
import { Landing } from "./Landing";
///////////////////////////////////////////
export function Login() {
  const [logemail, setLogEmail] = useState("");
  const [logpassword, setLogPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const [render, setRender] = useState(false);
  ///////////////////////////////

  const getUserData = () => {
    try {
      axios
        .get("https://mock-car-api.onrender.com/users")
        .then((res) => setUserData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  // //console.log(userData);

  useEffect(() => {
    getUserData();
    setRender(true);
  }, [userData]);

  const handleTodo = () => {
    if (logemail == "" && logpassword == "") {
      toast({
        title: "Please fill the Details",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } else {
      let check = userData.find((el) => el.email == logemail);
      if (check && check) {
        if (check.password == logpassword) {
          navigate("/todo");
          localStorage.setItem("userID", check.id);
          toast({
            title: "Login Successful.",
            description: "You've successfuly loged in.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Wrong Password.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Invalid Details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setLogEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setLogPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <NavLink to="/signup" component={<Signup />}>
                  <Link color={"blue.400"}>Sign up</Link>
                </NavLink>
                <NavLink to="/" component={<Landing />}>
                  <Link color={"blue.400"}>Home</Link>
                </NavLink>
              </Stack>

              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleTodo}
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
