import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
})

export const authAPI = {
    login: async (email, password) => {
        try {
            const resData = await axiosInstance.post(`auth/login`, { email, password })
            return resData
        } catch (error) {}
    },

    register: async (email, password) => {
        try {
            const resData = await axiosInstance.post(`auth/register`, {
                email,
                password,
            })
            return resData
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
}
