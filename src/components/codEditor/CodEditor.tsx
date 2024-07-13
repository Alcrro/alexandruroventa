import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React from "react";
import LanguageSelector from "./LanguageSelector";

export default function CodEditor({ content }: { content?: string }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginX={"auto"}
      maxWidth={"50rem"}
      padding={10}
      // height={"60vh"}
      color={"#000"}
    >
      <LanguageSelector />
      <Editor
        height={"50rem"}
        width="100%"
        language="typescript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
        }}
      />
    </Box>
  );
}
