"use client";
import React from "react";
import "./contentCode.scss";
import CodeEditorComponent from "@/components/codEditor/CodeEditorComponent";
import { Box } from "@chakra-ui/react";
import ChakraProv from "@/components/codEditor/ChakraProvider";
import CodEditor from "@/components/codEditor/CodEditor";
export default function ContentCode() {
  return (
    <div className="add-content-code-container">
      <div className="add-content-code">
        <Box>
          <ChakraProv>
            <CodEditor content={""} />
          </ChakraProv>
        </Box>
      </div>
    </div>
  );
}
