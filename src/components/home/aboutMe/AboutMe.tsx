import React from "react";
import "./aboutMe.scss";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="about-me-inner ">
        <div className="title text-center">About Me</div>
        <div className="content dark:text-gray-200 max-w-[54rem] text-xl indent-11 leading-8">
          After graduating from college with a focus on Automation and Applied
          Informatics, but without earning a degree, I spent a few years working
          at my first job. In addition to my primary responsibilities, I also
          took on tasks such as resolving technology problems on various devices
          (e.g., PCs/laptops, printers, portable mobile terminal lasers) and
          creating small programs in Microsoft Excel to perform calculations.
          <div>
            Eventually, I decided to pursue my passion for programming more
            seriously. I enrolled in a coding bootcamp and learned{" "}
            <span className="font-semibold"> full-stack web development </span>.
            My favorite part of programming is watching each component of my
            project grow and become a useful tool for others and solving
            problem. I love the feeling of finally figuring out a solution to a
            problem. My core stack is
            <span className="font-semibold dark:text-white ">
              {" "}
              React, Next.js, Node.js and MongoDB
            </span>
            . I am also familiar with TS, SQL, Tailwind and so on,{" "}
            <Link
              href="/skills"
              className="underline underline-offset-4 hover:text-blue-500 italic"
            >
              see more
            </Link>
            . I am always looking to learn new technologies. i am currently
            looking for a full-time position as a software developer.
          </div>
          <div>
            Outside of coding, I prioritize fitness, whether it's hitting the
            gym or spending quality time with my dog or cat. I have a strong
            passion for continuous learning and am currently exploring System
            Design concepts.
          </div>
        </div>
      </div>
    </div>
  );
}
