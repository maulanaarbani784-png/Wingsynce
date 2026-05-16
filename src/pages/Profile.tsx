import { useState, useEffect, useRef } from "react";
import { COLORS, POSTS } from "@/constants";
import { GradientAvatar } from "@/components/GradientAvatar";
import { GridIcon, ReelIcon } from "@/components/Icons";
import { useAuth } from "@/components/AuthProvider";
import { auth, db } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { resizeImage } from "@/lib/imageUtils";

export const Profile = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("grid");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setEditName(profile.name || "");
      setEditUsername(profile.username || "");
      setEditBio(profile.bio || "");
      setEditAvatar(profile.avatar || "");
    }
  }, [profile]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", profile.uid), {
        name: editName,
        username: editUsername,
        bio: editBio,
        avatar: editAvatar
      });
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      alert("Gagal memperbarui profil. " + (err.message || " Pastikan database Firestore diizinkan."));
    } finally {
      setSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <button onClick={() => setIsEditing(false)} style={{ background: "none", border: "none", color: COLORS.text, fontSize: 16, cursor: "pointer" }}>Batal</button>
          <div style={{ fontWeight: 600, fontSize: 16 }}>Edit Profil</div>
          <button onClick={handleSaveProfile} disabled={saving} style={{ background: "none", border: "none", color: "#0095f6", fontSize: 16, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? "..." : "Selesai"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <div onClick={() => fileInputRef.current?.click()} style={{ position: "relative", cursor: "pointer", borderRadius: "50%", overflow: "hidden", border: `2px solid ${COLORS.border}` }}>
             <img src={editAvatar || profile?.avatar || ""} alt="Avatar" style={{ width: 80, height: 80, objectFit: "cover" }} />
             <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "white", fontSize: 10, textAlign: "center", padding: "4px 0" }}>Ubah</div>
          </div>
          <div onClick={() => fileInputRef.current?.click()} style={{ color: "#0095f6", fontWeight: 600, fontSize: 14, marginTop: 12, cursor: "pointer" }}>Ubah foto profil</div>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                try {
                  const resized = await resizeImage(e.target.files[0], 320, 320);
                  setEditAvatar(resized);
                } catch (err) {
                  console.error(err);
                }
              }
            }} 
            style={{ display: "none" }} 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.muted }}>Nama</span>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} style={{ background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, fontSize: 15, paddingBottom: 8, outline: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.muted }}>Nama Pengguna</span>
            <input type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} style={{ background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, fontSize: 15, paddingBottom: 8, outline: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.muted }}>Bio</span>
            <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} style={{ background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, fontSize: 15, paddingBottom: 8, outline: "none", resize: "none", minHeight: 60 }} />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
      {/* Top Bar for Profile */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", paddingTop: "calc(14px + env(safe-area-inset-top))", position: "sticky", top: 0, background: COLORS.bg, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span style={{ fontWeight: "bold", fontSize: 20, color: COLORS.text }}>{profile?.username}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <div style={{ background: COLORS.error, color: "white", fontSize: 11, fontWeight: "bold", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }}>5</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path><path d="M17.5 17.5l-2.5-2.5"></path>
          </svg>
          <div onClick={handleLogout} style={{ cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 12, marginTop: 16 }}>
          <div style={{ position: "relative" }}>
            <GradientAvatar src={profile?.avatar || "https://i.pravatar.cc/150"} size={88} />
            <div style={{ position: "absolute", top: -20, left: -10, background: COLORS.card, padding: "8px 12px", borderRadius: 16, fontSize: 12, color: COLORS.text, whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>Rencana<br/>akhir pekan?</div>
            <div style={{ position: "absolute", bottom: 0, right: 0, background: "#0095f6", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${COLORS.bg}` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, flex: 1, justifyContent: "space-around" }}>
            {[["0", "postingan"], ["472", "pengikut"], ["21", "mengikuti"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: "bold", fontSize: 18, color: COLORS.text }}>{n}</div>
                <div style={{ fontSize: 13, color: COLORS.text }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text, marginBottom: 2 }}>{profile?.name || "EL"}</div>
          {profile?.bio && <div style={{ fontSize: 14, color: COLORS.text, whiteSpace: "pre-wrap", lineHeight: 1.4 }}>{profile.bio}</div>}
        </div>
        
        {/* Buttons */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          <button onClick={() => setIsEditing(true)} style={{ flex: 1, padding: "8px 0", borderRadius: 8,
            background: COLORS.input, border: "none",
            color: COLORS.text, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
          >
            Edit profil
          </button>
          <button 
            onClick={handleShare}
            style={{ flex: 1, padding: "8px 0", borderRadius: 8,
            background: COLORS.input, border: "none",
            color: COLORS.text, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
          >
            {copied ? "Tersalin!" : "Bagikan profil"}
          </button>
          <button 
            style={{ padding: "8px 10px", borderRadius: 8,
            background: COLORS.input, border: "none",
            color: COLORS.text, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          </button>
        </div>

        {/* Highlights */}
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
             <div style={{ width: 64, height: 64, borderRadius: 32, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
               <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: COLORS.bg, border: `1px solid ${COLORS.muted}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </div>
             </div>
             <span style={{ fontSize: 12, color: COLORS.text }}>Baru</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
             <div style={{ width: 64, height: 64, borderRadius: 32, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
             </div>
             <span style={{ fontSize: 12, color: COLORS.text }}>Wisdom</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderTop: `1px solid ${COLORS.border}`, marginTop: 8 }}>
        {[{ id: "grid", Icon: GridIcon }, { id: "reel", Icon: ReelIcon }].map(({ id, Icon: TabIcon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ flex: 1, padding: "14px 0", background: "none", border: "none", cursor: "pointer",
              color: activeTab === id ? COLORS.text : COLORS.muted,
              borderBottom: activeTab === id ? `1px solid ${COLORS.text}` : "1px solid transparent",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TabIcon />
          </button>
        ))}
      </div>

      {/* Grid */}
      {activeTab === "grid" && (
        <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontSize: 14 }}>
          Belum ada postingan
        </div>
      )}
      {activeTab === "reel" && (
        <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontSize: 14 }}>
          Belum ada reels
        </div>
      )}
    </div>
  );
};
