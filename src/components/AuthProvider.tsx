import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

interface UserProfile {
  uid: string;
  email: string;
  username: string;
  name: string;
  avatar: string;
  verified: boolean;
  bio: string;
  birthday?: string;
  onboardingCompleted?: boolean;
}

const AuthContext = createContext<{ user: User | null; profile: UserProfile | null; loading: boolean }>({
  user: null,
  profile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: () => void;

    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const userRef = doc(db, "users", u.uid);
        unsubscribeProfile = onSnapshot(
          userRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setProfile(docSnap.data() as UserProfile);
              setLoading(false);
            } else {
              const profileData: UserProfile = {
                uid: u.uid,
                email: u.email || "",
                username: (u.email || "").split("@")[0],
                name: "",
                avatar: "https://i.pravatar.cc/150?u=" + u.uid,
                verified: false,
                bio: "",
                onboardingCompleted: false,
              };
              setDoc(userRef, profileData).catch(console.error);
              setProfile(profileData);
              setLoading(false);
            }
          },
          (error) => {
            console.error("Error fetching profile:", error);
            setLoading(false);
          }
        );
      } else {
        setProfile(null);
        setLoading(false);
        if (unsubscribeProfile) {
          unsubscribeProfile();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  return <AuthContext.Provider value={{ user, profile, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
