import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const useUserContext = () => {
    const [user, setUser] = useContext(UserContext);

    const handleUser = (value) => {
        setUser(value);
    };

    return { value: user, onChange: handleUser };
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, useUserContext };
