import { createContext, ReactNode, useState } from "react";

interface AuthUser {
    email: string,
    username: string,
}

export interface UserContextType {
    user: any,
    setUser: any
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
  
    // You can include functions to update user information here
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }
