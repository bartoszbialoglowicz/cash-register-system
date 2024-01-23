export type ServerAuthResponse = {
    code: number,
    message: string,
    user?: User
}

export type User = {
    id: number,
    username: string,
    isAdmin: boolean
}

export type AuthState = {
    isAuthenticated: boolean,
    user: User,
    login: (user: User) => void,
    logout: () => void
}

export type MenuItem = {
    id: number,
    text: string,
    icon: string,
    elementToRender: JSX.Element,
    requireAdmin: boolean
}