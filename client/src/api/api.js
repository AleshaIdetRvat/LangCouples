import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
})

export const setAuthToken = (token) =>
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
    putLangs: async (langs) => {
        try {
            await axiosInstance.put(`user/langs`, langs)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
}

export const authAPI = {
    login: async (email, password) => {
        try {
            const resData = await axiosInstance.post(`auth/login`, { email, password })

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

const testAPI = {
    testReq: async (word) => {
        try {
            const resData = await axios.get(
                "https://lt-translate-test.herokuapp.com/?langpair=en-de&query=sleep&wortart=VERB"
            )

            return resData.data
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
}
window.testReq = testAPI.testReq
