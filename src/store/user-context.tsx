import { createContext, useEffect, useState } from "react";
import { AuthState, User } from "../utils/types";

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: -1,
        username: '',
        isAdmin: false
    },
    login: (user: User) => {},
    logout: () => {}
};

export const UserContext = createContext(initialState);

const UserContextProvider: React.FC<{children: JSX.Element}> = (props) => {

    const [user, setUser] = useState(initialState.user);
    const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);

    const loginHandler = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem('user');
        setUser(initialState.user);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const localStorageItem = localStorage.getItem('user');
        if (localStorageItem) {
            setUser(JSON.parse(localStorageItem));
            setIsAuthenticated(true);
        }
    }, []);

    const contextValue: AuthState = {
        user: user,
        isAuthenticated: isAuthenticated,
        login: loginHandler,
        logout: logoutHandler
    }

    return <UserContext.Provider value={contextValue}>
        {props.children}
    </UserContext.Provider>
};

export default UserContextProvider;