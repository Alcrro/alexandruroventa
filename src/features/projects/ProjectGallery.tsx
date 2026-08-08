"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Props {
  screenshots: string[];
  ogImageUrl: string;
  title: string;
}

export default function ProjectGallery({ screenshots, ogImageUrl, title }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [heroSrc, setHeroSrc] = useState(screenshots[0]);

  const goTo = useCallback(
    (idx: number) => {
      setActiveIdx(idx);
      setHeroSrc(screenshots[idx]);
    },
    [screenshots]
  );

  const prev = () => goTo((activeIdx - 1 + screenshots.length) % screenshots.length);
  const next = () => goTo((activeIdx + 1) % screenshots.length);

  useEffect(() => {
    if (screenshots.length <= 1) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo((activeIdx - 1 + screenshots.length) % screenshots.length);
      else if (e.key === "ArrowRight") goTo((activeIdx + 1) % screenshots.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo, activeIdx, screenshots.length]);

  if (screenshots.length === 1) {
    return (
      <div className="project-detail-thumb">
        <Image
          src={heroSrc}
          alt={title}
          width={1200}
          height={675}
          className="project-detail-img"
          priority
          onError={() => setHeroSrc(ogImageUrl)}
        />
      </div>
    );
  }

  return (
    <div className="project-gallery">
      <div className="project-gallery-hero">
        <button
          className="project-gallery-nav project-gallery-nav--prev"
          onClick={prev}
          aria-label="Previous screenshot"
        >
          <i className="bi bi-chevron-left" />
        </button>

        <Image
          src={heroSrc}
          alt={`${title} — screenshot ${activeIdx + 1}`}
          width={1200}
          height={675}
          className="project-gallery-hero-img"
          priority
          onError={() => setHeroSrc(ogImageUrl)}
        />

        <button
          className="project-gallery-nav project-gallery-nav--next"
          onClick={next}
          aria-label="Next screenshot"
        >
          <i className="bi bi-chevron-right" />
        </button>

        <span className="project-gallery-counter">
          {activeIdx + 1} / {screenshots.length}
        </span>
      </div>

      <div className="project-gallery-thumbs">
        {screenshots.map((url, idx) => (
          <button
            key={idx}
            className={`project-gallery-thumb${activeIdx === idx ? " active" : ""}`}
            onClick={() => goTo(idx)}
            aria-label={`Screenshot ${idx + 1}`}
          >
            <Image
              src={url}
              alt={`${title} ${idx + 1}`}
              width={160}
              height={90}
              className="project-gallery-thumb-img"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
