"use client";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import "./performance.scss";

export default function MonacoEditor({ code }: { code?: string }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="perf-editor-wrap">
      <Editor
        height="500px"
        defaultLanguage="typescript"
        value={code ?? ""}
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        options={{
          readOnly: true,
          wordWrap: "on",
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          folding: false,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
}
