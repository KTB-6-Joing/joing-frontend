import {createContext, useContext, useState, ReactNode} from "react";
//import {getRole} from "../services/userService.ts";

export type Role = 'CREATOR' | 'PRODUCT_MANAGER' | null;

interface UserContextType {
    role: Role;
    setRole: (role: Role) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<Role>(() => {
        const storedRole = localStorage.getItem("role");
        return storedRole === "CREATOR" || storedRole === "PRODUCT_MANAGER" ? storedRole : null;
    });

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
