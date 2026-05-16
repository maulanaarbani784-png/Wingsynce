import { useState } from "react";
import { COLORS } from "@/constants";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: COLORS.bg }}>
      <div style={{ width: "100%", maxWidth: 360, background: COLORS.card, padding: 24, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 32,
          background: `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accent}, ${COLORS.accentOrange})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          WingSync
        </h1>
        
        {error && <div style={{ color: "red", fontSize: 13, marginBottom: 16, textAlign: "center" }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontSize: 14, outline: "none" }}
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontSize: 14, outline: "none" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", borderRadius: 8, background: COLORS.accent, color: "white", fontWeight: 600, fontSize: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>
        
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: COLORS.text }}>
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: COLORS.accent, fontWeight: 600, cursor: "pointer" }}>
            {isLogin ? "Daftar" : "Masuk"}
          </button>
        </div>
      </div>
    </div>
  );
};
