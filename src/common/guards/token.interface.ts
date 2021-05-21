import { ROLES } from "src/users/entities/user.entity";

export interface Token {

    id: string,
    role: ROLES,
    active: boolean,
    iat: Date,
    exp: Date

}