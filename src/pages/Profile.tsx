import { useState } from "react";
import { COLORS, POSTS } from "@/constants";
import { GradientAvatar } from "@/components/GradientAvatar";
import { GridIcon, ReelIcon } from "@/components/Icons";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("grid");
  return (
    <div>
      {/* Header */}
      <div style={{ padding: "20px 18px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
          <GradientAvatar src="https://i.pravatar.cc/150?img=32" size={84} hasStory />
          <div style={{ display: "flex", gap: 20 }}>
            {[["12", "Postingan"], ["1.4K", "Pengikut"], ["824", "Mengikuti"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.text }}>{n}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, marginBottom: 2 }}>Nama Kamu</div>
          <div style={{ fontSize: 13.5, color: COLORS.muted }}>📸 Pecinta foto & travel</div>
          <div style={{ fontSize: 13.5, color: COLORS.muted }}>🌏 Bandung, Indonesia</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Edit Profil", "Bagikan Profil"].map(label => (
            <button key={label} style={{ flex: 1, padding: "7px 0", borderRadius: 8,
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              color: COLORS.text, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        {[{ id: "grid", Icon: GridIcon }, { id: "reel", Icon: ReelIcon }].map(({ id, Icon: TabIcon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ flex: 1, padding: "12px 0", background: "none", border: "none", cursor: "pointer",
              color: activeTab === id ? COLORS.text : COLORS.muted,
              borderBottom: activeTab === id ? `2px solid ${COLORS.text}` : "2px solid transparent",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TabIcon />
          </button>
        ))}
      </div>

      {/* Grid */}
      {activeTab === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {POSTS.concat(POSTS).map((p: any, i: number) => (
            <div key={i} style={{ position: "relative", paddingBottom: "100%" }}>
              <img src={p.image} alt="" style={{ position: "absolute", inset: 0, width: "100%",
                height: "100%", objectFit: "cover", cursor: "pointer" }} />
            </div>
          ))}
        </div>
      )}
      {activeTab === "reel" && (
        <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontSize: 14 }}>
          Belum ada reel
        </div>
      )}
    </div>
  );
};
