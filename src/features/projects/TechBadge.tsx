import { techColors, fallbackColor } from "./techColors";

export default function TechBadge({ tech }: { tech: string }) {
  const color = techColors[tech] ?? fallbackColor;
  return (
    <span
      className="tech-badge"
      style={{ background: color.bg, color: color.text }}
    >
      {tech}
    </span>
  );
}
