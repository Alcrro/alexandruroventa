import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "./editorTheme";


export default function ChakraProv({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
