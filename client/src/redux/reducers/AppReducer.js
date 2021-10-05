import { initLogin } from "./UserAuthDataReducer"

const INITIALIZE_SUCCES = "INITIALIZE_SUCCES"
const initState = {
    isReady: false,
}

const AppReducer = (state = initState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCES:
            return {
                ...state,
                isReady: true,
            }
        default:
            return state
    }
}

const initSucces = () => ({
    type: INITIALIZE_SUCCES,
})

export const initializeApp = () => async (dispatch) => {
    const userAuth = dispatch(initLogin())

    await Promise.all([userAuth])

    dispatch(initSucces())
}

export default AppReducer
