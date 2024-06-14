import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function LanguageSelector() {
  return (
    <Box
      display={"block"}
      backgroundColor={"black"}
      color={"white"}
      paddingX={".5rem"}
      marginY={"4px"}
      borderRadius={"10px"}
      boxShadow={"0px 0px 1px 1px rgb(111, 108, 128)"}
      marginRight="auto"
    >
      <Text>TypeScript</Text>
    </Box>
  );
}
