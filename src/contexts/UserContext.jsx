import { createContext, useContext, useState } from "react";
import serverAPI from "@/api/axios";

const UserContext = createContext();
const UserUpdateContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function checkForUserToken() {
        const res = await serverAPI.get("/api/auth/refresh");
        setUser(res.data.user);
    }

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={checkForUserToken}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
};

function useUser() {
    return useContext(UserContext);
}

function useUserUpdate() {
    return useContext(UserUpdateContext);
}

export { UserProvider, useUser, useUserUpdate };
