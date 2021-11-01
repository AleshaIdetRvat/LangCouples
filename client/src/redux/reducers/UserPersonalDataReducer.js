import { mainAPI } from "../../api/api"
import { newNotice } from "./NoticeReducer"
import { setFetching } from "./LessonReducer"

const INCREMENT_RESOLVED_EXMPLS = "INCREMENT_RESOLVED_EXMPLS"
const INCREMENT_ALL_EXMPLS = "INCREMENT_ALL_EXMPLS"
const SET_LANG_FROM = "SET_LANG_FROM"
const SET_LANG_TO = "SET_LANG_TO"

const initState = {
    langs: { from: "en", to: "ru" },
    resolvedExamplesAmount: 0,
    allExamplesAmount: 0,
}

const UserPersonalDataReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LANG_FROM:
            return {
                ...state,
                langs: { ...state.langs, from: action.lang },
            }
        case SET_LANG_TO:
            return {
                ...state,
                langs: { ...state.langs, to: action.lang },
            }
        default:
            return state
    }
}

export const incrementResolvedExamplesAmount = () => ({
    type: INCREMENT_RESOLVED_EXMPLS,
})

export const incrementAllExamplesAmount = () => ({
    type: INCREMENT_ALL_EXMPLS,
})

export const setLangFrom = (lang) => ({
    type: SET_LANG_FROM,
    lang,
})

export const setLangTo = (lang) => ({
    type: SET_LANG_TO,
    lang,
})

export const saveLangs = (langs) => async (dispath) => {
    dispath(setFetching(true))
    try {
        await mainAPI.putLangs(langs)
    } catch (error) {
        dispath(newNotice(error.message, "warning"))
    }

    dispath(setFetching(false))
}

export default UserPersonalDataReducer
