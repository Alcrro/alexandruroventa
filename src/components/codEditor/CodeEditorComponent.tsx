"use client";
import { useState } from "react";
import "./editor-container.scss";
import { Box } from "@chakra-ui/react";
import CodEditor from "./CodEditor";
import ChakraProv from "./ChakraProvider";
import Image from "next/image";
import RatingEditor from "./rating/RatingEditor";
import { iDocument } from "@/types";


export default function CodeEditorComponent({
  content,
  document,
  contentSD,
}: {
  content: string;
  document: iDocument[];
  contentSD: any;
}) {
  const [collapse, setCollapse] = useState(false);
  const [imageIsOpen, setImageIsOpen] = useState(false);

  const [documentContent]: any = document;
  const [documentS] = contentSD;

  const collapseEditor = () => {
    setCollapse((prev) => !prev);
  };

  const zoomImageHandler = () => {
    !imageIsOpen ? setImageIsOpen(true) : setImageIsOpen(false);
  };
  return (
    <div className="editor-container">
      <div className="header-editor">
        <div className="title">
          {documentContent?.name.charAt(0).toUpperCase() +
            documentContent?.name.slice(1)}
        </div>
        <div className="version-code">
          <span>{documentS?.version.name}: </span>
          <span>{documentS?.version.version}</span>
        </div>
      </div>

      <div className="collapse-editor " onClick={collapseEditor}>
        {collapse ? (
          <span className="cursor-pointer">Collapse Editor</span>
        ) : (
          <span className="cursor-pointer">Hide Editor</span>
        )}
      </div>
      <div
        className={`editor-inner  ${
          collapse ? "activeEditor" : "inactiveEditor"
        }`}
      >
        <Box>
          <ChakraProv>
            <CodEditor content={content} />
          </ChakraProv>
        </Box>
        <div className="rating-container">
          <RatingEditor />
        </div>
      </div>

      <div className={`more-description${imageIsOpen ? " isOpen" : ""} mt-6`}>
        <div className="image-container">
          <div className="title py-4">Explanation: </div>

          <Image
            src={`/contentImages/${documentS?.image}`}
            alt=""
            width={1000}
            height={1000}
            className={`image-bubble-sort${
              imageIsOpen ? " isOpen" : ""
            } rounded-md`}
            onClick={zoomImageHandler}
          ></Image>
        </div>
      </div>

      {imageIsOpen ? (
        <div className="wrapper-image-container">
          <Image
            src={`/contentImages/${documentS?.image}`}
            alt=""
            width={1000}
            height={1000}
            className={`image-bubble-sort${
              imageIsOpen ? " isOpen" : ""
            } rounded-md`}
            onClick={zoomImageHandler}
          ></Image>
          <div className="close">Click on image to close!</div>
        </div>
      ) : null}
    </div>
  );
}
