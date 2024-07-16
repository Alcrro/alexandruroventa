import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./certificate.scss";
import { iCertificate } from "@/types";
import Pagination from "./pagination/Pagination";

interface IDoc {
  doc: iCertificate[];
  totalDocuments: [];
  page: 1;
}

export default function Main({ documents }: { documents: iCertificate[] }) {
  let allDocuments: any = [];
  let totalProducts;
  let firstPage;
  documents?.flatMap(
    (item: any) =>
      allDocuments.push(item.doc) &
      (totalProducts = item.totalDocuments) &
      (firstPage = item.page)
  );



  return (
    <div className="certificates-inner sm:break-all text-center">
      <div className="certificates">
        <ul className="ul-certificate">
          {allDocuments.flat(1).map((certificate: iCertificate, key: any) => (
            <li key={key}>
              <div className="image-container">
                <Link href={`/certificates/${certificate.slug}`}>
                  <Image
                    src={certificate.src}
                    alt="certificate"
                    width={1000}
                    height={1000}
                  />
                </Link>
              </div>
              <div className="description-container">
                <div className="organization">
                  <div>Organization: </div>
                  <div>{certificate.organization}</div>
                </div>
                <div className="language-learnt">
                  <div>Language learnt:</div>
                  <div>{certificate.languageLearnt}</div>
                </div>
                <div className="author">
                  <div>Author:</div>
                  <div>
                    {certificate?.author?.map((author, key) => (
                      <span key={key}>
                        • {author}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Pagination totalProducts={totalProducts} currentPage={firstPage} />
      </div>
    </div>
  );
}
