import { COLORS, USERS, POSTS } from "@/constants";
import { GradientAvatar } from "@/components/GradientAvatar";

export const Activity = () => (
  <div style={{ padding: "16px" }}>
    <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.text, marginBottom: 16 }}>Aktivitas</div>
    {USERS.slice(0, 4).map((u: any, i: number) => (
      <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <GradientAvatar src={u.avatar} size={44} hasStory={i % 2 === 0} />
        <div style={{ flex: 1 }}>
          <span style={{ fontWeight: 600, fontSize: 13.5, color: COLORS.text }}>{u.username} </span>
          <span style={{ fontSize: 13.5, color: COLORS.muted }}>
            {["menyukai foto kamu.", "mulai mengikuti kamu.", "mengomentari: 'Keren banget!'", "menyebut kamu di komentar."][i]}
          </span>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{["2 mnt", "1 jam", "3 jam", "1 hari"][i]} lalu</div>
        </div>
        <img src={POSTS[i % POSTS.length].image} alt="" width={40} height={40}
          style={{ borderRadius: 4, objectFit: "cover" }} />
      </div>
    ))}
  </div>
);
