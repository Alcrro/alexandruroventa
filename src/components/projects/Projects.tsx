import Image from "next/image";
import React from "react";
import "./project.scss";
import Link from "next/link";
import { IProjectsSchema } from "@/models/projects/Projects";
export default function Projects({ projects }: { projects: any }) {
  return (
    <>
      {projects.map((project: IProjectsSchema, key: number) => (
        <div className="projects-inner" key={key}>
          <div className="head">
            <div className="title text-2xl py-4">{project.title}</div>
            <div className="title domain text-2xl py-1">
              <Link href={`https://${project.link}`} target="_blank">
                {project.link}
              </Link>
            </div>
          </div>
          <div className="body">
            <div className="image">
              <Link href={`https://${project.link}`} target="_blank">
                <Image
                  src={`/projects/${project.thumbnailPhoto}`}
                  alt="project"
                  width={1000}
                  height={1000}
                ></Image>
              </Link>
            </div>
          </div>
          <div className="footer">
            <div className="description">
              <ul>
                <li>
                  <div className="col languagesUsed">
                    <div className="prop languageTitle">
                      <div>Language used</div>
                    </div>
                    :
                    <div className="content languagesUsedList">
                      {project.languagesUsed.map((language, key) => (
                        <div key={key}>{language}</div>
                      ))}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="col githubRepository">
                    <div className="prop githubTitle">
                      <div>GitHub repository</div>
                    </div>
                    :
                    <div className="content">
                      <Link
                        href={`https://${project.gitRepository}`}
                        target="_blank"
                      >
                        <div className="underline underline-offset-4 hover:text-gray-400">
                          GIT Repository
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="col hostedOn">
                    <div className="prop hostedOnTitle">
                      <div>Hosted on</div>
                    </div>
                    :
                    <div className="content">
                      <div className="capitalize">{project.hosted}</div>
                    </div>
                  </div>
                </li>
                {project.moreDescription !== "" && (
                  <li>
                    <div className="col moreDescription">
                      <div className="prop hostedOnTitle">
                        <div>more description</div>
                      </div>
                      :
                      <div className="content">
                        <div className="capitalize">
                          {project.moreDescription}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
