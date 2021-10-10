import { authAPI } from "../../api/api"

const LOGIN = "userauth/LOGIN"
const SET_ERROR_MSG = "userauth/SET_ERROR_MSG"
const SET_IS_AUTH = "userauth/SET_IS_AUTH"

const userDataStorage = "userData"

const initState = {
    token: null,
    userId: null,
    isAuth: false,
    errorMsg: null,
}

const UserAuthDataReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.id,
            }
        case SET_ERROR_MSG:
            return {
                ...state,
                errorMsg: action.errorMsg,
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth,
            }
        default:
            return state
    }
}
// action creator
const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH,
    isAuth,
})

// action creator
const setErrorMsg = (msg) => ({
    type: SET_ERROR_MSG,
    errorMsg: msg,
})

// action creator
const setAuthData = (jwtToken, id) => ({
    type: LOGIN,
    token: jwtToken,
    id,
})

// thunk creator
export const login = (email, password) => async (dispath) => {
    try {
        const data = await authAPI.login(email, password)

        const { token, userId } = data
        console.log("LOGIN success")

        dispath(setAuthData(token, userId))
        dispath(setIsAuth(true))
        localStorage.setItem(userDataStorage, JSON.stringify({ userId, token }))
    } catch (error) {
        dispath(setErrorMsg(error.message))
    }
}

export const register = (email, password) => async (dispath) => {
    try {
        await authAPI.register(email, password)
        dispath(login(email, password))
    } catch (error) {
        dispath(setErrorMsg(error.message))
    }
}

// thunk creator
export const logout = () => (dispath) => {
    dispath(setAuthData(null, null))
    localStorage.setItem(userDataStorage, JSON.stringify({ userId: null, token: null }))
}

// thunk creator
export const initLogin = () => (dispath) => {
    const authInitData = JSON.parse(localStorage.getItem(userDataStorage))

    if (authInitData && authInitData.token) {
        dispath(setAuthData(authInitData.token, authInitData.token))
    }
}

export default UserAuthDataReducer
