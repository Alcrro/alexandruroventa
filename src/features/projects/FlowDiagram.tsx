"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import "@xyflow/react/dist/style.css";

// ─── types ────────────────────────────────────────────────────────────────────

interface NodeData extends Record<string, unknown> {
  label: string;
  sub: string;
  color: string;
  badge?: string;
  detail: string;
}

type FlowNode = Node<NodeData, "custom">;

// ─── custom node ──────────────────────────────────────────────────────────────

function DiagramNode({ data, selected }: NodeProps<FlowNode>) {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: `2px solid ${selected ? data.color : data.color + "66"}`,
        borderRadius: 10,
        padding: "12px 20px",
        width: 200,
        textAlign: "center",
        cursor: "pointer",
        boxShadow: selected ? `0 0 20px ${data.color}44` : "0 2px 8px rgba(0,0,0,0.12)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.color, border: "none", width: 8, height: 8 }}
      />
      {data.badge && (
        <span
          style={{
            display: "inline-block",
            fontSize: 10,
            padding: "2px 7px",
            borderRadius: 4,
            background: data.color + "22",
            color: data.color,
            fontFamily: "monospace",
            marginBottom: 6,
          }}
        >
          {data.badge as string}
        </span>
      )}
      <div
        style={{
          color: "var(--text-primary)",
          fontFamily: "monospace",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {data.label}
      </div>
      <div
        style={{
          color: data.color,
          fontFamily: "monospace",
          fontSize: 11,
          marginTop: 4,
          opacity: 0.8,
        }}
      >
        {data.sub}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.color, border: "none", width: 8, height: 8 }}
      />
    </div>
  );
}

// ─── static data ─────────────────────────────────────────────────────────────

const GREEN  = "#3fb950";
const PURPLE = "#bc8cff";
const ORANGE = "#f0883e";
const BLUE   = "#38bdf8";

const initialNodes: FlowNode[] = [
  {
    id: "page",
    type: "custom",
    position: { x: 250, y: 0 },
    data: {
      label: "ProjectsPage",
      sub: "server component",
      color: GREEN,
      badge: "async",
      detail:
        "Server component — runs only on the server. Calls getGithubProjects() at build/revalidate time (revalidate: 300s in prod, no-store in dev). Zero data-fetching JS shipped to the client.",
    },
  },
  {
    id: "grid",
    type: "custom",
    position: { x: 250, y: 150 },
    data: {
      label: "ProjectsGrid",
      sub: "client component",
      color: PURPLE,
      badge: '"use client"',
      detail:
        "Client component that owns interactivity. Manages activeFilter via useState. Uses AnimatePresence + motion.div variants (stagger 0.08s) for smooth card transitions when filter changes.",
    },
  },
  {
    id: "filters",
    type: "custom",
    position: { x: 20, y: 305 },
    data: {
      label: "[filter buttons]",
      sub: "useState(activeFilter)",
      color: ORANGE,
      detail:
        'One chip per unique tech derived from all projects. Click toggles activeFilter; "All" resets to null. The filtered list is computed inline with Array.filter() on each render.',
    },
  },
  {
    id: "cards",
    type: "custom",
    position: { x: 460, y: 305 },
    data: {
      label: "ProjectCard × N",
      sub: "Framer Motion stagger",
      color: BLUE,
      detail:
        "Each card is wrapped in a motion.div with staggered entrance (delay 0.08s × index). Shows thumbnail, tech badges (TechBadge), GitHub link, and a Live button when project.isDeployed is true.",
    },
  },
  {
    id: "detail",
    type: "custom",
    position: { x: 460, y: 460 },
    data: {
      label: "ProjectDetail",
      sub: "/projects/[slug]",
      color: BLUE,
      detail:
        "Full project page rendered server-side via getGithubProject(slug). Shows roadmap board, screenshot, description, tech stack, and GitHub/Live links.",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "page",
    target: "grid",
    label: "projects[]",
    animated: true,
    type: "smoothstep",
    style: { stroke: GREEN + "99" },
    labelStyle: { fontFamily: "monospace", fontSize: 10, fill: "var(--text-muted)" },
    labelBgStyle: { fill: "var(--bg-elevated)", fillOpacity: 0.9 },
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
  },
  {
    id: "e2",
    source: "grid",
    target: "filters",
    label: "renders",
    type: "smoothstep",
    style: { stroke: PURPLE + "99" },
    labelStyle: { fontFamily: "monospace", fontSize: 10, fill: "var(--text-muted)" },
    labelBgStyle: { fill: "var(--bg-elevated)", fillOpacity: 0.9 },
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
  },
  {
    id: "e3",
    source: "grid",
    target: "cards",
    label: "renders × N",
    animated: true,
    type: "smoothstep",
    style: { stroke: PURPLE + "99" },
    labelStyle: { fontFamily: "monospace", fontSize: 10, fill: "var(--text-muted)" },
    labelBgStyle: { fill: "var(--bg-elevated)", fillOpacity: 0.9 },
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
  },
  {
    id: "e4",
    source: "cards",
    target: "detail",
    label: "push nav",
    animated: true,
    type: "smoothstep",
    style: { stroke: BLUE + "99", strokeDasharray: "6 3" },
    labelStyle: { fontFamily: "monospace", fontSize: 10, fill: "var(--text-muted)" },
    labelBgStyle: { fill: "var(--bg-elevated)", fillOpacity: 0.9 },
    labelBgPadding: [4, 3],
    labelBgBorderRadius: 3,
  },
];

// ─── component ────────────────────────────────────────────────────────────────

const nodeTypes = { custom: DiagramNode };

export default function FlowDiagram() {
  const { resolvedTheme } = useTheme();
  const [nodes, , onNodesChange] = useNodesState<FlowNode>(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState<NodeData | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const data = node.data as NodeData;
    setSelected((prev) => (prev?.label === data.label ? null : data));
  }, []);

  const onPaneClick = useCallback(() => setSelected(null), []);

  const memoNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div className="flow-diagram-wrapper">
      <div className="flow-diagram-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={memoNodeTypes}
          colorMode={resolvedTheme === "light" ? "light" : "dark"}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          minZoom={0.5}
          maxZoom={1.5}
        >
          <Background gap={20} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.label}
            className="flow-detail-card"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flow-detail-header">
              <span className="flow-detail-label" style={{ color: selected.color }}>
                {selected.label}
              </span>
              {selected.badge && (
                <span
                  className="flow-detail-badge"
                  style={{ background: selected.color + "22", color: selected.color }}
                >
                  {selected.badge as string}
                </span>
              )}
            </div>
            <p className="flow-detail-text">{selected.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
