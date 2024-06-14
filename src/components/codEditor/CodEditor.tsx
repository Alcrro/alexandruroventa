import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React from "react";
import LanguageSelector from "./LanguageSelector";

export default function CodEditor({ content }: { content: string }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginX={"auto"}
      maxWidth={"50rem"}
      // height={"60vh"}
    >
      <LanguageSelector />
      <Editor
        height="50rem"
        width="100%"
        language="typescript"
        defaultValue={`${content}`}
        theme="vs-dark"
      />
    </Box>
  );
}
