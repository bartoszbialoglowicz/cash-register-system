import { createContext, useEffect, useState } from "react";
import { AuthState, Token, User } from "../utils/types";

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('user') ? true : false,
    user: localStorage.getItem('user') ? 
        JSON.parse(localStorage.getItem('user')!) : 
        {
            id: -1,
            username: '',
            isStaff: false,
            firstName: '',
            lastName: '',
        },
    token: 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) :
        {
            access: '',
            refresh: ''
        },
    assignNewToken: (access: string, refresh?: string) => {},
    login: (user: User, token: Token) => {},
    logout: () => {}
};

export const UserContext = createContext(initialState);

const UserContextProvider: React.FC<{children: JSX.Element}> = (props) => {

    const [user, setUser] = useState(initialState.user);
    const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
    const [token, setToken] = useState(initialState.token);

    const loginHandler = (user: User, token: Token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        setIsAuthenticated(true);
        setUser(user);
        setToken(token);
    }

    const logoutHandler = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(initialState.user);
        setToken(initialState.token);
        setIsAuthenticated(false);
    }

    const assignNewToken = (access: string, refresh?: string) => {
        const newToken = {access: access, refresh: refresh ? refresh : token.refresh}
        setToken(newToken);
        localStorage.setItem('token', JSON.stringify(newToken));
    }

    useEffect(() => {
        const localStorageItem = localStorage.getItem('user');
        const localStorageToken = localStorage.getItem('token');
        if (localStorageItem && localStorageToken) {
            setUser(JSON.parse(localStorageItem));
            setToken(JSON.parse(localStorageToken));
            setIsAuthenticated(true);
        }
    }, []);

    const contextValue: AuthState = {
        user: user,
        isAuthenticated: isAuthenticated,
        token: token,
        assignNewToken: assignNewToken,
        login: loginHandler,
        logout: logoutHandler
    }

    return <UserContext.Provider value={contextValue}>
        {props.children}
    </UserContext.Provider>
};

export default UserContextProvider;