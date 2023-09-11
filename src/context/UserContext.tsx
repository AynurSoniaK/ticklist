import { createContext, ReactNode, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthUser {
    uid : string,
    email: string,
    username: string,
    photo: string,
}

export interface UserContextType {
    user: AuthUser | null,
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

type UserProviderProps = {
    children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                const newUser = {
                    uid: userData.uid || '',
                    username: userData.displayName || '',
                    photo: userData.photoURL || '',
                    email: userData.email || '',
                };
                setUser(newUser);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
