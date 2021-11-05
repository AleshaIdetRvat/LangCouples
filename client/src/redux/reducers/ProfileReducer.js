import { mainAPI } from "../../api/api"
import { newNotice } from "./NoticeReducer"

const SET_USER_DATA = "SET_USER_DATA"

const initState = {
    exercises: { completed: 0, solved: 0 },
    langs: { from: "", to: "" },
    email: "",
}

const ProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            const { exercises, langs, email } = action.userData

            return {
                ...state,
                exercises,
                langs,
                email,
            }

        default:
            return state
    }
}

const setUserData = (userData) => ({
    type: SET_USER_DATA,
    userData,
})

export const getUserData = () => async (dispatch) => {
    try {
        const userData = await mainAPI.getUserData()

        dispatch(setUserData(userData))
    } catch (error) {
        dispatch(newNotice(error.message, "warning"))
    }
}

export default ProfileReducer
