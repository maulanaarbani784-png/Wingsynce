import { useState } from "react";
import { COLORS, EXPLORE_IMAGES } from "@/constants";
import { SearchIcon } from "@/components/Icons";

export const Explore = () => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ background: COLORS.card, borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px" }}>
          <SearchIcon />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari"
            style={{ background: "none", border: "none", outline: "none", color: COLORS.text,
              fontSize: 14, flex: 1 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {EXPLORE_IMAGES.map((src, i) => (
          <div key={i} style={{ position: "relative", paddingBottom: i % 5 === 2 ? "200%" : "100%",
            gridRow: i % 5 === 2 ? "span 2" : "span 1" }}>
            <img src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%",
              height: "100%", objectFit: "cover", cursor: "pointer" }} />
          </div>
        ))}
      </div>
    </div>
  );
};
