import { ReactNode } from "react";

export interface IUsers {
    _id?: string | undefined,
    first_name: ReactNode | string | File,
    last_name: FormDataEntryValue | null,
    avatar: string | undefined,
    age:number | null,
    role: FormDataEntryValue | null | string,
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
    description: FormDataEntryValue | null,
    image?: string | undefined
}

export interface IUsersPromise{
    count: number,
    users: IUsers[]
}