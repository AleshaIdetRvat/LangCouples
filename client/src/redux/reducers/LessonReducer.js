import { mainAPI } from "../../api/api"
import { newNotice } from "./NoticeReducer"
import { shuffleArray } from "../../utils/arrayShuffle"

const INCREMENT_EX_NUM = "INCREMENT_EX_NUM"
const SET_COUPLES = "SET_COUPLES"
const SET_ANSWER_PIECE = "SET_ANSWER_PIECE"
const SET_WORD_OPTION = "SET_WORD_OPTION"
const CREATE_EXAMLE = "CREATE_EXAMLE"
const SET_FETCHING = "SET_FETCHING"

const initState = {
    couples: [],
    isFetching: true,
    exampleNumber: 0, // Current example number
    piecesOfAnswer: [],
    optionsOfWords: [],
}

const LessonReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_EXAMLE: {
            const confusingItems = state.couples[
                Math.trunc(Math.random() * state.couples.length)
            ]?.to
                .split(" ")
                .slice(1, 4)

            let shuffledOptions = [
                ...state.couples[state.exampleNumber]?.to.split(" "),
                ...confusingItems,
            ]
            console.log("shuffldOptions: ", shuffledOptions)

            for (let i = shuffledOptions.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                ;[shuffledOptions[i], shuffledOptions[j]] = [
                    shuffledOptions[j],
                    shuffledOptions[i],
                ]
            }

            shuffledOptions = shuffledOptions.map((word) => ({
                word,
                isChecked: false,
            }))

            return {
                ...state,
                optionsOfWords: shuffledOptions,
            }
        }

        case SET_ANSWER_PIECE: {
            return {
                ...state,
                piecesOfAnswer: [...state.piecesOfAnswer, action.piece],
                optionsOfWords: state.optionsOfWords.map((option) =>
                    option.word === action.piece
                        ? {
                              word: action.piece,
                              isChecked: true,
                          }
                        : option
                ),
            }
        }
        case SET_WORD_OPTION: {
            return {
                ...state,
                piecesOfAnswer: state.piecesOfAnswer.filter(
                    (otherWord) => otherWord !== action.option
                ),
                optionsOfWords: state.optionsOfWords.map((option) =>
                    option.word === action.option
                        ? {
                              word: action.option,
                              isChecked: false,
                          }
                        : option
                ),
            }
        }
        case INCREMENT_EX_NUM: {
            if (state.couples.length > state.exampleNumber)
                return {
                    ...state,
                    exampleNumber: state.exampleNumber + 1,
                }
            return state
        }
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
        default:
            return state
    }
}

export const newExample = () => (dispath) => {
    dispath(createExample())

    dispath(incrementExNumber())
}

const incrementExNumber = () => ({
    type: INCREMENT_EX_NUM,
})

const createExample = () => ({
    type: CREATE_EXAMLE,
})

export const setOptionOfWords = (option) => ({
    type: SET_WORD_OPTION,
    option,
})

export const setPieceOfAnswer = (piece) => ({
    type: SET_ANSWER_PIECE,
    piece,
})

export const setFetching = (isFetching) => ({
    type: SET_FETCHING,
    isFetching,
})

const setCouples = (couples) => ({
    type: SET_COUPLES,
    couples,
})

export const getCouples =
    ({ langFrom, langTo, theme, keyword }) =>
    async (dispath) => {
        dispath(setFetching(true))
        try {
            if (keyword && keyword.split(" ").length !== 1)
                throw new Error("Please enter one word")

            const couples = await mainAPI.getCouples({
                langFrom,
                langTo,
                theme,
                keyword,
            })

            await dispath(setCouples(couples))

            dispath(newExample())
        } catch (error) {
            dispath(newNotice(error.message, "warning"))
        }

        dispath(setFetching(false))
    }

export { LessonReducer }
