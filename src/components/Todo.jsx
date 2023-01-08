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
  console.log(logUserData);

  useEffect(() => {
    getLogUserData();
  }, [logUserData]);

  const handleTask = () => {
    if (logUserData.todo?.length < 6) {
      logUserData.todo?.push(logTodo);
      try {
        axios.patch(`https://mock-car-api.onrender.com/users/${user_id}`, {
          todo: logUserData.todo,
        });
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
        .then((res) => console.log(res.data));
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

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
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
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    Good to see you here <br />
                    Your total task for Today :{" "}
                    <span>{logUserData.todo?.length}</span>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    alignItems="flex-start"
                  >
                    <Button onClick={handleLogOut}>LOGOUT</Button>
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box height={"28rem"} bg="white" borderRadius="lg">
                  <Box m={10} w={80} color="#0B0E3F">
                    <Box height={"5rem"}>
                      {logUserData.todo?.map((el, i) => (
                        <Box
                          alignItems={"center"}
                          justifyContent={"space-evenly"}
                        >
                          <Box
                            padding={"3px"}
                            boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
                            mt={3}
                            borderRadius={10}
                          >
                            {" "}
                            {i + 1} : <Text as="b">{el.toUpperCase()}</Text>
                            <Box mt={"-1.5rem"}>
                              <Button
                                onClick={() => handleDelete(i)}
                                ml={"15rem"}
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
                    <VStack mt={"10rem"} spacing={3}>
                      <FormControl id="name">
                        <FormLabel>Task</FormLabel>
                        <Input
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="message"
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
