import Image from "next/image";
import React from "react";
import "./project.scss";
import Link from "next/link";
export default function Projects() {
  return (
    <>
      <div className="head">
        <div className="title text-2xl py-4">Gym website</div>
        <div className="title domain text-2xl py-1">
          <Link href={"https://primagym.lucruri-utile.ro"} target="_blank">
            primagym.lucruri-utile.ro
          </Link>
        </div>
      </div>
      <div className="body">
        <div className="image">
          <Link href={"https://primagym.lucruri-utile.ro"} target="_blank">
            <Image
              src={"/projects/projects2.png"}
              alt="project"
              width={1000}
              height={1000}
            ></Image>
          </Link>
          <div className="description">
            <ul>
              <li>
                <div className="dev">
                  <span>Next.JS</span>
                  <span>TypeScript</span>
                  <span>Tailwind</span>
                  <span>HTML</span>
                  <span>SCSS</span>

                  <span>
                    <Link
                      href={"https://github.com/Alcrro/primagymproject"}
                      target="_blank"
                      className="underline underline-offset-4 hover:text-gray-400"
                    >
                      GIT Repository
                    </Link>
                  </span>
                </div>
              </li>
            </ul>
            <span className="hosted">
              Hosted on: <span className="block">Shared Host</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
