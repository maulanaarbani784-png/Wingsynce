import { useState } from "react";
import { COLORS } from "@/constants";
import { Icon, HeartIcon, CommentIcon, ShareIcon, MoreIcon } from "@/components/Icons";

export const Reels = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(109);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(l => liked ? l - 1 : l + 1);
  };

  return (
    <div style={{ flex: 1, backgroundColor: "#000", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Reel bg" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
      
      {/* Top Header */}
      <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", zIndex: 10 }}>
        <h1 style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Reels</h1>
        <button style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
           <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a1 1 0 100-2 1 1 0 000 2z" size={24} />
        </button>
      </div>

      {/* Right Actions */}
      <div style={{ position: "absolute", right: 16, bottom: 80, display: "flex", flexDirection: "column", gap: 24, alignItems: "center", zIndex: 10 }}>
        <button onClick={toggleLike} style={{ background: "none", border: "none", color: liked ? COLORS.error : "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transform: liked ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>
          <HeartIcon filled={liked} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{likes}</span>
        </button>
        <button style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <CommentIcon />
          <span style={{ fontSize: 12, fontWeight: 600 }}>2.707</span>
        </button>
        <button style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
          <ShareIcon />
        </button>
        <button style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <MoreIcon />
        </button>
        <div style={{ width: 28, height: 28, borderRadius: 6, border: "2px solid white", overflow: "hidden", marginTop: 8 }}>
           <img src="https://i.pravatar.cc/150?img=12" alt="audio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      {/* Bottom Info */}
      <div style={{ position: "absolute", bottom: 20, left: 16, right: 70, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, overflow: "hidden" }}>
             <img src="https://i.pravatar.cc/150?img=11" alt="user" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ color: "white", fontWeight: 600, fontSize: 14 }}>valentjosiah</span>
          <button style={{ background: "transparent", border: "1px solid white", color: "white", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Ikuti</button>
        </div>
        <p style={{ color: "white", fontSize: 14, marginBottom: 8 }}>disiplin, konsisten, dan fokus. ...</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d="M9 18V5l12-2v13" size={16} color="white" />
          <span style={{ color: "white", fontSize: 12 }}>Diikuti oleh kalimasada97</span>
        </div>
      </div>
    </div>
  );
};
