import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./certificate.scss";

interface iCertificate {
  organization: string;
  languageLearnt: string;
  author: string[];
  date: Date;
  src: string;
  slug: string;
}
export default function Main({ documents }: { documents: iCertificate[] }) {
  return (
    <div className="certificates-container">
      <div className="certificates">
        <ul>
          {documents.map((certificate: iCertificate, key: any) => (
            <li key={key}>
              <div className="image-container">
                <Link href={`/certificates/${certificate.slug}`}>
                  <Image
                    src={`${certificate.src}`}
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
                    {certificate.author.map((author, key) => (
                      <span key={key}>
                        • {author}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="date">
                  <div>date:</div>
                  <div>{new Date(certificate.date)?.toLocaleDateString()}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
