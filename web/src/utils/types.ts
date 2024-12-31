export type AuthUser = {
    email: string
}

export type AuthContextType = {
    token: string|null,
    user: AuthUser|null,
    login: ({email, password}: {email: string, password: string}) => Promise<void>,
    logout: () => void
}

export type Contact = {
    id?: string,
    fullName: string,
    email: string,
    phone: string,
    gender: 'male'| 'female'
}