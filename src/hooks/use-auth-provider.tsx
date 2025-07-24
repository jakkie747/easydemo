
"use client"

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOutUser: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const auth = getAuth(app);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
       toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
       console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out.",
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
