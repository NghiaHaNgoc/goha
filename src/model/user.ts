export type User = {
    id: number,
    username: string,
    password: string,
    fullName: string,
    email: string,
    gender: string,
    role: Role,
    avatar: string,
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Role {
    ADMIN = "ADMIN",
    SALON_OWNER = "SALON_OWNER",
    CUSTOMER = "CUSTOMER"
}