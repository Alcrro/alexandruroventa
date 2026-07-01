import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";

const C = {
  bg:       "#0d1117",
  surface:  "#161b22",
  elevated: "#21262d",
  border:   "#30363d",
  text:     "#f1f5f9",
  muted:    "#94a3b8",
  accent:   "#38bdf8",
  green:    "#3fb950",
  orange:   "#f0883e",
  purple:   "#bc8cff",
  red:      "#f85149",
};

const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const fi  = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], cl);
const pop = (f: number, s: number, fps: number) =>
  spring({ frame: f - s, fps, config: { damping: 18, stiffness: 160, mass: 0.6 } });

// ─── layout (1280 × 720, 3 actors) ───────────────────────────────────────────
const BX  = 180;   // Browser x
const NX  = 640;   // Next.js Server x
const AX  = 1100;  // API Route x

const BOX_W      = 140;
const BOX_H      = 50;
const ACTOR_Y    = 148;
const TL_START   = ACTOR_Y + BOX_H / 2 + 6;
const TL_END     = 618;
const PHASE_X    = 12;  // left margin for phase labels

// ─── helpers ──────────────────────────────────────────────────────────────────

function ActorBox({ cx, label, sub, color, op, sc }: {
  cx: number; label: string; sub?: string; color: string; op: number; sc: number;
}) {
  return (
    <div style={{
      position: "absolute",
      left: cx - BOX_W / 2, top: ACTOR_Y - BOX_H / 2,
      width: BOX_W, height: BOX_H,
      background: C.surface, border: `2px solid ${color}`,
      borderRadius: 10,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: op, transform: `scale(${sc})`, transformOrigin: "center",
    }}>
      <span style={{ color: C.text, fontFamily: "system-ui,sans-serif", fontSize: 15, fontWeight: 700 }}>
        {label}
      </span>
      {sub && (
        <span style={{ color, fontFamily: '"Courier New",monospace', fontSize: 10, marginTop: 1, opacity: 0.8 }}>
          {sub}
        </span>
      )}
    </div>
  );
}

// horizontal arrow drawn left→right or right→left
function Arrow({ x1, x2, y, prog, color, dashed = false }: {
  x1: number; x2: number; y: number; prog: number; color: string; dashed?: boolean;
}) {
  const len     = Math.abs(x2 - x1);
  const right   = x2 > x1;
  const drawn   = len * prog;
  const tipX    = right ? x1 + drawn : x1 - drawn;
  const dir     = right ? 1 : -1;
  const showTip = prog > 0.82;
  const tipOp   = interpolate(prog, [0.82, 1], [0, 1], cl);

  return (
    <g>
      <line
        x1={x1} y1={y} x2={tipX} y2={y}
        stroke={color} strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray={dashed ? "6 4" : undefined}
        opacity={dashed ? 0.55 : 1}
      />
      {showTip && !dashed && (
        <polygon
          points={`${tipX},${y} ${tipX - dir * 12},${y - 6} ${tipX - dir * 12},${y + 6}`}
          fill={color} opacity={tipOp}
        />
      )}
      {showTip && dashed && (
        // X mark for "no request"
        <g opacity={tipOp}>
          <line x1={tipX - 8} y1={y - 8} x2={tipX + 8} y2={y + 8} stroke={C.red} strokeWidth={2.5} />
          <line x1={tipX + 8} y1={y - 8} x2={tipX - 8} y2={y + 8} stroke={C.red} strokeWidth={2.5} />
        </g>
      )}
    </g>
  );
}

// label floating near the timeline
function TLabel({ x, y, text, color = C.muted, op, align = "left" }: {
  x: number; y: number; text: string; color?: string; op: number; align?: "left" | "right" | "center";
}) {
  return (
    <div style={{
      position: "absolute", top: y, left: align === "right" ? undefined : x,
      right: align === "right" ? 1280 - x : undefined,
      transform: "translateY(-50%)",
      color, fontFamily: '"Courier New",monospace', fontSize: 11.5,
      opacity: op, whiteSpace: "nowrap",
      background: C.bg, padding: "1px 5px",
    }}>
      {text}
    </div>
  );
}

// phase header pill (left side)
function PhaseLabel({ y, num, title, color, op }: {
  y: number; num: string; title: string; color: string; op: number;
}) {
  return (
    <div style={{
      position: "absolute", left: PHASE_X, top: y,
      display: "flex", alignItems: "center", gap: 6,
      opacity: op,
    }}>
      <span style={{
        background: color + "22", color, border: `1px solid ${color}44`,
        borderRadius: 12, padding: "2px 8px",
        fontFamily: '"Courier New",monospace', fontSize: 10, fontWeight: 700,
      }}>
        {num}
      </span>
      <span style={{
        color, fontFamily: "system-ui,sans-serif", fontSize: 12, fontWeight: 700,
      }}>
        {title}
      </span>
    </div>
  );
}

function SummaryBox({ x, title, color, bullets, op }: {
  x: number; title: string; color: string; bullets: string[]; op: number;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: 632, width: 218,
      background: C.elevated, border: `1px solid ${color}55`,
      borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 14px",
      opacity: op,
    }}>
      <div style={{ color, fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", marginBottom: 6 }}>
        {title}
      </div>
      {bullets.map((b, i) => (
        <div key={i} style={{
          color: C.muted, fontSize: 10.5, fontFamily: '"Courier New",monospace',
          paddingLeft: 10, position: "relative", marginBottom: 3,
        }}>
          <span style={{ position: "absolute", left: 0, color }}>·</span>{b}
        </div>
      ))}
    </div>
  );
}

// ─── main (720 frames = 24s @ 30fps) ─────────────────────────────────────────
export function ClientSideFlow() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // title
  const titleOp = fi(frame, 5, 35);
  const titleY  = interpolate(frame, [5, 35], [16, 0], cl);

  // actors
  const bSc = pop(frame, 48, fps);  const bOp = fi(frame, 48, 68);
  const nSc = pop(frame, 58, fps);  const nOp = fi(frame, 58, 78);
  const aSc = pop(frame, 68, fps);  const aOp = fi(frame, 68, 88);

  // timeline lines draw
  const tlProg = fi(frame, 88, 155);
  const tlLen  = (TL_END - TL_START) * tlProg;

  // ── PHASE 1: Initial Load (120–280) ──────────────────────────────────────
  const ph1Op  = fi(frame, 118, 140);
  const req1   = fi(frame, 140, 185);   // B → N
  const reqLbl = fi(frame, 170, 192);
  const resp1  = fi(frame, 198, 245);   // N → B
  const rspLbl = fi(frame, 228, 252);
  const hydOp  = fi(frame, 258, 285);

  // ── PHASE 2: Client Navigation (300–430) ─────────────────────────────────
  const ph2Op    = fi(frame, 298, 322);
  const linkOp   = fi(frame, 322, 348);
  const noReload = fi(frame, 352, 398); // dashed arrow B → N, stops mid
  const navOp    = fi(frame, 400, 428);

  // ── PHASE 3: Data Fetch (448–568) ────────────────────────────────────────
  const ph3Op   = fi(frame, 446, 468);
  const fetchA  = fi(frame, 468, 515);  // B → API
  const fetchLbl= fi(frame, 498, 520);
  const jsonA   = fi(frame, 522, 565);  // API → B
  const jsonLbl = fi(frame, 550, 572);
  const setStOp = fi(frame, 572, 595);

  // ── PHASE 4: Re-render (608–668) ─────────────────────────────────────────
  const ph4Op   = fi(frame, 606, 628);
  const vdomOp  = fi(frame, 628, 655);
  const domOp   = fi(frame, 658, 682);

  // summary
  const sumOp = fi(frame, 685, 718);

  // y positions per step
  const P1_REQ  = 250; const P1_RSP = 310; const P1_HYD = 355;
  const P2_LNK  = 408; const P2_ARW = 438; const P2_NAV = 462;
  const P3_FET  = 506; const P3_JSN = 550; const P3_SET = 578;
  const P4_VD   = 610; const P4_DOM = 628;

  return (
    <AbsoluteFill style={{ background: C.bg }}>

      {/* title */}
      <div style={{
        position: "absolute", top: 16, left: 0, right: 0, textAlign: "center",
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <div style={{ color: C.text, fontSize: 19, fontWeight: 700, fontFamily: "system-ui,sans-serif" }}>
          React / Next.js — Client Side Lifecycle
        </div>
        <div style={{ color: C.muted, fontSize: 11, marginTop: 3, fontFamily: '"Courier New",monospace' }}>
          initial load → navigation → data fetch → re-render
        </div>
      </div>

      {/* actors */}
      <ActorBox cx={BX}  label="Browser"       color={C.accent} op={bOp} sc={bSc} />
      <ActorBox cx={NX}  label="Next.js Server" sub="App Router" color={C.green} op={nOp} sc={nSc} />
      <ActorBox cx={AX}  label="API Route"      sub="/api/*"      color={C.orange} op={aOp} sc={aSc} />

      {/* SVG layer */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: 1280, height: 720, pointerEvents: "none" }}
        viewBox="0 0 1280 720">

        {/* timeline vertical lines */}
        {[BX, NX, AX].map((x, i) => (
          <line key={x} x1={x} y1={TL_START} x2={x} y2={TL_START + tlLen}
            stroke={[C.accent, C.green, C.orange][i]}
            strokeWidth={1.5} strokeOpacity={0.3}
          />
        ))}

        {/* phase separators */}
        {[296, 444, 604].map((y, i) => (
          <line key={y} x1={PHASE_X + 8} y1={y} x2={1260} y2={y}
            stroke={C.border} strokeWidth={1} strokeDasharray="4 3"
            opacity={[ph2Op, ph3Op, ph4Op][i] * 0.5}
          />
        ))}

        {/* P1: request B→N */}
        <Arrow x1={BX} x2={NX} y={P1_REQ} prog={req1}  color={C.orange} />
        {/* P1: response N→B */}
        <Arrow x1={NX} x2={BX} y={P1_RSP} prog={resp1} color={C.purple} />

        {/* P2: dashed no-reload arrow (stops at midpoint) */}
        <Arrow x1={BX} x2={(BX + NX) / 2} y={P2_ARW} prog={noReload} color={C.border} dashed />

        {/* P3: fetch B→API */}
        <Arrow x1={BX} x2={AX} y={P3_FET} prog={fetchA} color={C.accent} />
        {/* P3: JSON API→B */}
        <Arrow x1={AX} x2={BX} y={P3_JSN} prog={jsonA}  color={C.green} />
      </svg>

      {/* phase labels */}
      <PhaseLabel y={222} num="① INITIAL LOAD"  title="First request to server" color={C.purple} op={ph1Op} />
      <PhaseLabel y={380} num="② NAVIGATION"    title="User clicks <Link />"    color={C.accent} op={ph2Op} />
      <PhaseLabel y={480} num="③ DATA FETCH"    title="Client fetches API"       color={C.orange} op={ph3Op} />
      <PhaseLabel y={600} num="④ RE-RENDER"     title="State update cycle"       color={C.green}  op={ph4Op} />

      {/* P1 labels */}
      <TLabel x={BX + 18}  y={P1_REQ - 10} text="GET /page"         color={C.orange} op={reqLbl} />
      <TLabel x={NX + 16}  y={P1_REQ + 4}  text="renders component server-side" color={C.green} op={reqLbl} />
      <TLabel x={(BX+NX)/2 - 65} y={P1_RSP - 10} text="HTML + JS bundle" color={C.purple} op={rspLbl} />
      <TLabel x={BX - 168} y={P1_HYD}      text="React hydrates · attaches events" color={C.accent} op={hydOp} />

      {/* P2 labels */}
      <TLabel x={BX + 14}  y={P2_LNK}      text="user clicks <Link />" color={C.accent} op={linkOp} />
      <TLabel x={(BX+NX)/2 - 60} y={P2_ARW + 16} text="no request to server ✗" color={C.red} op={noReload} />
      <TLabel x={BX - 178} y={P2_NAV}      text="React Router updates URL · re-renders" color={C.accent} op={navOp} />

      {/* P3 labels */}
      <TLabel x={BX + 18}  y={P3_FET - 10} text="fetch('/api/projects')" color={C.accent} op={fetchLbl} />
      <TLabel x={AX + 14}  y={P3_FET + 4}  text="runs on server · DB query" color={C.orange} op={fetchLbl} />
      <TLabel x={(BX+AX)/2 - 65} y={P3_JSN - 10} text="{ projects: [...] }" color={C.green} op={jsonLbl} />
      <TLabel x={BX - 158} y={P3_SET}      text="setState(data) → re-render" color={C.muted} op={setStOp} />

      {/* P4 labels */}
      <TLabel x={BX + 14} y={P4_VD}  text="Virtual DOM diff — only changed nodes" color={C.green} op={vdomOp} />
      <TLabel x={BX + 14} y={P4_DOM} text="minimal real DOM updates → paint"      color={C.muted} op={domOp} />

      {/* summary */}
      <SummaryBox x={18}  title="① Initial Load"   color={C.purple} op={sumOp}
        bullets={["server renders HTML", "ships JS bundle once", "React hydrates on client"]} />
      <SummaryBox x={248} title="② Navigation"    color={C.accent} op={sumOp}
        bullets={["no server round-trip", "React Router (client-only)", "instant, no full reload"]} />
      <SummaryBox x={478} title="③ Data Fetch"    color={C.orange} op={sumOp}
        bullets={["fetch() in useEffect / RSC", "API route runs server-side", "setState triggers re-render"]} />
      <SummaryBox x={708} title="④ Re-render"     color={C.green} op={sumOp}
        bullets={["VDOM diff (React reconciler)", "only changed DOM nodes update", "no full page repaint"]} />
    </AbsoluteFill>
  );
}
