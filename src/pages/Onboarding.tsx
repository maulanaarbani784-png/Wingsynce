import { useState, useRef } from "react";
import { COLORS } from "@/constants";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

import { resizeImage } from "@/lib/imageUtils";

export const Onboarding = () => {
  const { profile } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState(profile?.username || "");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState(profile?.avatar || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const resized = await resizeImage(e.target.files[0], 320, 320);
        setAvatar(resized);
      } catch (error) {
        console.error("Gagal mengubah foto:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", profile.uid), {
        name,
        username,
        birthday,
        avatar,
        onboardingCompleted: true,
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: COLORS.bg }}>
      <div style={{ width: "100%", maxWidth: 350, background: COLORS.card, padding: "40px 30px", borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
        <h1 style={{ fontFamily: "'Grand Hotel', cursive", fontSize: 32, fontWeight: 500, textAlign: "center", marginBottom: 16, color: COLORS.text }}>
          Lengkapi Profil Anda
        </h1>
        <p style={{ color: COLORS.muted, textAlign: "center", fontSize: 14, marginBottom: 24, lineHeight: 1.4 }}>
          Tambahkan foto profil, nama, dan tanggal lahir Anda untuk melanjutkan.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 8 }}>
            <div 
              style={{ width: 80, height: 80, borderRadius: 40, border: `2px solid ${COLORS.border}`, overflow: "hidden", cursor: "pointer", position: "relative" }}
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "white", fontSize: 10, textAlign: "center", padding: "4px 0" }}>
                Ubah
              </div>
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
          </div>

          <input
            type="text"
            placeholder="Ketik Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontSize: 13, outline: "none" }}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontSize: 13, outline: "none" }}
          />

          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 12, color: COLORS.muted }}>Tanggal Lahir</span>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
              style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontSize: 13, outline: "none" }}
            />
          </label>

          <button
            type="submit"
            disabled={loading || !name || !username || !birthday}
            style={{ width: "100%", padding: "10px", marginTop: 8, borderRadius: 8, background: "#0095f6", color: "white", fontWeight: 600, fontSize: 14, border: "none", cursor: (loading || !name || !username || !birthday) ? "not-allowed" : "pointer", opacity: (loading || !name || !username || !birthday) ? 0.7 : 1, transition: "0.2s" }}
          >
            {loading ? "Memproses..." : "Selesai"}
          </button>
        </form>
      </div>
    </div>
  );
};
