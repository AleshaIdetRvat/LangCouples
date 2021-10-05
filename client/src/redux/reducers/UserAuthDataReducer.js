const LOGIN = "LOGIN"

const userDataStorage = "userData"

const initState = {
    token: null,
    userId: null,
    isAuth: false,
}

const UserAuthDataReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.id,
            }
        default:
            return state
    }
}
// action creator
const setAuthData = (jwtToken, id) => ({
    type: LOGIN,
    token: jwtToken,
    id,
})

// thunk creator
export const login = (jwtToken, id) => (dispath) => {
    dispath(setAuthData(jwtToken, id))
    localStorage.setItem(userDataStorage, JSON.stringify({ userId: id, token: jwtToken }))
}

// thunk creator
export const initLogin = () => (dispath) => {
    const authInitData = JSON.parse(localStorage.getItem(userDataStorage))

    if (authInitData && authInitData.token) {
        dispath(setAuthData(authInitData.token, authInitData.token))
    }
}

export default UserAuthDataReducer
