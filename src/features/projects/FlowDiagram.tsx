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

interface Field {
  name: string;
  type: string;
  required?: boolean;
  isRef?: boolean;
}

interface NodeData extends Record<string, unknown> {
  collection: string;
  color: string;
  fields: Field[];
  detail: string;
}

type FlowNode = Node<NodeData, "db">;

function DbNode({ data, selected }: NodeProps<FlowNode>) {
  const fields = data.fields as Field[];
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: `2px solid ${selected ? data.color : data.color + "55"}`,
        borderRadius: 8,
        width: 230,
        overflow: "hidden",
        boxShadow: selected ? `0 0 20px ${data.color}33` : "0 2px 8px rgba(0,0,0,0.15)",
        transition: "border-color 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
    >
      <Handle id="t" type="target" position={Position.Top}
        style={{ background: data.color, border: "none", width: 8, height: 8 }} />
      <Handle id="l" type="target" position={Position.Left}
        style={{ background: data.color, border: "none", width: 8, height: 8 }} />

      <div style={{
        background: data.color + "20",
        borderBottom: `1px solid ${data.color}33`,
        padding: "8px 12px",
      }}>
        <span style={{ color: data.color, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>
          ▦ {data.collection}
        </span>
      </div>

      {fields.map((f, i) => (
        <div key={f.name} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 12px",
          borderBottom: i < fields.length - 1 ? `1px solid ${data.color}12` : "none",
        }}>
          <span style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "var(--text-primary)",
            fontWeight: f.required ? 600 : 400,
          }}>
            {f.name}{f.required ? " *" : ""}
          </span>
          <span style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: f.isRef ? data.color : "var(--text-muted)",
          }}>
            {f.type}
          </span>
        </div>
      ))}

      <Handle id="b" type="source" position={Position.Bottom}
        style={{ background: data.color, border: "none", width: 8, height: 8 }} />
      <Handle id="r" type="source" position={Position.Right}
        style={{ background: data.color, border: "none", width: 8, height: 8 }} />
    </div>
  );
}

const ORANGE = "#f0883e";
const GREEN  = "#3fb950";
const BLUE   = "#38bdf8";
const PURPLE = "#bc8cff";
const CYAN   = "#22d3ee";
const AMBER  = "#fbbf24";

const edgeDefaults = {
  type: "smoothstep",
  labelStyle: { fontFamily: "monospace", fontSize: 10, fill: "var(--text-muted)" },
  labelBgStyle: { fill: "var(--bg-elevated)", fillOpacity: 0.9 },
  labelBgPadding: [4, 3] as [number, number],
  labelBgBorderRadius: 3,
};

const initialNodes: FlowNode[] = [
  {
    id: "certificates",
    type: "db",
    position: { x: 0, y: 0 },
    data: {
      collection: "certificates",
      color: ORANGE,
      fields: [
        { name: "_id", type: "ObjectId" },
        { name: "src", type: "String", required: true },
        { name: "organization", type: "String" },
        { name: "languageLearnt", type: "String" },
        { name: "author", type: "Array" },
        { name: "slug", type: "String (auto)" },
        { name: "date", type: "Date" },
      ],
      detail: "Certificatele obținute. Slug-ul e generat automat pre-save din organization + languageLearnt + date + _id.",
    },
  },
  {
    id: "experience",
    type: "db",
    position: { x: 260, y: 0 },
    data: {
      collection: "experience",
      color: GREEN,
      fields: [
        { name: "_id", type: "ObjectId" },
        { name: "idIncNumber", type: "Number" },
        { name: "startYear", type: "Date" },
        { name: "currentYear", type: "Date" },
        { name: "endYear", type: "Date" },
        { name: "isEnded", type: "Boolean" },
        { name: "className", type: "String" },
        { name: "companyLogo", type: "String" },
        { name: "titleDescription", type: "String" },
        { name: "descriptionMore", type: "String" },
      ],
      detail: "Istoricul profesional. Pre-save hook: dacă isEnded=true → currentYear=now, endYear=null.",
    },
  },
  {
    id: "skill",
    type: "db",
    position: { x: 520, y: 0 },
    data: {
      collection: "Skill",
      color: BLUE,
      fields: [
        { name: "_id", type: "ObjectId" },
        { name: "skillName", type: "String", required: true },
        { name: "category", type: "enum (5)", required: true },
        { name: "level", type: "enum (3)", required: true },
        { name: "icon", type: "String" },
      ],
      detail: "Skill-uri tehnice. category ∈ {Frontend, Backend, Database, DevOps, Tools}. level ∈ {beginner, intermediate, advanced}. skillName este unic.",
    },
  },
  {
    id: "languageSkill",
    type: "db",
    position: { x: 0, y: 360 },
    data: {
      collection: "languageSkill",
      color: PURPLE,
      fields: [
        { name: "_id", type: "ObjectId" },
        { name: "skillName", type: "String", required: true },
        { name: "link", type: "String (auto)" },
      ],
      detail: "Categorii de cunoștințe (ex: JavaScript, React). link generat din skillName. Referit logic prin câmpul category din languageSKillContent.",
    },
  },
  {
    id: "knowledgeEntry",
    type: "db",
    position: { x: 260, y: 360 },
    data: {
      collection: "languageSKillContent",
      color: CYAN,
      fields: [
        { name: "_id", type: "ObjectId" },
        { name: "category", type: "→ languageSkill", isRef: true },
        { name: "languageType", type: "course | project", required: true },
        { name: "contentTitle", type: "String", required: true },
        { name: "contentDescription", type: "String", required: true },
        { name: "unique_id", type: "String (auto)" },
        { name: "slug", type: "String (auto)" },
        { name: "versionCode_id", type: "→ CodeVersion", isRef: true },
        { name: "ratingSum", type: "Number" },
        { name: "ratingCount", type: "Number" },
      ],
      detail: "Conținut de cunoștințe — cursuri sau proiecte. Ref la categoria din languageSkill și la codul asociat din CodeVersion. Rating = ratingSum / ratingCount.",
    },
  },
  {
    id: "codeVersion",
    type: "db",
    position: { x: 520, y: 360 },
    data: {
      collection: "CodeVersion",
      color: AMBER,
      fields: [
        { name: "_id", type: "ObjectId" },
        { name: "code", type: "String" },
        { name: "versionCode", type: "String" },
        { name: "date", type: "Date" },
        { name: "title_id", type: "→ languageSKillContent", isRef: true },
      ],
      detail: "Versiuni de cod asociate unui entry din Knowledge Tracker. title_id este back-reference pentru navigare bidirecțională.",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "cat",
    source: "languageSkill",
    sourceHandle: "r",
    target: "knowledgeEntry",
    targetHandle: "l",
    label: "category",
    animated: true,
    style: { stroke: PURPLE + "99" },
    ...edgeDefaults,
  },
  {
    id: "code",
    source: "knowledgeEntry",
    sourceHandle: "r",
    target: "codeVersion",
    targetHandle: "l",
    label: "versionCode_id",
    animated: true,
    style: { stroke: CYAN + "99" },
    ...edgeDefaults,
  },
];

const nodeTypes = { db: DbNode };

export default function FlowDiagram() {
  const { resolvedTheme } = useTheme();
  const [nodes, , onNodesChange] = useNodesState<FlowNode>(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState<NodeData | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const data = node.data as NodeData;
    setSelected((prev) => (prev?.collection === data.collection ? null : data));
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
          fitViewOptions={{ padding: 0.15 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background gap={20} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.collection as string}
            className="flow-detail-card"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flow-detail-header">
              <span className="flow-detail-label" style={{ color: selected.color as string }}>
                {selected.collection as string}
              </span>
            </div>
            <p className="flow-detail-text">{selected.detail as string}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
