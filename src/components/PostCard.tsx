import { useState } from "react";
import { COLORS } from "@/constants";
import { GradientAvatar } from "./GradientAvatar";
import { VerifiedIcon, LocationIcon, MoreIcon, HeartIcon, CommentIcon, ShareIcon, BookmarkIcon } from "./Icons";

export const PostCard = ({ post }: any) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any[]>(post.comments);
  const [doubleHeart, setDoubleHeart] = useState(false);

  const handleLike = () => {
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
  };

  const handleDoubleTap = () => {
    if (!liked) { setLiked(true); setLikes(n => n + 1); }
    setDoubleHeart(true);
    setTimeout(() => setDoubleHeart(false), 900);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments(c => [...c, { user: { username: "kamu", avatar: "https://i.pravatar.cc/150?img=32" }, text: newComment }]);
    setNewComment("");
  };

  return (
    <div style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 8 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", gap: 10 }}>
        <GradientAvatar src={post.user.avatar} size={36} hasStory />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 13.5, color: COLORS.text }}>{post.user.username}</span>
            {post.user.verified && <VerifiedIcon />}
          </div>
          {post.location && (
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <LocationIcon />
              <span style={{ fontSize: 11, color: COLORS.muted }}>{post.location}</span>
            </div>
          )}
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text }}>
          <MoreIcon />
        </button>
      </div>

      {/* Image */}
      <div style={{ position: "relative", cursor: "pointer" }} onDoubleClick={handleDoubleTap}>
        <img src={post.image} alt="" style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "cover" }} />
        {doubleHeart && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            animation: "heartPop 0.9s ease forwards", pointerEvents: "none" }}>
            <svg width={80} height={80} viewBox="0 0 24 24" fill="white" opacity={0.95}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: "10px 14px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", transform: liked ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.15s" }}>
            <HeartIcon filled={liked} />
          </button>
          <button onClick={() => setShowComments(s => !s)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <CommentIcon />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}><ShareIcon /></button>
          <div style={{ flex: 1 }} />
          <button onClick={() => setSaved(s => !s)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <BookmarkIcon filled={saved} />
          </button>
        </div>

        <div style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
          {likes.toLocaleString()} suka
        </div>
        <div style={{ fontSize: 13.5, color: COLORS.text, marginBottom: 3 }}>
          <span style={{ fontWeight: 700, marginRight: 5 }}>{post.user.username}</span>
          {post.caption}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>{post.time}</div>

        {/* Comments preview */}
        {!showComments && comments.length > 0 && (
          <button onClick={() => setShowComments(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted, fontSize: 13, padding: 0 }}>
            Lihat semua {comments.length} komentar
          </button>
        )}

        {showComments && (
          <div style={{ marginTop: 6 }}>
            {comments.map((c, i) => (
              <div key={i} style={{ fontSize: 13.5, color: COLORS.text, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, marginRight: 5 }}>{c.user.username}</span>{c.text}
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
              <img src="https://i.pravatar.cc/150?img=32" alt="" width={26} height={26}
                style={{ borderRadius: "50%", objectFit: "cover" }} />
              <input value={newComment} onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addComment()}
                placeholder="Tambah komentar..."
                style={{ flex: 1, background: "none", border: "none", outline: "none",
                  color: COLORS.text, fontSize: 13, padding: "4px 0" }} />
              {newComment && (
                <button onClick={addComment}
                  style={{ background: "none", border: "none", cursor: "pointer",
                    color: COLORS.accent, fontWeight: 700, fontSize: 13 }}>Kirim</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
