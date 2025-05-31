import {ref} from "vue";

export const useUserStore = () => {
    const token = ref(localStorage.getItem("token"));
    const logout = () => {
        localStorage.removeItem("token");
    }
    return {
        token,
        logout
    }
}