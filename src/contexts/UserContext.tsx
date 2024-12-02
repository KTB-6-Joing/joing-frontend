import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {getRole} from "../services/userService.ts";

export type Role = 'creator' | 'planner' | null;

interface UserContextType {
    role: Role;
    setRole: (role: Role) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<Role>(() => {
        const storedRole = localStorage.getItem("role");
        return storedRole === "creator" || storedRole === "planner" ? storedRole : null;
    });

    // const fetchRole = async () => {
    //     try {
    //         const fetchedRole = await getRole();
    //         if (fetchedRole === "creator" || fetchedRole === "planner") {
    //             setRole(fetchedRole);
    //         } else {
    //             console.error("Invalid role received");
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch role:", error);
    //     }
    // };
    //
    // useEffect(() => {
    //     if (!role) {
    //         fetchRole();
    //     }
    // }, [role]);

    return (
        <UserContext.Provider value={{ role, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
