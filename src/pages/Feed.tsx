import { POSTS } from "@/constants";
import { StoryBar } from "@/components/StoryBar";
import { PostCard } from "@/components/PostCard";
import { COLORS } from "@/constants";

export const Feed = () => (
  <div>
    <div style={{ background: COLORS.card, padding: "8px 16px", fontSize: 12, textAlign: "center", color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }}>
      Contoh beranda (Data masih berupa Mock Data, postingan sungguhan sedang dalam pengembangan)
    </div>
    <StoryBar />
    {POSTS.map((p: any) => <PostCard key={p.id} post={p} />)}
  </div>
);
