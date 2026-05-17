import React, { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by name or asset type..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", flex: 1, borderRadius: "6px", border: "1px solid #ced4da", fontSize: "14px" }}
      />
      <button type="submit" style={{ padding: "10px 20px", background: "#0d6efd", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
        Search
      </button>
    </form>
  );
}