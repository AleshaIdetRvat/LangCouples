import { authAPI, setAuthTokenForAxiosInstance } from "../../api/api"
import { setLangFrom, setLangTo } from "./UserPersonalDataReducer"

const LOGIN = "userauth/LOGIN"
const SET_ERROR_MSG = "userauth/SET_ERROR_MSG"
const SET_IS_AUTH = "userauth/SET_IS_AUTH"
const SET_IS_FETCHING = "userauth/SET_IS_FETCHING"

const userDataStorage = "userData"

const ID = () => "_" + Math.random().toString(36).substr(2, 9)

const initState = {
    token: null,
    userId: null,
    isAuth: false,
    errorMsg: { text: null, id: null },
    isFetching: false,
}

const UserAuthDataReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.payload,
            }
        }
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.id,
            }
        case SET_ERROR_MSG:
            return {
                ...state,
                errorMsg: { text: action.errorMsg, id: ID() },
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
const setIsFetching = (payload) => ({
    type: SET_IS_FETCHING,
    payload,
})

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
export const register = (email, password) => async (dispath) => {
    dispath(setIsFetching(true))
    try {
        const lowerCaseEmail = email.toLowerCase()

        const registrationResult = await authAPI.register(
            lowerCaseEmail,
            password
        )
        console.log("reg result", registrationResult)

        await dispath(login(lowerCaseEmail, password))

        dispath(setIsFetching(false))
    } catch (error) {
        dispath(setErrorMsg(error.message))

        dispath(setIsFetching(false))
        throw new Error(error.message)
    }
}

// thunk creator
export const logout = () => (dispath) => {
    dispath(setAuthData(null, null))

    dispath(setIsAuth(false))

    localStorage.setItem(
        userDataStorage,
        JSON.stringify({ userId: null, token: null })
    )
}

// thunk creator
export const login = (email, password) => async (dispath) => {
    dispath(setIsFetching(true))
    try {
        const lowerCaseEmail = email.toLowerCase()

        const authData = await authAPI.login(lowerCaseEmail, password)

        const { token, userId, langs } = authData

        if (langs !== null) {
            dispath(setLangFrom(langs.from))
            dispath(setLangTo(langs.to))
        }

        setAuthTokenForAxiosInstance(token)

        dispath(setAuthData(token, userId))

        dispath(setIsAuth(true))

        localStorage.setItem(
            userDataStorage,
            JSON.stringify({ userId, token, langs })
        )
    } catch (error) {
        dispath(setErrorMsg(error.message))
    }

    dispath(setIsFetching(false))
}

// thunk creator
export const initLogin = () => (dispath) => {
    const authInitData = JSON.parse(localStorage.getItem(userDataStorage))

    if (authInitData && authInitData.token) {
        dispath(setAuthData(authInitData.token, authInitData.token))

        setAuthTokenForAxiosInstance(authInitData.token)

        if (authInitData.langs) {
            dispath(setLangFrom(authInitData.langs.from))
            dispath(setLangTo(authInitData.langs.to))
        }
        dispath(setIsAuth(true))
    }
}

export default UserAuthDataReducer
