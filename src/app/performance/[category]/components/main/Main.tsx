import React from "react";
import LayoutModule from "./modules/LayoutModule";
import "./main.scss";

import MainContainer from "./MainContainer";
import Title from "./Title";
import { iModuleType } from "@/types";

export default function Main({ documents }: { documents: any }) {
  return (
    <div className="main-container">
      <Title />
      <div className="main-inner">
        {documents?.map((document: iModuleType, key: number) => (
          <MainContainer key={key} document={document}>
            <LayoutModule data={document} />
          </MainContainer>
        ))}
      </div>
    </div>
  );
}
