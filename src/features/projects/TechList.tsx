"use client";
import { useRef, useState, useEffect } from "react";
import TechBadge from "./TechBadge";

export default function TechList({ techs }: { techs: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setOverflows(el.scrollHeight > el.clientHeight + 2);
  }, []);

  return (
    <div className="project-tech-wrapper">
      <div
        ref={containerRef}
        className={`project-tech${expanded ? "" : " project-tech--collapsed"}`}
      >
        {techs.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>
      {overflows && (
        <button
          className="project-tech-toggle"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : `Show all ${techs.length}`}
        </button>
      )}
    </div>
  );
}
