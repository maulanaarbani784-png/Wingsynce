import { useState } from "react";
import { COLORS, EXPLORE_IMAGES } from "@/constants";
import { SearchIcon, ReelIcon } from "@/components/Icons";

export const Explore = () => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div style={{ padding: "8px 14px 12px" }}>
        <div style={{ background: COLORS.input, borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px" }}>
          <SearchIcon />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari"
            style={{ background: "none", border: "none", outline: "none", color: COLORS.text,
              fontSize: 16, flex: 1, fontWeight: 500 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {EXPLORE_IMAGES.map((src, i) => {
          const isReel = i % 3 === 1;
          const views = ["1,3JT", "45,5rb", "3,5JT", "6,9JT", "245rb", "17,2JT", "56,3JT", "64,6rb"][i % 8];
          return (
            <div key={i} style={{ position: "relative", paddingBottom: "130%", gridRow: "span 1" }}>
              <img src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} />
              {isReel && (
                <div style={{ position: "absolute", top: 6, right: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                     <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z" />
                  </svg>
                </div>
              )}
              <div style={{ position: "absolute", bottom: 6, left: 6, display: "flex", alignItems: "center", gap: 4, color: "white", fontSize: 13, fontWeight: "bold" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                {views}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
