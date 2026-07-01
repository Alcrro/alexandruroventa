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

const pop = (f: number, start: number, fps: number) =>
  spring({ frame: f - start, fps, config: { damping: 16, stiffness: 140, mass: 0.7 } });

// ─── layout (graph on left ~640px, explain panel right ~400px) ───────────────
const PAGE    = { x: 400, y: 135 };
const GRID    = { x: 400, y: 290 };
const FILTERS = { x: 175, y: 430 };
const CARDS   = { x: 600, y: 430 };
const DETAIL  = { x: 600, y: 570 };
const NH      = 36; // node half-height

// ─── primitives ───────────────────────────────────────────────────────────────

interface NodeP {
  x: number; y: number; label: string; sub?: string;
  color?: string; scale?: number; opacity?: number; glow?: boolean;
}

function Node({ x, y, label, sub, color = C.accent, scale = 1, opacity = 1, glow = false }: NodeP) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: 220,
      transform: `translate(-50%, -50%) scale(${scale})`,
      background: C.surface, border: `2px solid ${color}`,
      borderRadius: 12, padding: "13px 18px", textAlign: "center",
      opacity, boxShadow: glow ? `0 0 24px ${color}88, 0 0 48px ${color}44` : "none",
    }}>
      <div style={{ color: C.text, fontFamily: '"Courier New", monospace', fontSize: 15, fontWeight: 700 }}>
        {label}
      </div>
      {sub && (
        <div style={{ color, fontFamily: '"Courier New", monospace', fontSize: 11, marginTop: 4, opacity: 0.8 }}>
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
      stroke={color} strokeWidth={2}
      strokeDasharray={len} strokeDashoffset={len * (1 - progress)}
      strokeLinecap="round" opacity={Math.min(1, progress * 2)}
    />
  );
}

interface ExplainP {
  opacity: number; title: string; color: string;
  badge?: string; path?: string; bullets: string[];
}

function ExplainPanel({ opacity, title, color, badge, path, bullets }: ExplainP) {
  const slide = interpolate(opacity, [0, 1], [18, 0]);
  return (
    <div style={{
      position: "absolute", left: 855, top: 160, width: 380,
      opacity, transform: `translateX(${slide}px)`,
      pointerEvents: "none",
    }}>
      {/* vertical divider */}
      <div style={{
        position: "absolute", left: -25, top: -50, bottom: -60, width: 1,
        background: C.border, opacity: 0.45,
      }} />

      <div style={{ fontFamily: '"Courier New", monospace', marginBottom: 10, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ color, fontSize: 17, fontWeight: 700 }}>{title}</span>
        {badge && (
          <span style={{ fontSize: 11, padding: "2px 8px", background: color + "22", color, borderRadius: 4 }}>
            {badge}
          </span>
        )}
      </div>

      {path && (
        <div style={{
          color: C.secondary, fontFamily: '"Courier New", monospace', fontSize: 11,
          marginBottom: 14, background: C.elevated, padding: "4px 10px",
          borderRadius: 5, display: "inline-block",
        }}>
          {path}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{
            color: C.muted, fontFamily: '"Courier New", monospace',
            fontSize: 13, lineHeight: "1.55",
            paddingLeft: 18, position: "relative",
          }}>
            <span style={{ position: "absolute", left: 0, color, opacity: 0.7 }}>·</span>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── main composition ─────────────────────────────────────────────────────────
// 1620 frames @ 30fps = 54s — matches narration.mp3
export function ProjectsFlow() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── title (0-80) ──────────────────────────────────────────────────────────
  const titleOp = fadeIn(frame, 5, 40);
  const titleY  = interpolate(frame, [5, 40], [20, 0], clamp);

  // ── ProjectsPage (85-285) ────────────────── ~0–9s ───────────────────────
  const pageScale  = pop(frame, 85, fps);
  const pageOp     = fadeIn(frame, 85, 110);
  const pageInfoOp = inOut(frame, 130, 170, 255, 285);

  // ── Line → ProjectsGrid (245-325) ────────── ~8–11s ──────────────────────
  const line1p    = fadeIn(frame, 245, 290);
  const gridScale = pop(frame, 300, fps);
  const gridOp    = fadeIn(frame, 300, 325);
  const gridInfoOp = inOut(frame, 345, 385, 490, 520);

  // ── Branch → Filters + Cards (460-820) ───── ~15–27s ─────────────────────
  const line2ap   = fadeIn(frame, 460, 510);
  const line2bp   = fadeIn(frame, 460, 510);
  const filScale  = pop(frame, 518, fps);
  const filOp     = fadeIn(frame, 518, 545);
  const carScale  = pop(frame, 518, fps);
  const carOp     = fadeIn(frame, 518, 545);
  const filInfoOp = inOut(frame, 560, 598, 645, 678);
  const carInfoOp = inOut(frame, 695, 730, 790, 820);

  // ── Line → ProjectDetail (770-1000) ──────── ~26–33s ─────────────────────
  const line3p   = fadeIn(frame, 770, 815);
  const detScale = pop(frame, 823, fps);
  const detOp    = fadeIn(frame, 823, 850);
  const detInfoOp = inOut(frame, 860, 898, 970, 1000);

  // ── Phase 6: filter interaction (1010-1150) ── ~34–38s ───────────────────
  const ph6 = frame >= 1010 && frame < 1150;
  const filtAnnotOp  = fadeIn(frame, 1015, 1042);
  const filtGlow     = fadeIn(frame, 1040, 1065);
  const stateLabelOp = fadeIn(frame, 1075, 1105);
  const cardsDimOp   = interpolate(frame, [1110, 1135], [1, 0.3], clamp);

  // ── Phase 7: navigation (1150-1290) ──────── ~38–43s ─────────────────────
  const ph7 = frame >= 1150;
  const navAnnotOp = fadeIn(frame, 1155, 1182);
  const cardGlow   = fadeIn(frame, 1182, 1208);
  const arrowProg  = fadeIn(frame, 1205, 1235);
  const urlOp      = fadeIn(frame, 1235, 1262);
  const detGlow    = fadeIn(frame, 1258, 1285);

  // phase label
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
        position: "absolute", top: 26, left: 0, right: 0, textAlign: "center",
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: '"Courier New", monospace' }}>
          Projects Feature
        </div>
        <div style={{ color: C.accent, fontSize: 12, marginTop: 5, fontFamily: '"Courier New", monospace' }}>
          UI Component Flow
        </div>
      </div>

      {/* ── phase chip ────────────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 16, right: 26,
        background: C.elevated, border: `1px solid ${C.border}`,
        borderRadius: 20, padding: "5px 14px",
        color: C.muted, fontFamily: '"Courier New", monospace',
        fontSize: 11, opacity: phaseOp,
      }}>
        {phaseText}
      </div>

      {/* ── SVG lines ─────────────────────────────────────────────────────── */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: 1280, height: 720, pointerEvents: "none" }}
        viewBox="0 0 1280 720">
        <DrawLine x1={PAGE.x}    y1={PAGE.y + NH}    x2={GRID.x}    y2={GRID.y - NH}    progress={line1p} />
        <DrawLine x1={GRID.x}    y1={GRID.y + NH}    x2={FILTERS.x} y2={FILTERS.y - NH} progress={line2ap} />
        <DrawLine x1={GRID.x}    y1={GRID.y + NH}    x2={CARDS.x}   y2={CARDS.y - NH}   progress={line2bp} />
        <DrawLine x1={CARDS.x}   y1={CARDS.y + NH}   x2={DETAIL.x}  y2={DETAIL.y - NH}  progress={line3p} />
        {ph7 && (
          <>
            <line x1={CARDS.x + 135} y1={CARDS.y} x2={DETAIL.x + 135} y2={DETAIL.y}
              stroke={C.accent} strokeWidth={2} strokeDasharray="6 3"
              opacity={arrowProg * 0.85} strokeLinecap="round" />
            <polygon
              points={`${DETAIL.x + 129},${DETAIL.y - 7} ${DETAIL.x + 141},${DETAIL.y - 7} ${DETAIL.x + 135},${DETAIL.y + 5}`}
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

      {/* ── explanation panels (all stacked, controlled by opacity) ────────── */}
      <ExplainPanel
        opacity={pageInfoOp}
        title="ProjectsPage"
        color={C.green}
        badge="async"
        path="src/features/projects/ProjectsPage.tsx"
        bullets={[
          "server component — zero client JS shipped",
          "calls getGithubProjects() at request time",
          "revalidate: 300s in prod · no-store in dev",
        ]}
      />
      <ExplainPanel
        opacity={gridInfoOp}
        title="ProjectsGrid"
        color={C.purple}
        badge='"use client"'
        path="src/features/projects/ProjectsGrid.tsx"
        bullets={[
          "owns all interactivity on the projects page",
          "useState(activeFilter) → null | string",
          "AnimatePresence key={activeFilter} for transitions",
        ]}
      />
      <ExplainPanel
        opacity={filInfoOp}
        title="[filter buttons]"
        color={C.orange}
        bullets={[
          "one chip per unique tech across all projects",
          'click toggles filter · "All" resets to null',
          "filtered list via Array.filter() on each render",
        ]}
      />
      <ExplainPanel
        opacity={carInfoOp}
        title="ProjectCard × N"
        color={C.accent}
        path="src/features/projects/ProjectCard.tsx"
        bullets={[
          "motion.div with variants: hidden → visible",
          "stagger: 0.08s delay per card index",
          "thumbnail · tech badges · GitHub + Live links",
        ]}
      />
      <ExplainPanel
        opacity={detInfoOp}
        title="ProjectDetail"
        color={C.accent}
        path="src/features/projects/ProjectDetail.tsx"
        bullets={[
          "server rendered · getGithubProject(slug)",
          "roadmap board · screenshot · full description",
          "reached via Next.js <Link> push navigation",
        ]}
      />

      {/* ── phase 6: filter annotations ───────────────────────────────────── */}
      {ph6 && (
        <>
          <div style={{
            position: "absolute", left: FILTERS.x, top: FILTERS.y - 76,
            transform: "translate(-50%, 0)",
            color: C.orange, fontFamily: '"Courier New", monospace', fontSize: 13,
            opacity: filtAnnotOp, whiteSpace: "nowrap",
            background: C.elevated, border: `1px solid ${C.orange}44`,
            borderRadius: 6, padding: "4px 10px",
          }}>
            user clicks "React" →
          </div>
          <div style={{
            position: "absolute", bottom: 38, left: 0, right: 0,
            textAlign: "center", fontFamily: '"Courier New", monospace',
            fontSize: 13, opacity: stateLabelOp,
          }}>
            <span style={{ color: C.purple }}>activeFilter</span>
            <span style={{ color: C.border }}> = </span>
            <span style={{ color: C.green }}>"React"</span>
            <span style={{ color: C.muted }}>  →  AnimatePresence re-renders grid</span>
          </div>
        </>
      )}

      {/* ── phase 7: navigation annotations ──────────────────────────────── */}
      {ph7 && (
        <>
          <div style={{
            position: "absolute", left: CARDS.x, top: CARDS.y - 76,
            transform: "translate(-50%, 0)",
            color: C.accent, fontFamily: '"Courier New", monospace', fontSize: 13,
            opacity: navAnnotOp, whiteSpace: "nowrap",
            background: C.elevated, border: `1px solid ${C.accent}44`,
            borderRadius: 6, padding: "4px 10px",
          }}>
            user clicks card →
          </div>
          <div style={{
            position: "absolute", bottom: 38, left: "50%",
            transform: "translateX(-50%)",
            background: C.elevated, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "10px 26px",
            opacity: urlOp, fontFamily: '"Courier New", monospace',
            fontSize: 14, whiteSpace: "nowrap",
          }}>
            <span style={{ color: C.border }}>→ </span>
            <span style={{ color: C.accent }}>/projects/</span>
            <span style={{ color: C.green }}>[slug]</span>
            <span style={{ color: C.muted }}>  — Next.js Link push navigation</span>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
}
