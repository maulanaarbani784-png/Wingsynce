import { useState } from "react";
import { COLORS } from "@/constants";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

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
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          email: email,
          username: email.split("@")[0], // Default temp username
          name: "",
          avatar: "https://i.pravatar.cc/150?u=" + cred.user.uid,
          verified: false,
          bio: "",
          onboardingCompleted: false
        }, { merge: true });
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: COLORS.bg }}>
      <div style={{ width: "100%", maxWidth: 350, background: COLORS.card, padding: "40px 30px", borderRadius: 12, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'Grand Hotel', cursive", fontSize: 48, fontWeight: 500, textAlign: "center", marginBottom: 32, letterSpacing: 1, color: COLORS.text }}>
          WingSync
        </h1>
        
        {!isLogin && (
          <p style={{ color: COLORS.muted, textAlign: "center", fontSize: 16, fontWeight: 600, marginBottom: 20, lineHeight: 1.4 }}>
            Sign up to see photos and videos from your friends.
          </p>
        )}
        
        {error && <div style={{ color: "#ed4956", fontSize: 14, marginBottom: 16, textAlign: "center", background: "rgba(237, 73, 86, 0.1)", padding: 10, borderRadius: 4 }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontSize: 13, outline: "none" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontSize: 13, outline: "none" }}
          />
          
          {isLogin && (
            <div style={{ textAlign: "right", marginTop: 4, marginBottom: 4 }}>
              <a href="#" style={{ color: COLORS.text, fontSize: 12, textDecoration: "none" }}>Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{ width: "100%", padding: "10px", marginTop: 8, borderRadius: 8, background: "#0095f6", color: "white", fontWeight: 600, fontSize: 14, border: "none", cursor: (loading || !email || !password) ? "not-allowed" : "pointer", opacity: (loading || !email || !password) ? 0.7 : 1, transition: "0.2s" }}
          >
            {loading ? "Loading..." : isLogin ? "Log in" : "Sign up"}
          </button>
        </form>
        
        {isLogin && (
          <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: COLORS.border }}></div>
            <div style={{ margin: "0 18px", color: COLORS.muted, fontSize: 13, fontWeight: 600 }}>OR</div>
            <div style={{ flex: 1, height: 1, background: COLORS.border }}></div>
          </div>
        )}
      </div>

      {/* Switch Form Card */}
      <div style={{ width: "100%", maxWidth: 350, background: COLORS.card, padding: 20, borderRadius: 12, border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
        <div style={{ fontSize: 14, color: COLORS.text }}>
          {isLogin ? "Don't have an account? " : "Have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} style={{ background: "none", border: "none", color: "#0095f6", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};
