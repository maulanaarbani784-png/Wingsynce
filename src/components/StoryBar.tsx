import { useState } from "react";
import { COLORS, USERS } from "@/constants";
import { GradientAvatar } from "./GradientAvatar";

export const StoryBar = () => {
  const [seenStories, setSeenStories] = useState<number[]>([]);
  return (
    <div style={{ overflowX: "auto", display: "flex", gap: 16, padding: "12px 16px",
      borderBottom: `1px solid ${COLORS.border}`, scrollbarWidth: "none" }}>
      {/* My Story */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", minWidth: 60 }}>
        <div style={{ position: "relative" }}>
          <GradientAvatar src="https://i.pravatar.cc/150?img=32" size={58} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `2px solid ${COLORS.bg}` }}>
            <span style={{ color: "#fff", fontSize: 14, lineHeight: 1 }}>+</span>
          </div>
        </div>
        <span style={{ fontSize: 11, color: COLORS.muted, whiteSpace: "nowrap" }}>Story kamu</span>
      </div>
      {USERS.map((u, i) => (
        <div key={u.id} onClick={() => setSeenStories(s => [...s, u.id])}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", minWidth: 60 }}>
          <GradientAvatar src={u.avatar} size={58} hasStory seen={seenStories.includes(u.id)} />
          <span style={{ fontSize: 11, color: COLORS.muted, whiteSpace: "nowrap", maxWidth: 64,
            overflow: "hidden", textOverflow: "ellipsis" }}>{u.username.split(".")[0]}</span>
        </div>
      ))}
    </div>
  );
};
