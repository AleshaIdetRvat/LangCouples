import { mainAPI } from "../../api/api"
import { newNotice } from "./NoticeReducer"

const SET_LANG_FROM = "SET_LANG_FROM"
const SET_LANG_TO = "SET_LANG_TO"
const SET_COUPLES = "SET_COUPLES"
const SET_FETCHING = "SET_FETCHING"

const initState = {
    langs: { from: "en", to: "ru" },
    couples: [],
    isFetching: true,
}

const UserPersonalDataReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case SET_COUPLES:
            return {
                ...state,
                couples: action.couples,
            }
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

const setCouples = (couples) => ({
    type: SET_COUPLES,
    couples,
})

const setFetching = (isFetching) => ({
    type: SET_FETCHING,
    isFetching,
})

export const setLangFrom = (lang) => ({
    type: SET_LANG_FROM,
    lang,
})

export const setLangTo = (lang) => ({
    type: SET_LANG_TO,
    lang,
})

export const getCouples =
    ({ langFrom, langTo, theme, keyword }) =>
    async (dispath) => {
        dispath(setFetching(true))
        try {
            if (keyword && keyword.split(" ").length !== 1)
                throw new Error("Please enter one word")

            const couples = await mainAPI.getCouples({ langFrom, langTo, theme, keyword })

            dispath(setCouples(couples))
        } catch (error) {
            dispath(newNotice(error.message, "warning"))
        }

        dispath(setFetching(false))
    }

export const saveLangs = (langs) => async (dispath) => {
    // dispath( setFetching(true) )
    try {
        await mainAPI.putLangs(langs)
    } catch (error) {
        dispath(newNotice(error.message, "warning"))
    }

    // dispath( setFetching(false) )
}

export default UserPersonalDataReducer
