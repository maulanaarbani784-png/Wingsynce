import { COLORS } from "@/constants";
import { HomeIcon, SearchIcon, PlusIcon, HeartIcon, ProfileIcon } from "./Icons";

export const BottomNav = ({ active, setActive }: any) => {
  const tabs = [
    { id: "home", label: "Home", Icon: ({ filled }: any) => <HomeIcon filled={filled} /> },
    { id: "explore", label: "Cari", Icon: () => <SearchIcon /> },
    { id: "new", label: "Buat", Icon: () => <PlusIcon /> },
    { id: "activity", label: "Suka", Icon: ({ filled }: any) => <HeartIcon filled={filled} /> },
    { id: "profile", label: "Profil", Icon: ({ filled }: any) => <ProfileIcon filled={filled} /> },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 480, background: COLORS.bg,
      borderTop: `1px solid ${COLORS.border}`, display: "flex", zIndex: 100,
      paddingBottom: "env(safe-area-inset-bottom)" }}>
      {tabs.map(({ id, Icon }) => (
        <button key={id} onClick={() => setActive(id)}
          style={{ flex: 1, padding: "12px 0", background: "none", border: "none",
            cursor: "pointer", color: active === id ? COLORS.text : COLORS.muted,
            display: "flex", flexDirection: "column", alignItems: "center" }}>
          {id === "new"
            ? <div style={{ width: 32, height: 32, borderRadius: 8,
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}><Icon /></div>
            : <Icon filled={active === id} />
          }
        </button>
      ))}
    </div>
  );
};
