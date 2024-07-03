export interface User {
    user_id?: number
    password?: string
    email?: string
    first_name?: string
    last_name?: string
}

export type AuthToken = {
    user: User
    iat: number
    eat: number
}
