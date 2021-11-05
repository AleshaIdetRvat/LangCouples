import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
})

export const setAuthTokenForAxiosInstance = (token) =>
    axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = token ? `Bearer ${token}` : ""
        return config
    })

export const mainAPI = {
    getCouples: async ({ langFrom, langTo, theme, keyword }) => {
        try {
            const response = await axiosInstance.get(
                `couples?from=${langFrom}&to=${langTo}&theme=${theme}&keyword=${keyword}`
            )

            return response.data // couples
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getUserData: async () => {
        try {
            const { data } = await axiosInstance.get(`user/`)

            return data
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    putLangs: async (langs) => {
        try {
            await axiosInstance.put(`user/langs`, langs)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    updateStatisticOfExercises: async (exercises) => {
        try {
            await axiosInstance.put(`user/exercises`, exercises)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
}

export const authAPI = {
    login: async (email, password) => {
        try {
            const resData = await axiosInstance.post(`auth/login`, {
                email,
                password,
            })

            return resData.data
        } catch (error) {
            throw new Error(error.response.data.message)
        }
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
