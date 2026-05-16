export const COLORS = {
  bg: "#000000",
  surface: "#121212",
  card: "#1a1a1a",
  border: "#262626",
  accent: "#0095f6",
  accentOrange: "#f77737",
  accentYellow: "#fcaf45",
  accentPurple: "#833ab4",
  text: "#fafafa",
  muted: "#a8a8a8",
  white: "#ffffff",
  input: "#262626",
  error: "#ed4956"
};

export const USERS = [
  { id: 1, username: "dinda.photo", name: "Dinda Rahayu", avatar: "https://i.pravatar.cc/150?img=47", verified: true },
  { id: 2, username: "arif.explore", name: "Arif Santoso", avatar: "https://i.pravatar.cc/150?img=12", verified: false },
  { id: 3, username: "maya.daily", name: "Maya Lestari", avatar: "https://i.pravatar.cc/150?img=45", verified: true },
  { id: 4, username: "reza_lens", name: "Reza Firmansyah", avatar: "https://i.pravatar.cc/150?img=8", verified: false },
  { id: 5, username: "sari.captures", name: "Sari Dewi", avatar: "https://i.pravatar.cc/150?img=49", verified: true },
  { id: 6, username: "budi.trip", name: "Budi Setiawan", avatar: "https://i.pravatar.cc/150?img=15", verified: false },
];

export const POSTS = [
  {
    id: 1, user: USERS[0],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    caption: "Puncak gunung selalu memberi perspektif baru 🏔️ #travel #alam #indonesia",
    likes: 1243, comments: [
      { user: USERS[1], text: "Luar biasa! Di mana ini?" },
      { user: USERS[2], text: "Indah banget 😍" },
    ], time: "2 jam lalu", location: "Gunung Rinjani, NTB"
  },
  {
    id: 2, user: USERS[1],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    caption: "Makan siang terbaik hari ini! 🍜 #kuliner #foodie #jakarta",
    likes: 892, comments: [
      { user: USERS[3], text: "Mau dong!" },
      { user: USERS[4], text: "Di mana restonya?" },
    ], time: "4 jam lalu", location: "Jakarta Selatan"
  },
  {
    id: 3, user: USERS[2],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    caption: "Golden hour di pantai 🌅 tidak ada yang bisa mengalahkan momen ini",
    likes: 2105, comments: [
      { user: USERS[0], text: "Wah cantik banget!" },
      { user: USERS[5], text: "Kapan ke sana lagi?" },
    ], time: "6 jam lalu", location: "Bali, Indonesia"
  },
];

export const EXPLORE_IMAGES = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
  "https://images.unsplash.com/photo-1529586691389-6b69d7a7c3e9?w=400&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&q=80",
  "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=400&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80",
  "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80",
  "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=400&q=80",
];
