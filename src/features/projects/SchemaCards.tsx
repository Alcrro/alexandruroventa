"use client";
import { useState } from "react";
import { IProjectSchema, ISchemaNode, ISchemaField } from "@/types";

function isRef(field: ISchemaField): boolean {
  return !!field.isRef || field.type.includes("→");
}

function CollectionCard({ node }: { node: ISchemaNode }) {
  const [showAll, setShowAll] = useState(false);
  const PREVIEW = 6;
  const fields = node.fields;
  const visible = showAll ? fields : fields.slice(0, PREVIEW);
  const hidden = fields.length - PREVIEW;

  return (
    <div
      className="schema-card"
      style={{ "--schema-color": node.color } as React.CSSProperties}
    >
      <div className="schema-card-header">
        <span className="schema-card-name">▦ {node.collection}</span>
        <span className="schema-card-count">{fields.length} fields</span>
      </div>

      <div className="schema-card-fields">
        {visible.map((f) => (
          <div
            key={f.name}
            className={`schema-field${f.required ? " required" : ""}${isRef(f) ? " ref" : ""}`}
          >
            <span className="schema-field-name">
              {f.required && <span className="schema-field-dot" />}
              {f.name}
            </span>
            <span className="schema-field-type">{f.type}</span>
          </div>
        ))}

        {!showAll && hidden > 0 && (
          <button className="schema-card-more" onClick={() => setShowAll(true)}>
            +{hidden} more fields
          </button>
        )}
      </div>

      {node.detail && (
        <p className="schema-card-detail">{node.detail}</p>
      )}
    </div>
  );
}

export default function SchemaCards({ schema }: { schema: IProjectSchema }) {
  return (
    <div className="schema-cards">
      {schema.nodes.map((node) => (
        <CollectionCard key={node.id} node={node} />
      ))}
    </div>
  );
}
