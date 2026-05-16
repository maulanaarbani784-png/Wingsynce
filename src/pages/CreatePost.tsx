import { useState, useRef } from "react";
import { COLORS } from "@/constants";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const CreatePost = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const { profile } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePost = async () => {
    if (!file || !profile) return;
    setLoading(true);

    try {
      // For now, storing as base64 in Firestore for simplicity if it's small,
      // but in real app we'd use Firebase Storage.
      // Assuming we just use the previewUrl (data URL)
      await addDoc(collection(db, "posts"), {
        userId: profile.uid,
        username: profile.username,
        userAvatar: profile.avatar,
        imageUrl: previewUrl,
        caption,
        likes: 0,
        createdAt: serverTimestamp(),
      });
      
      alert("Postingan berhasil diunggah!");
      onPostCreated();
      
    } catch (error: any) {
      alert("Gagal mengunggah: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: COLORS.bg, height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
        <button onClick={onPostCreated} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text, fontWeight: 600 }}>Tutup</button>
        <span style={{ fontWeight: 600, fontSize: 16 }}>Postingan Baru</span>
        <button 
          onClick={handlePost} 
          disabled={!file || loading}
          style={{ background: "none", border: "none", color: (!file || loading) ? COLORS.muted : "#0095f6", fontWeight: 600, cursor: (!file || loading) ? "not-allowed" : "pointer" }}
        >
          {loading ? "..." : "Bagikan"}
        </button>
      </div>

      <div style={{ padding: 16, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Profile and Caption Input */}
        <div style={{ display: "flex", gap: 12 }}>
          <img src={profile?.avatar} alt="" style={{ width: 36, height: 36, borderRadius: 18, objectFit: "cover" }} />
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Tulis keterangan untuk postingan ini..."
            style={{ flex: 1, border: "none", background: "none", resize: "none", minHeight: 60, color: COLORS.text, outline: "none", fontSize: 14 }}
          />
        </div>

        {/* Media Preview or Picker */}
        {previewUrl ? (
          <div style={{ position: "relative", width: "100%", borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
            {file?.type.startsWith("video/") ? (
              <video src={previewUrl} controls style={{ width: "100%", maxHeight: 400, objectFit: "contain", background: "black" }} />
            ) : (
              <img src={previewUrl} alt="Preview" style={{ width: "100%", maxHeight: 400, objectFit: "contain", background: "black" }} />
            )}
            <button 
              onClick={() => { setFile(null); setPreviewUrl(""); }}
              style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", border: "none", color: "white", width: 28, height: 28, borderRadius: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              ×
            </button>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              width: "100%", height: 300, border: `2px dashed ${COLORS.border}`, borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 12, color: COLORS.text 
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span style={{ fontWeight: 600 }}>Pilih dari perangkat</span>
            <span style={{ fontSize: 12, color: COLORS.muted }}>Mendukung Foto dan Video</span>
          </div>
        )}

        <input 
          type="file" 
          accept="image/*,video/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: "none" }} 
        />
      </div>
    </div>
  );
};
