import { createContext, useContext, useState, useEffect } from "react";
import serverAPI from "@/api/axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const authenticate = (userData) => {
        setIsLoading(false);
        setUser(userData);
        setIsAuthenticated(true);
    };

    useEffect(() => {
        // Call your API to check user authentication status
        const checkForUser = async () => {
            try {
                const res = await serverAPI.get("/api/auth/refresh");
                if (res.status === 200) {
                    authenticate(res.data);
                }
            } catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        };
        checkForUser();
    }, []);

    return (
        <UserContext.Provider
            value={{ user, isAuthenticated, isLoading, authenticate }}
        >
            {children}
        </UserContext.Provider>
    );
};

function useUser() {
    return useContext(UserContext);
}

export { UserProvider, useUser };
