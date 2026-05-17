import { useState, useEffect } from "react";
import axios from "axios";
import { SearchBar } from "./components/searchComp";
import TreeNode from "./components/TreeNode";
import type { Force, SearchResult } from "./lib/types";
import  { API_BASE } from "./lib/apis/api";



export default function App() {
  const [rootForces, setRootForces] = useState<Force[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    axios.get(API_BASE)
      .then((res) => setRootForces(res.data))
      .catch((err) => console.error("Error loading root units:", err));
  }, []);

  const handleSearchSubmit = async (query: string) => {
    setSearching(true);
    try {
      const res = await axios.get(`${API_BASE}/search?q=${query}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif", display: "flex", gap: "50px", maxWidth: "1200px", margin: "0 auto" }}>
      
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>Order of Battle Tree</h2>
        <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #e3e6ea", minHeight: "400px" }}>
          {rootForces.length > 0 ? (
            rootForces.map((node) => <TreeNode key={node.id} node={node} apiBase={API_BASE} />)
          ) : (
            <p style={{ color: "#666" }}>Loading military hierarchy...</p>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Search */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>Force Finder</h2>
        
        <SearchBar onSearch={handleSearchSubmit} />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {searching && <p style={{ color: "#666" }}>Scanning hierarchy paths...</p>}
          
          {!searching && searchResults.map((result) => (
            <div key={result.id} style={{ padding: "14px", border: "1px solid #e3e6ea", background: "#ffffff", borderRadius: "6px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <strong style={{ fontSize: "16px" }}>{result.name}</strong>
                <span style={{ fontSize: "11px", background: "#e2e3e5", color: "#383d41", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold" }}>
                  {result.forceType}
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "#0a58ca", background: "#f1f6fe", padding: "8px", borderRadius: "4px", borderLeft: "3px solid #0d6efd" }}>
                 <strong>Chain:</strong> {result.path.join(" ➔ ")}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}