"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IGithubProject } from "@/types";
import ProjectImage from "../projects/ProjectImage";
import { BsArrowRight, BsBoxArrowUpRight } from "react-icons/bs";

const SPRING = { stiffness: 260, damping: 28 };
const MAX_TILT = 8;

interface Props {
  project: IGithubProject;
  index: number;
}

export default function FeaturedProjectCard({ project, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [MAX_TILT, -MAX_TILT]),
    SPRING
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-MAX_TILT, MAX_TILT]),
    SPRING
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "900px" }}
    >
      <motion.div
        ref={cardRef}
        className="featured-card"
        style={{ rotateX, rotateY }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="featured-card-image">
          <ProjectImage
            screenshotUrl={project.screenshotUrl}
            ogImageUrl={project.ogImageUrl}
            alt={project.title}
            width={600}
            height={338}
          />
          {project.status === "wip" && (
            <span className="featured-wip-badge">In Progress</span>
          )}
        </div>

        <div className="featured-card-body">
          <h3 className="featured-card-title">
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>

          {project.description && (
            <p className="featured-card-desc">{project.description}</p>
          )}

          <div className="featured-card-tech">
            {project.languagesUsed.slice(0, 4).map((tech) => (
              <span key={tech} className="featured-tech-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="featured-card-actions">
            <Link href={`/projects/${project.slug}`} className="featured-details-link">
              View details <BsArrowRight />
            </Link>
            {project.isDeployed && project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-live-link"
              >
                Live <BsBoxArrowUpRight />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
