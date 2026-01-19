"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AboutMeContent() {
  const pathname = usePathname();

  return (
    <>
      <div className={`title text-center`}>About Me</div>
      <div
        className={`content ${
          pathname.endsWith("me") ? "second-layer" : "main-layer"
        } dark:text-gray-200 max-w-[54rem] text-xl indent-11 leading-8`}
      >
        <p>
              My passion for technology began at the age of 12, when I had my
              first interactions with a computer. By 14, I took my first steps
              into web development, modifying HTML and CSS in Adobe Dreamweaver,
              experimenting with scripts and templates for Counter-Strike 1.6
              servers. This early curiosity taught me how to combine creativity
              with logic and the importance of attention to detail in every
              project.
            </p>
            <p>
              I attended the High School of Electrotechnics and Electronics,
              where I deepened my technical foundations, and later the Faculty
              of Automation and Applied Informatics, where I studied C++ and
              Oracle, developing my programming skills and understanding of
              complex systems.
            </p>
            <p>
              Today, I combine the practical experience I have gained since
              adolescence with solid academic knowledge to provide efficient
              software solutions tailored to clients’ needs. Whether it is web
              development, application optimization, or complex automation
              projects, my approach is built on professionalism, attention to
              detail, and a passion for technology that has defined me for over
              18 years.
            </p>
            <p>
              I am always ready to turn ideas into functional projects and
              deliver value through innovation and technical expertise.
            </p>
      </div>
    </>
  );
}

