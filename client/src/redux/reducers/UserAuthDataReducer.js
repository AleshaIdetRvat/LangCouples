import { authAPI, setAuthToken } from "../../api/api"
import { setLangFrom, setLangTo } from "./UserPersonalDataReducer"

const LOGIN = "userauth/LOGIN"
const SET_ERROR_MSG = "userauth/SET_ERROR_MSG"
const SET_IS_AUTH = "userauth/SET_IS_AUTH"

const userDataStorage = "userData"

const ID = () => "_" + Math.random().toString(36).substr(2, 9)

const initState = {
    token: null,
    userId: null,
    isAuth: false,
    errorMsg: { text: null, id: null },
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
    try {
        const lowerCaseEmail = email.toLowerCase()

        const registrationResult = await authAPI.register(
            lowerCaseEmail,
            password
        )
        console.log("reg result", registrationResult)

        await dispath(login(lowerCaseEmail, password))
    } catch (error) {
        dispath(setErrorMsg(error.message))
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
    try {
        const lowerCaseEmail = email.toLowerCase()

        const authData = await authAPI.login(lowerCaseEmail, password)

        const { token, userId, langs } = authData

        if (langs !== null) {
            setLangFrom(langs.from)
            setLangTo(langs.to)
        }

        setAuthToken(token)

        dispath(setAuthData(token, userId))

        dispath(setIsAuth(true))

        localStorage.setItem(
            userDataStorage,
            JSON.stringify({ userId, token, langs })
        )
    } catch (error) {
        dispath(setErrorMsg(error.message))
    }
}

// thunk creator
export const initLogin = () => (dispath) => {
    const authInitData = JSON.parse(localStorage.getItem(userDataStorage))

    if (authInitData && authInitData.token) {
        dispath(setAuthData(authInitData.token, authInitData.token))
        console.log("init login")

        setAuthToken(authInitData.token)

        if (authInitData.langs) {
            setLangFrom(authInitData.langs.from)
            setLangTo(authInitData.langs.to)
        }
        dispath(setIsAuth(true))
    }
}

export default UserAuthDataReducer
