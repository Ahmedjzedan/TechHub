"use client";

import { createContext, useContext, ReactNode } from "react";

// Define the shape of the user object and the context
type User = {
  id: number;
  name: string;
  email: string;
} | null;

interface SessionContextType {
  user: User;
}

// Create the context with a default value
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Define the provider component
export function SessionProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
}

// Create a custom hook for easy access to the context
export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
