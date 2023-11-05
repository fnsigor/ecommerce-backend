export interface IUser{
    id?: number,
    email: string
    password: string
    name: string
    created_at?: Date
    updated_at?: Date
    deleted?: boolean
}