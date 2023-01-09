import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Progress,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
////////////////////////////////////////////////////
export function Todo() {
  const [logUserData, setLogUserData] = useState([]);
  const [logTodo, setLogTodo] = useState("");
  let user_id = localStorage.getItem("userID");
  let navigate = useNavigate();
  const toast = useToast();
  /////////////////////////////////////
  const getLogUserData = () => {
    try {
      axios
        .get(`https://mock-car-api.onrender.com/users/${user_id}`)
        .then((res) => setLogUserData(res.data))
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  //console.log(logUserData);

  useEffect(() => {
    getLogUserData();
  }, [logUserData]);

  const handleTask = () => {
    // console.log(logUserData.todo?.length)
    if (logUserData.todo?.length < 5) {
      logUserData.todo?.push(logTodo);
      try {
        axios
          .patch(`https://mock-car-api.onrender.com/users/${user_id}`, {
            todo: logUserData.todo,
          })
        toast({
          title: `Congratulations ${logUserData.username}`,
          description: `You have successfully added One task`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast({
        title: `Hold On !!`,
        description: `Your Daily Task limit Exceded !!!`,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("userID");
    navigate("/login");
  };

  const handleDelete = (i) => {
    logUserData.todo.splice(i, 1);
    try {
      axios
        .patch(`https://mock-car-api.onrender.com/users/${user_id}`, {
          todo: logUserData.todo,
        })
       
        .then((res) => console.log("are you happy?"));
      toast({
        title: `Hello ${logUserData.username}`,
        description: "You have successfully Deleted One task",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //console.log(progress)
  ///////////////////////////////////////
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  return (
    <Container maxW="full" mt={6} centerContent overflow="hidden">
      <Flex>
        <Box
          // border={"1px solid red"}
          w={["130%", "159%", "270%"]}
          //boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          borderRadius="lg"
          m={"auto"}
          p={{ sm: 7, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  Hello !!
                  <Heading>{logUserData.username}</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  Date : <Text as={"b"}>{today}</Text>
                  <br />
                  <Text
                    as={"b"}
                    cursor={"pointer"}
                    onClick={() => navigate("/")}
                    color={"blue.400"}
                  >
                    {" "}
                    Home
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    Good to see you here <br />
                    Your total task for Today :{" "}
                    <span>{logUserData.todo?.length}</span>
                  </Box>
                  <Box>
                    <Text> Tasks in Progress : </Text>
                    <Progress
                      mt={3}
                      colorScheme="green"
                      size="sm"
                      hasStripe
                      value={logUserData.todo?.length*20}
                    />{" "}
                    {logUserData.todo?.length*20}%
                  </Box>
                  <HStack
                    mt={{ sm: 5, lg: 10, md: 10 }}
                    spacing={5}
                    alignItems="flex-start"
                  >
                    <Button onClick={handleLogOut}>LOGOUT</Button>
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box
                  height={"28rem"}
                  w={["100%", "150%", "180%"]}
                  bg="white"
                  borderRadius="lg"
                  mt={["-3rem", "0", "0"]}
                >
                  <Box m={10} w={["80%", "70%", "80%"]} color="#0B0E3F">
                    <Box height={"5rem"} ml={["-2rem", "-1rem", "-2rem"]}>
                      {logUserData.todo?.map((el, i) => (
                        <Box
                          alignItems={"center"}
                          justifyContent={"space-evenly"}
                          display={"flex"}
                        >
                          <Box
                            padding={"3px"}
                            boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
                            borderRadius={10}
                            w={["111%", "130%", "100%"]}
                            ml={["0.5rem", "2rem", "1rem"]}
                            mt={["12px", "12px", "12px"]}
                          >
                            {" "}
                            {i + 1} : <Text as="b">{el.toUpperCase()}</Text>
                            <Box mt={"-1.5rem"} textAlign={"center"}>
                              <Button
                                onClick={() => handleDelete(i)}
                                ml={["10rem", "12rem", "15rem"]}
                                size="xs"
                                colorScheme="blue"
                              >
                                DELETE
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    <VStack
                      mt={"10rem"}
                      spacing={3}
                      ml={["-1.5rem", "-1rem", "-1rem"]}
                    >
                      <FormControl id="name">
                        <FormLabel>Task</FormLabel>
                        <Input
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="Enter Short Task here"
                          onChange={(e) => setLogTodo(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          onClick={handleTask}
                        >
                          Add New Task
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
