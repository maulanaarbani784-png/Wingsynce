import { useState } from "react";
import { COLORS } from "@/constants";
import { BottomNav } from "@/components/BottomNav";
import { Feed } from "@/pages/Feed";
import { Explore } from "@/pages/Explore";
import { Activity } from "@/pages/Activity";
import { Profile } from "@/pages/Profile";
import { Reels } from "@/pages/Reels";
import { Onboarding } from "@/pages/Onboarding";
import { CreatePost } from "@/pages/CreatePost";
import { Icon } from "@/components/Icons";
import { useAuth } from "@/components/AuthProvider";
import { Login } from "@/pages/Login";
import { ChatList } from "@/pages/Chat";

export default function App() {
  const { user, profile, loading } = useAuth();
  const [active, setActive] = useState("home");
  const [isChat, setIsChat] = useState(false);

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.bg, color: COLORS.text }}>
       <div style={{ width: 40, height: 40, border: "3px solid #262626", borderTopColor: "#fafafa", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
       <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
  if (!user || !profile) return <Login />;
  
  if (!profile.onboardingCompleted) {
    return <Onboarding />;
  }

  const renderPage = () => {
    if (isChat) return <ChatList onBack={() => setIsChat(false)} />;
    
    switch (active) {
      case "explore": return <Explore />;
      case "new": return <CreatePost onPostCreated={() => setActive("home")} />;
      case "reel": return <Reels />;
      case "profile": return <Profile />;
      case "home":
      default:
        return <Feed />;
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${COLORS.bg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        ::-webkit-scrollbar { display: none; }
        @keyframes heartPop {
          0% { opacity: 0; transform: scale(0.5); }
          30% { opacity: 1; transform: scale(1.2); }
          70% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <div style={{ maxWidth: 480, margin: "0 auto", height: "100dvh",
        background: COLORS.bg, paddingBottom: isChat ? "env(safe-area-inset-bottom)" : "calc(50px + env(safe-area-inset-bottom))", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        
        {/* Top bar, hide on Chat */}
        {!isChat && active === "home" && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`,
            position: "sticky", top: 0, background: COLORS.bg, zIndex: 50,
            paddingTop: "calc(10px + env(safe-area-inset-top))" }}>
            <span style={{ fontFamily: "'Grand Hotel', cursive", fontSize: 32, fontWeight: 500, letterSpacing: 0.5, color: COLORS.text }}>
              WingSync
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Icon d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" color={COLORS.text} />
              </button>
              <button onClick={() => setIsChat(true)} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <div style={{ position: "absolute", top: -4, right: -4, background: COLORS.error, color: "white", fontSize: 10, width: 16, height: 16, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>5</div>
              </button>
            </div>
          </div>
        )}

        {/* Page */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {renderPage()}
        </div>
      </div>
      {!isChat && <BottomNav active={active} setActive={setActive} />}
    </>
  );
}
