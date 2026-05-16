import { COLORS } from "@/constants";

export const Icon = ({ d, size = 24, filled = false, color = "currentColor", strokeWidth = 1.8 }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}
    stroke={filled ? "none" : color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const HomeIcon = ({ filled }: any) => <Icon filled={filled} color={filled ? COLORS.text : COLORS.text}
  d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />;
export const SearchIcon = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" color={COLORS.text} />;
export const PlusIcon = () => <Icon d="M12 5v14M5 12h14" color={COLORS.text} strokeWidth={2} />;
export const HeartIcon = ({ filled }: any) => <Icon filled={filled} color={filled ? COLORS.accent : COLORS.text}
  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />;
export const CommentIcon = () => <Icon d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" color={COLORS.text} />;
export const ShareIcon = () => <Icon d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" color={COLORS.text} />;
export const BookmarkIcon = ({ filled }: any) => <Icon filled={filled} color={filled ? COLORS.text : COLORS.text}
  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />;
export const ProfileIcon = ({ filled }: any) => <Icon filled={filled} color={COLORS.text}
  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />;
export const LocationIcon = () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a1 1 0 100-2 1 1 0 000 2z" size={12} color={COLORS.muted} />;
export const VerifiedIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill={COLORS.accent}>
    <path d="M12 2l2.4 4.8 5.6.8-4 3.9.9 5.5L12 14.5l-4.9 2.5.9-5.5-4-3.9 5.6-.8z" />
  </svg>
);
export const MoreIcon = () => <Icon d="M5 12h.01M12 12h.01M19 12h.01" color={COLORS.text} strokeWidth={2.5} />;
export const GridIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
export const ReelIcon = () => <Icon d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" color="currentColor" />;
