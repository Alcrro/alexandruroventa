"use client";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "./performance.scss";

const LANGUAGE_MAP: Record<string, string> = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  py: "python",
  css: "css",
  html: "html",
  go: "go",
  golang: "go",
  java: "java",
  "c++": "cpp",
  cpp: "cpp",
  c: "c",
  rust: "rust",
  php: "php",
  ruby: "ruby",
  sql: "sql",
  bash: "shell",
  shell: "shell",
  kotlin: "kotlin",
  swift: "swift",
  scala: "scala",
  yaml: "yaml",
  json: "json",
  xml: "xml",
};

function detectLanguage(category: string): string {
  return LANGUAGE_MAP[category.toLowerCase()] ?? "typescript";
}

export default function MonacoEditor({
  code,
  category,
}: {
  code?: string;
  category?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="perf-editor-wrap">
      <Editor
        height="500px"
        defaultLanguage={detectLanguage(category ?? "")}
        value={code ?? ""}
        theme={mounted ? (resolvedTheme === "dark" ? "vs-dark" : "light") : "light"}
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
