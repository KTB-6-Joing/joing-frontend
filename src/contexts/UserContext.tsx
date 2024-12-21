import {createContext, useContext, useState, ReactNode} from "react";
import {Role} from "../constants/roles.ts";

interface UserContextType {
    role: Role | null;
    setRole: (role: Role | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
let globalSetRole: ((role: Role | null) => void) | null = null;

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<Role | null>(() => {
        const storedRole = localStorage.getItem("role");
        if (storedRole === Role.CREATOR || storedRole === Role.PRODUCT_MANAGER) {
            return storedRole as Role;
        }
        return null;
    });

    globalSetRole = setRole;

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

export const resetUserRole = () => {
    if (globalSetRole) {
        globalSetRole(null);
    }
};
