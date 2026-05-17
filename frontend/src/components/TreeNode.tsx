import { useState } from "react";
import axios from "axios";
import type { Force } from "../lib/types";

interface TreeNodeProps {
  node: Force;
  apiBase: string;
}

export default function TreeNode({ node, apiBase }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<Force[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleNode = async () => {
    if (!isOpen && children.length === 0) {
      setLoading(true);
      try {
        const res = await axios.get(`${apiBase}?parentId=${node.id}`);
        setChildren(res.data);
      } catch (err) {
        console.error("Failed to fetch sub-units:", err);
      } finally {
        setLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: "16px", marginTop: "8px" }}>
      <div 
        onClick={toggleNode} 
        style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 8px", borderRadius: "4px", transition: "background 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#e9ecef")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <span style={{ fontSize: "10px", color: "#6c757d", transform: isOpen ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform 0.1s" }}>
          ▶
        </span>
        <span style={{ fontWeight: isOpen ? "600" : "400", color: "#212529" }}>{node.name}</span>
        <span style={{ fontSize: "10px", background: "#6c757d", color: "white", padding: "1px 6px", borderRadius: "4px" }}>
          {node.forceType}
        </span>
        {loading && <small style={{ color: "#0d6efd", fontSize: "11px" }}>...</small>}
      </div>

      {isOpen && (
        <div style={{ borderLeft: "1px dashed #dee2e6", marginLeft: "14px", paddingLeft: "6px" }}>
          {children.map((child) => (
            <TreeNode key={child.id} node={child} apiBase={apiBase} />
          ))}
          {!loading && children.length === 0 && (
            <div style={{ marginLeft: "18px", fontSize: "12px", color: "#adb5bd", fontStyle: "italic", padding: "2px 0" }}>
              • No child branches
            </div>
          )}
        </div>
      )}
    </div>
  );
}