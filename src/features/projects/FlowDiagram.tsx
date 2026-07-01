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
import { IProjectSchema, ISchemaField } from "@/types";
import "@xyflow/react/dist/style.css";

interface NodeData extends Record<string, unknown> {
  collection: string;
  color: string;
  fields: ISchemaField[];
  detail: string;
}

type FlowNode = Node<NodeData, "db">;

function DbNode({ data, selected }: NodeProps<FlowNode>) {
  const fields = data.fields as ISchemaField[];
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

const nodeTypes = { db: DbNode };

export default function FlowDiagram({ schema }: { schema: IProjectSchema }) {
  const { resolvedTheme } = useTheme();

  const initialNodes: FlowNode[] = useMemo(() =>
    schema.nodes.map((n) => ({
      id: n.id,
      type: "db" as const,
      position: { x: n.x, y: n.y },
      data: { collection: n.collection, color: n.color, fields: n.fields, detail: n.detail },
    })), [schema]);

  const initialEdges: Edge[] = useMemo(() =>
    schema.edges.map((e) => ({
      id: e.id,
      source: e.source,
      ...(e.sourceHandle && { sourceHandle: e.sourceHandle }),
      target: e.target,
      ...(e.targetHandle && { targetHandle: e.targetHandle }),
      label: e.label,
      animated: e.animated,
      type: "smoothstep",
      style: {
        stroke: (e.color ?? "#888") + "99",
        ...(e.dashed ? { strokeDasharray: "5 3" } : {}),
      },
      labelStyle: { fontFamily: "monospace", fontSize: 10, fill: "var(--text-muted)" },
      labelBgStyle: { fill: "var(--bg-elevated)", fillOpacity: 0.9 },
      labelBgPadding: [4, 3] as [number, number],
      labelBgBorderRadius: 3,
    })), [schema]);

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
