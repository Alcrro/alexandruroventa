import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";

// ─── design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#0d1117",
  surface: "#161b22",
  elevated: "#21262d",
  border: "#30363d",
  text: "#f1f5f9",
  muted: "#94a3b8",
  secondary: "#64748b",
  accent: "#38bdf8",
  green: "#3fb950",
  orange: "#f0883e",
  purple: "#bc8cff",
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const fadeIn  = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);
const fadeOut = (f: number, a: number, b: number) => interpolate(f, [a, b], [1, 0], clamp);
const inOut   = (f: number, a: number, b: number, c: number, d: number) =>
  Math.min(fadeIn(f, a, b), fadeOut(f, c, d));
const pop     = (f: number, start: number, fps: number) =>
  spring({ frame: f - start, fps, config: { damping: 16, stiffness: 140, mass: 0.7 } });

// ─── layout: 1080 × 1920 ─────────────────────────────────────────────────────
// Top half  (y 0–860):   node tree
// Bottom half (y 860–1920): explanations (big text, mobile-readable)
const PAGE    = { x: 540, y: 175 };
const GRID    = { x: 540, y: 365 };
const FILTERS = { x: 210, y: 560 };
const CARDS   = { x: 870, y: 560 };
const DETAIL  = { x: 540, y: 755 };
const NH      = 40;

// ─── primitives ───────────────────────────────────────────────────────────────

interface NodeP {
  x: number; y: number; label: string; sub?: string;
  color?: string; scale?: number; opacity?: number; glow?: boolean;
}

function Node({ x, y, label, sub, color = C.accent, scale = 1, opacity = 1, glow = false }: NodeP) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: 270,
      transform: `translate(-50%, -50%) scale(${scale})`,
      background: C.surface, border: `2px solid ${color}`,
      borderRadius: 14, padding: "15px 20px", textAlign: "center",
      opacity, boxShadow: glow ? `0 0 28px ${color}88, 0 0 56px ${color}44` : "none",
    }}>
      <div style={{ color: C.text, fontFamily: '"Courier New", monospace', fontSize: 18, fontWeight: 700 }}>
        {label}
      </div>
      {sub && (
        <div style={{ color, fontFamily: '"Courier New", monospace', fontSize: 13, marginTop: 5, opacity: 0.8 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

interface LineP { x1: number; y1: number; x2: number; y2: number; progress: number; color?: string; }

function DrawLine({ x1, y1, x2, y2, progress, color = C.border }: LineP) {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={2.5}
      strokeDasharray={len} strokeDashoffset={len * (1 - progress)}
      strokeLinecap="round" opacity={Math.min(1, progress * 2)}
    />
  );
}

// ─── bottom panel ─────────────────────────────────────────────────────────────

interface PanelP {
  opacity: number; title: string; color: string;
  badge?: string; path?: string; bullets: string[];
}

function BottomPanel({ opacity, title, color, badge, path, bullets }: PanelP) {
  const slideY = interpolate(opacity, [0, 1], [24, 0]);
  return (
    <div style={{
      position: "absolute", left: 60, right: 60, top: 920,
      opacity, transform: `translateY(${slideY}px)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ color, fontFamily: '"Courier New", monospace', fontSize: 26, fontWeight: 700 }}>{title}</span>
        {badge && (
          <span style={{
            fontSize: 14, padding: "3px 10px",
            background: color + "22", color, borderRadius: 5,
            fontFamily: '"Courier New", monospace', fontWeight: 600,
          }}>
            {badge}
          </span>
        )}
      </div>

      {path && (
        <div style={{
          color: C.secondary, fontFamily: '"Courier New", monospace', fontSize: 15,
          marginBottom: 28, background: C.elevated, padding: "6px 14px",
          borderRadius: 7, display: "inline-block",
        }}>
          {path}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{
            color: C.muted, fontFamily: '"Courier New", monospace',
            fontSize: 20, lineHeight: "1.5",
            paddingLeft: 28, position: "relative",
          }}>
            <span style={{ position: "absolute", left: 0, color, opacity: 0.8, fontSize: 22 }}>·</span>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── main (1080 × 1920, same timing as landscape) ────────────────────────────
export function ProjectsFlowVertical() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── timing identic cu ProjectsFlow (1290 frames = 43s) ───────────────────
  const titleOp = fadeIn(frame, 5, 40);
  const titleY  = interpolate(frame, [5, 40], [20, 0], clamp);

  const pageScale  = pop(frame, 85, fps);
  const pageOp     = fadeIn(frame, 85, 110);
  const pageInfoOp = inOut(frame, 130, 170, 255, 285);

  const line1p    = fadeIn(frame, 245, 290);
  const gridScale = pop(frame, 300, fps);
  const gridOp    = fadeIn(frame, 300, 325);
  const gridInfoOp = inOut(frame, 345, 385, 490, 520);

  const line2ap   = fadeIn(frame, 460, 510);
  const line2bp   = fadeIn(frame, 460, 510);
  const filScale  = pop(frame, 518, fps);
  const filOp     = fadeIn(frame, 518, 545);
  const carScale  = pop(frame, 518, fps);
  const carOp     = fadeIn(frame, 518, 545);
  const filInfoOp = inOut(frame, 560, 598, 645, 678);
  const carInfoOp = inOut(frame, 695, 730, 790, 820);

  const line3p   = fadeIn(frame, 770, 815);
  const detScale = pop(frame, 823, fps);
  const detOp    = fadeIn(frame, 823, 850);
  const detInfoOp = inOut(frame, 860, 898, 970, 1000);

  const ph6 = frame >= 1010 && frame < 1150;
  const filtAnnotOp  = fadeIn(frame, 1015, 1042);
  const filtGlow     = fadeIn(frame, 1040, 1065);
  const stateLabelOp = fadeIn(frame, 1075, 1105);
  const cardsDimOp   = interpolate(frame, [1110, 1135], [1, 0.3], clamp);

  const ph7 = frame >= 1150;
  const navAnnotOp = fadeIn(frame, 1155, 1182);
  const cardGlow   = fadeIn(frame, 1182, 1208);
  const arrowProg  = fadeIn(frame, 1205, 1235);
  const urlOp      = fadeIn(frame, 1235, 1262);
  const detGlow    = fadeIn(frame, 1258, 1285);

  const phaseText =
    frame < 1010 ? "① Component Tree" :
    frame < 1150 ? "② Filter Interaction" :
    "③ Navigation";
  const phaseOp = fadeIn(frame, 83, 105);

  const carEffOp = ph6 ? carOp * cardsDimOp : carOp;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Audio src={staticFile("narration.mp3")} />

      {/* ── title ─────────────────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 50, left: 0, right: 0, textAlign: "center",
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <div style={{ color: C.text, fontSize: 32, fontWeight: 700, fontFamily: '"Courier New", monospace' }}>
          Projects Feature
        </div>
        <div style={{ color: C.accent, fontSize: 18, marginTop: 8, fontFamily: '"Courier New", monospace' }}>
          UI Component Flow
        </div>
      </div>

      {/* ── phase chip ────────────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 52, right: 40,
        background: C.elevated, border: `1px solid ${C.border}`,
        borderRadius: 24, padding: "7px 18px",
        color: C.muted, fontFamily: '"Courier New", monospace',
        fontSize: 14, opacity: phaseOp,
      }}>
        {phaseText}
      </div>

      {/* ── divider between tree and panel ───────────────────────────────── */}
      <div style={{
        position: "absolute", left: 40, right: 40, top: 858, height: 1,
        background: C.border, opacity: fadeIn(frame, 155, 190) * 0.5,
      }} />

      {/* ── SVG lines ─────────────────────────────────────────────────────── */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1920, pointerEvents: "none" }}
        viewBox="0 0 1080 1920">
        <DrawLine x1={PAGE.x}    y1={PAGE.y + NH}    x2={GRID.x}    y2={GRID.y - NH}    progress={line1p} />
        <DrawLine x1={GRID.x}    y1={GRID.y + NH}    x2={FILTERS.x} y2={FILTERS.y - NH} progress={line2ap} />
        <DrawLine x1={GRID.x}    y1={GRID.y + NH}    x2={CARDS.x}   y2={CARDS.y - NH}   progress={line2bp} />
        <DrawLine x1={CARDS.x}   y1={CARDS.y + NH}   x2={DETAIL.x}  y2={DETAIL.y - NH}  progress={line3p} />
        {ph7 && (
          <>
            <line x1={DETAIL.x + 155} y1={CARDS.y} x2={DETAIL.x + 155} y2={DETAIL.y}
              stroke={C.accent} strokeWidth={2.5} strokeDasharray="8 4"
              opacity={arrowProg * 0.85} strokeLinecap="round" />
            <polygon
              points={`${DETAIL.x + 148},${DETAIL.y - 8} ${DETAIL.x + 162},${DETAIL.y - 8} ${DETAIL.x + 155},${DETAIL.y + 5}`}
              fill={C.accent} opacity={arrowProg * 0.85}
            />
          </>
        )}
      </svg>

      {/* ── nodes ─────────────────────────────────────────────────────────── */}
      <Node x={PAGE.x}    y={PAGE.y}    label="ProjectsPage"     sub="server component"       color={C.green}  scale={pageScale} opacity={pageOp} />
      <Node x={GRID.x}    y={GRID.y}    label="ProjectsGrid"     sub="client component"       color={C.purple} scale={gridScale} opacity={gridOp} />
      <Node x={FILTERS.x} y={FILTERS.y} label="[filter buttons]" sub="useState(activeFilter)" color={C.orange} scale={filScale}  opacity={filOp}  glow={ph6 && filtGlow > 0.05} />
      <Node x={CARDS.x}   y={CARDS.y}   label="ProjectCard × N"  sub="Framer Motion stagger"  color={C.accent} scale={carScale}  opacity={carEffOp} glow={ph7 && cardGlow > 0.05} />
      <Node x={DETAIL.x}  y={DETAIL.y}  label="ProjectDetail"    sub="/projects/[slug]"       color={C.accent} scale={detScale}  opacity={detOp}  glow={ph7 && detGlow > 0.05} />

      {/* ── bottom panels ─────────────────────────────────────────────────── */}
      <BottomPanel
        opacity={pageInfoOp}
        title="ProjectsPage"
        color={C.green}
        badge="async"
        path="src/features/projects/ProjectsPage.tsx"
        bullets={["server component — zero client JS", "getGithubProjects() · revalidate: 300s", "passes projects[] as props to grid"]}
      />
      <BottomPanel
        opacity={gridInfoOp}
        title="ProjectsGrid"
        color={C.purple}
        badge='"use client"'
        path="src/features/projects/ProjectsGrid.tsx"
        bullets={["owns all interactivity on the page", "useState(activeFilter) → null | string", "AnimatePresence for card transitions"]}
      />
      <BottomPanel
        opacity={filInfoOp}
        title="[filter buttons]"
        color={C.orange}
        bullets={["one chip per unique tech", 'click toggles filter · "All" = null', "Array.filter() on every render"]}
      />
      <BottomPanel
        opacity={carInfoOp}
        title="ProjectCard × N"
        color={C.accent}
        path="src/features/projects/ProjectCard.tsx"
        bullets={["motion.div · stagger 0.08s / card", "thumbnail · badges · GitHub + Live", "click → push nav to detail page"]}
      />
      <BottomPanel
        opacity={detInfoOp}
        title="ProjectDetail"
        color={C.accent}
        path="src/features/projects/ProjectDetail.tsx"
        bullets={["server rendered · getGithubProject(slug)", "roadmap board · screenshot · links", "reached via Next.js Link"]}
      />

      {/* ── phase 6: filter ───────────────────────────────────────────────── */}
      {ph6 && (
        <>
          <div style={{
            position: "absolute", left: FILTERS.x, top: FILTERS.y - 82,
            transform: "translate(-50%, 0)",
            color: C.orange, fontFamily: '"Courier New", monospace', fontSize: 16,
            opacity: filtAnnotOp, whiteSpace: "nowrap",
            background: C.elevated, border: `1px solid ${C.orange}44`,
            borderRadius: 7, padding: "5px 14px",
          }}>
            user clicks "React" →
          </div>
          <div style={{
            position: "absolute", top: 960, left: 60, right: 60,
            fontFamily: '"Courier New", monospace', fontSize: 22,
            opacity: stateLabelOp, textAlign: "center", lineHeight: "1.7",
          }}>
            <span style={{ color: C.purple }}>activeFilter</span>
            <span style={{ color: C.border }}> = </span>
            <span style={{ color: C.green }}>"React"</span>
            {"\n"}
            <span style={{ color: C.muted, fontSize: 18 }}>AnimatePresence re-renders grid</span>
          </div>
        </>
      )}

      {/* ── phase 7: navigation ───────────────────────────────────────────── */}
      {ph7 && (
        <>
          <div style={{
            position: "absolute", left: CARDS.x, top: CARDS.y - 82,
            transform: "translate(-50%, 0)",
            color: C.accent, fontFamily: '"Courier New", monospace', fontSize: 16,
            opacity: navAnnotOp, whiteSpace: "nowrap",
            background: C.elevated, border: `1px solid ${C.accent}44`,
            borderRadius: 7, padding: "5px 14px",
          }}>
            user clicks card →
          </div>
          <div style={{
            position: "absolute", top: 960, left: "50%",
            transform: "translateX(-50%)",
            background: C.elevated, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: "16px 36px",
            opacity: urlOp, fontFamily: '"Courier New", monospace',
            fontSize: 22, whiteSpace: "nowrap",
          }}>
            <span style={{ color: C.border }}>→ </span>
            <span style={{ color: C.accent }}>/projects/</span>
            <span style={{ color: C.green }}>[slug]</span>
          </div>
          <div style={{
            position: "absolute", top: 1060, left: 0, right: 0,
            textAlign: "center", fontFamily: '"Courier New", monospace',
            fontSize: 18, color: C.muted, opacity: urlOp,
          }}>
            Next.js Link push navigation
          </div>
        </>
      )}
    </AbsoluteFill>
  );
}
