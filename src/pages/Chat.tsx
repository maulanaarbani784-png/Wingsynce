import { useEffect, useState, useRef } from "react";
import { COLORS } from "@/constants";
import { Icon } from "@/components/Icons";
import { GradientAvatar } from "@/components/GradientAvatar";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/firebase";
import { collection, getDocs, doc, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";

interface AppUser {
  uid: string;
  username: string;
  avatar: string;
}

export const ChatList = ({ onBack }: { onBack: () => void }) => {
  const { profile } = useAuth();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [activeChat, setActiveChat] = useState<AppUser | null>(null);

  useEffect(() => {
    // Fetch all users to chat with
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      const userList: AppUser[] = [];
      snap.forEach((doc) => {
        if (doc.id !== profile?.uid) {
          userList.push(doc.data() as AppUser);
        }
      });
      setUsers(userList);
    };
    fetchUsers();
  }, [profile]);

  if (activeChat) {
    return <ChatRoom otherUser={activeChat} onBack={() => setActiveChat(null)} />;
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: COLORS.bg }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", paddingTop: "calc(14px + env(safe-area-inset-top))" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>{profile?.username}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <div style={{ width: 8, height: 8, background: COLORS.error, borderRadius: 4, marginLeft: 2 }} />
          </div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </div>

      <div style={{ padding: "0 16px 16px" }}>
        {/* Search */}
        <div style={{ background: COLORS.input, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input placeholder="Cari atau tanya Meta AI" style={{ background: "none", border: "none", outline: "none", color: COLORS.text, fontSize: 15, width: "100%" }} />
        </div>
        
        {/* Notes */}
        <div style={{ display: "flex", gap: 16, marginTop: 24, overflowX: "auto", paddingBottom: 8 }}>
           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
             <div style={{ position: "absolute", top: -20, background: COLORS.card, padding: "6px 12px", borderRadius: 12, fontSize: 11, color: COLORS.muted, whiteSpace: "nowrap" }}>Bagikan catatan</div>
             <GradientAvatar src={profile?.avatar || ""} size={68} />
             <span style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, textAlign: "center" }}>Catatan Anda</span>
           </div>
           {users.slice(0, 3).map((u, i) => (
             <div key={u.uid} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
               <div style={{ position: "absolute", top: -20, background: COLORS.card, padding: "6px 12px", borderRadius: 12, fontSize: 11, color: COLORS.text, whiteSpace: "nowrap" }}>{["Siap-siap", "Lagi sibuk", "Main?"][i % 3]}</div>
               <GradientAvatar src={u.avatar} size={68} />
               <span style={{ fontSize: 12, color: COLORS.text, marginTop: 6 }}>{u.username}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Users List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 16px 16px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Pesan</h3>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#6e91f6" }}>Permintaan</h3>
        </div>
        
        {users.length === 0 ? (
          <div style={{ textAlign: "center", color: COLORS.muted, marginTop: 40, fontSize: 14 }}>Belum ada pesan.</div>
        ) : (
          users.map((u) => (
            <div key={u.uid} onClick={() => setActiveChat(u)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 16px", cursor: "pointer", background: "transparent", border: "none", width: "100%" }}>
              <GradientAvatar src={u.avatar} size={56} />
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>{u.name || u.username}</div>
                <div style={{ fontSize: 14, color: COLORS.muted, display: "flex", gap: 6 }}>
                  <span>Panggilan ...</span>
                  <span>·</span>
                  <span>4 mg</span>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); alert("Fitur telepon belum tersedia"); }} style={{ background: "#3943b0", color: COLORS.white, border: "none", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                TELEPON
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const ChatRoom = ({ otherUser, onBack }: { otherUser: AppUser; onBack: () => void }) => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const getConvoId = () => {
    if (!profile) return "";
    return [profile.uid, otherUser.uid].sort().join("_");
  };

  useEffect(() => {
    if (!profile) return;
    const convoId = getConvoId();
    const q = query(collection(db, "conversations", convoId, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const msgs: any[] = [];
      snap.forEach((doc) => {
        const data = doc.data();
        msgs.push({ id: doc.id, ...data, timestamp: data.createdAt?.toMillis() || Date.now() });
      });
      setMessages(msgs);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return () => unsubscribe();
  }, [profile]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !profile) return;
    
    const convoId = getConvoId();
    const msgText = text;
    setText(""); // Optimistic clear

    await addDoc(collection(db, "conversations", convoId, "messages"), {
      text: msgText,
      senderId: profile.uid,
      createdAt: serverTimestamp()
    });
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: COLORS.bg, height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}`, paddingTop: "calc(14px + env(safe-area-inset-top))" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 16 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <GradientAvatar src={otherUser.avatar} size={32} />
        <span style={{ fontWeight: 600, fontSize: 16, color: COLORS.text, marginLeft: 10 }}>{otherUser.username}</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m) => {
          const isMe = m.senderId === profile?.uid;
          return (
            <div key={m.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "75%",
              background: isMe ? COLORS.accent : COLORS.surface, color: isMe ? "white" : COLORS.text,
              padding: "10px 14px", borderRadius: 18, borderBottomRightRadius: isMe ? 4 : 18, borderBottomLeftRadius: isMe ? 18 : 4 }}>
              <div style={{ fontSize: 14 }}>{m.text}</div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.border}` }}>
        <form onSubmit={handleSend} style={{ display: "flex", alignItems: "center", background: COLORS.surface, borderRadius: 24, padding: "8px 16px" }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis pesan..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: COLORS.text, fontSize: 14 }}
          />
          <button type="submit" disabled={!text.trim()} style={{ background: "none", border: "none", color: COLORS.accent, fontWeight: 700, fontSize: 14, opacity: !text.trim() ? 0.5 : 1, cursor: "pointer", marginLeft: 8 }}>
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};
