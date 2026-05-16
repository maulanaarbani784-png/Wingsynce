import { POSTS } from "@/constants";
import { StoryBar } from "@/components/StoryBar";
import { PostCard } from "@/components/PostCard";

export const Feed = () => (
  <div>
    <StoryBar />
    {POSTS.map((p: any) => <PostCard key={p.id} post={p} />)}
  </div>
);
