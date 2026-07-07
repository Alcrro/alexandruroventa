"use client";
import { techColors, fallbackColor } from "./techColors";
import { techIconMap } from "./techIcons";

export default function TechBadge({ tech }: { tech: string }) {
  const color = techColors[tech] ?? fallbackColor;
  const def = techIconMap[tech];
  const Icon = def?.icon;
  const abbrev = def?.abbrev ?? tech.slice(0, 2).toUpperCase();

  return (
    <span className="tech-badge" style={{ background: color.bg, color: color.text }}>
      <span className="tech-badge-icon">
        {Icon ? <Icon size={11} /> : <span className="tech-badge-abbrev">{abbrev}</span>}
      </span>
      {tech}
    </span>
  );
}
