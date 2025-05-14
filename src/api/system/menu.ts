import {post} from "@utils/request";

export const saveMenu = (data) => {
    return post('/api/menu', data)
}