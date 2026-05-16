import { COLORS } from "@/constants";

export const GradientAvatar = ({ src, size = 56, hasStory = false, seen = false }: any) => (
  <div style={{ padding: hasStory ? 2 : 0, borderRadius: "50%",
    background: hasStory && !seen
      ? `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accent}, ${COLORS.accentOrange}, ${COLORS.accentYellow})`
      : hasStory ? COLORS.border : "transparent" }}>
    <div style={{ padding: hasStory ? 2 : 0, borderRadius: "50%", background: COLORS.bg }}>
      <img src={src} alt="" width={size} height={size}
        style={{ borderRadius: "50%", display: "block", objectFit: "cover" }} />
    </div>
  </div>
);
