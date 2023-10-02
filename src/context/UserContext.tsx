import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Task } from "../types";

interface AuthUser {
    uid: string,
    email: string,
    username: string,
    photo: string,
}

export interface UserContextType {
    user: AuthUser | null;
    userTasks: Task[] | null;
    userDateSelected: Date;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    setUserTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
    setUserDateSelected: React.Dispatch<React.SetStateAction<Date>>;
}

type UserProviderProps = {
    children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [userTasks, setUserTasks] = useState<Task[] | null>(null);
    const [userDateSelected, setUserDateSelected] = useState<Date>(new Date());

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

    useEffect(() => {
        const midnightDate = new Date(userDateSelected);
        midnightDate.setHours(0, 0, 0, 0);
        setUserDateSelected(midnightDate);
      }, [])

    return (
        <UserContext.Provider value={{ user, setUser, userTasks, setUserTasks, userDateSelected, setUserDateSelected }}>
            {children}
        </UserContext.Provider>
    );
}
