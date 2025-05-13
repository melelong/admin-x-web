import {post} from "@utils/request";

export const userRegister = (data) => {
    return post('/api/auth/register', data)
}