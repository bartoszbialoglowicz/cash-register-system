export type ServerAuthResponse = {
    code: number,
    message: string,
    user?: User
}

export type User = {
    id: number;
    username: string;
}

export type AuthState = {
    isAuthenticated: boolean,
    user: User,
    login: (user: User) => void,
    logout: () => void
}