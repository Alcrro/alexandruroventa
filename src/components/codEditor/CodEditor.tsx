import { Editor } from "@monaco-editor/react";
import React from "react";
import LanguageSelector from "./LanguageSelector";

export default function CodEditor({ content }: { content?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "50rem",
        padding: "2.5rem",
        color: "#000",
      }}
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
    </div>
  );
}
