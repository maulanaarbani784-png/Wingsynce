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
      <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}`, paddingTop: "calc(14px + env(safe-area-inset-top))" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 16 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>{profile?.username}</span>
      </div>

      {/* Users List */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: COLORS.muted, marginBottom: 16 }}>Pesan</h3>
        {users.length === 0 ? (
          <div style={{ textAlign: "center", color: COLORS.muted, marginTop: 40, fontSize: 14 }}>Belum ada pengguna lain.</div>
        ) : (
          users.map((u) => (
            <div key={u.uid} onClick={() => setActiveChat(u)} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
              <GradientAvatar src={u.avatar} size={50} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{u.username}</div>
                <div style={{ fontSize: 13, color: COLORS.muted }}>Ketuk untuk mengobrol</div>
              </div>
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
