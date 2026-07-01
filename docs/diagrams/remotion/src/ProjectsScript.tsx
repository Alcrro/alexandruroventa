import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";

const C = {
  bg: "#0d1117",
  surface: "#161b22",
  elevated: "#21262d",
  border: "#30363d",
  text: "#f1f5f9",
  muted: "#94a3b8",
  accent: "#38bdf8",
  green: "#3fb950",
  orange: "#f0883e",
  purple: "#bc8cff",
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const fi = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);
const fo = (f: number, a: number, b: number) => interpolate(f, [a, b], [1, 0], clamp);

// ─── script data ──────────────────────────────────────────────────────────────

type Style = "hero" | "normal" | "accent" | "code" | "muted" | "bullet";

interface Line { text: string; style?: Style; }
interface Scene { start: number; end: number; label: string; lines: Line[]; }

// 1200 frames = 40s @ 30fps
const SCENES: Scene[] = [
  {
    start: 0, end: 90, label: "01 / 08",
    lines: [
      { text: "your projects.", style: "hero" },
      { text: "always fresh.", style: "accent" },
    ],
  },
  {
    start: 90, end: 255, label: "02 / 08",
    lines: [
      { text: "Most portfolios go stale.", style: "normal" },
      { text: "You update them manually —", style: "muted" },
      { text: "or you don't.", style: "muted" },
    ],
  },
  {
    start: 255, end: 435, label: "03 / 08",
    lines: [
      { text: "This one syncs with GitHub", style: "normal" },
      { text: "automatically.", style: "accent" },
      { text: "Tag a repo  portfolio  → it appears.", style: "code" },
    ],
  },
  {
    start: 435, end: 615, label: "04 / 08",
    lines: [
      { text: "A filterable grid of projects.", style: "normal" },
      { text: "Filter by tech stack.", style: "muted" },
      { text: "Browse thumbnails. Read descriptions.", style: "muted" },
    ],
  },
  {
    start: 615, end: 795, label: "05 / 08",
    lines: [
      { text: "Each project is checked:", style: "normal" },
      { text: "→  is it deployed?", style: "bullet" },
      { text: "→  is it still in progress?", style: "bullet" },
    ],
  },
  {
    start: 795, end: 975, label: "06 / 08",
    lines: [
      { text: "Click any project →", style: "normal" },
      { text: "full detail page.", style: "accent" },
      { text: "Roadmap · Progress · What's next.", style: "muted" },
    ],
  },
  {
    start: 975, end: 1125, label: "07 / 08",
    lines: [
      { text: "Built with", style: "muted" },
      { text: "Next.js 14 · GitHub API · Framer Motion", style: "code" },
      { text: "Zero manual updates after deploy.", style: "normal" },
    ],
  },
  {
    start: 1125, end: 1200, label: "08 / 08",
    lines: [
      { text: "Projects feature.", style: "hero" },
      { text: "alexandru-roventa.ro", style: "accent" },
    ],
  },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function lineColor(style: Style = "normal"): string {
  switch (style) {
    case "hero":    return C.text;
    case "accent":  return C.accent;
    case "code":    return C.green;
    case "muted":   return C.muted;
    case "bullet":  return C.accent;
    default:        return C.text;
  }
}

function lineFontSize(style: Style = "normal", w: number): number {
  const base = w / 20;
  switch (style) {
    case "hero":   return base * 1.55;
    case "accent": return base * 1.15;
    case "code":   return base * 0.78;
    case "muted":  return base * 0.88;
    case "bullet": return base * 0.95;
    default:       return base;
  }
}

function lineFont(style: Style = "normal"): string {
  return style === "code" ? '"Courier New", monospace' : 'system-ui, -apple-system, sans-serif';
}

function lineWeight(style: Style = "normal"): number {
  return style === "hero" ? 800 : style === "accent" ? 700 : style === "code" ? 600 : 400;
}

// ─── main ─────────────────────────────────────────────────────────────────────

export function ProjectsScript() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const isVertical = height > width;
  const padH = width * 0.1;
  const centerY = height * (isVertical ? 0.42 : 0.48);

  return (
    <AbsoluteFill style={{ background: C.bg }}>

      {/* progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.border }}>
        <div style={{
          height: "100%", background: C.accent, borderRadius: "0 2px 2px 0",
          width: `${(frame / 1200) * 100}%`,
        }} />
      </div>

      {/* scenes */}
      {SCENES.map((scene) => {
        const enter = fi(frame, scene.start, scene.start + 18);
        const exit  = fo(frame, scene.end - 18, scene.end);
        const sceneOp = Math.min(enter, scene.end > frame ? 1 : exit);
        if (sceneOp < 0.01 && frame >= scene.end) return null;

        return (
          <div key={scene.start} style={{
            position: "absolute", left: padH, right: padH,
            top: centerY, transform: "translateY(-50%)",
            opacity: sceneOp,
            display: "flex", flexDirection: "column",
            gap: width * 0.018,
          }}>
            {scene.lines.map((line, i) => {
              const delay = i * 12;
              const lineEnter = fi(frame, scene.start + 18 + delay, scene.start + 42 + delay);
              const slideY = interpolate(lineEnter, [0, 1], [width * 0.015, 0]);

              return (
                <div key={i} style={{
                  opacity: lineEnter,
                  transform: `translateY(${slideY}px)`,
                  color: lineColor(line.style),
                  fontSize: lineFontSize(line.style, width),
                  fontFamily: lineFont(line.style),
                  fontWeight: lineWeight(line.style),
                  lineHeight: 1.25,
                  letterSpacing: line.style === "hero" ? "-0.02em" : "0",
                  background: line.style === "code" ? C.elevated : "transparent",
                  borderRadius: line.style === "code" ? 8 : 0,
                  padding: line.style === "code" ? `${width * 0.008}px ${width * 0.014}px` : 0,
                  display: "inline-block",
                }}>
                  {line.text}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* scene label chip */}
      {SCENES.map((scene) => {
        const enter = fi(frame, scene.start, scene.start + 18);
        const exit  = fo(frame, scene.end - 18, scene.end);
        const op = Math.min(enter, scene.end > frame ? 1 : exit);
        if (op < 0.01 && frame >= scene.end) return null;
        return (
          <div key={"label-" + scene.start} style={{
            position: "absolute",
            bottom: height * 0.06,
            right: padH,
            color: C.muted,
            fontFamily: '"Courier New", monospace',
            fontSize: width * 0.022,
            opacity: op * 0.6,
          }}>
            {scene.label}
          </div>
        );
      })}

    </AbsoluteFill>
  );
}
