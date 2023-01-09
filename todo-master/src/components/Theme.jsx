import React from "react";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
export const Theme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex mb={"-6rem"} justifyContent="right" alignItems="center">
        <Button
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          _focus={{ boxShadow: "none" }}
          w="fit-content"
        >
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </Flex>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      ></Flex>
    </div>
  );
};
