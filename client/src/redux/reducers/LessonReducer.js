import { mainAPI } from "../../api/api"
import { newNotice } from "./NoticeReducer"

const INCREMENT_EX_NUM = "INCREMENT_EX_NUM"
const SET_COUPLES = "SET_COUPLES"
const SET_ANSWER_PIECE = "SET_ANSWER_PIECE"
const SET_WORD_OPTION = "SET_WORD_OPTION"
const CREATE_EXAMLE = "CREATE_EXAMLE"
const SET_FETCHING = "SET_FETCHING"
const CHECK_ANSWER = "CHECK_ANSWER"

const ID = () => "_" + Math.random().toString(36).substr(2, 9)

const initState = {
    couples: [],
    isFetching: true,
    isReviewed: false,
    isAnswerCorrect: false,
    exampleNumber: 0, // Current example number
    piecesOfAnswer: [],
    optionsOfWords: [],
}

const LessonReducer = (state = initState, action) => {
    switch (action.type) {
        case CHECK_ANSWER: {
            /// for test
            console.log(
                "CHECK_ANSWER",
                state.piecesOfAnswer.map((word) => word.text).join(" "),
                state.couples[state.exampleNumber].to
            )

            return {
                ...state,
                isReviewed: true,
                isAnswerCorrect:
                    state.piecesOfAnswer.map((word) => word.text).join(" ") ===
                    state.couples[state.exampleNumber].to,
            }
        }
        case CREATE_EXAMLE: {
            console.log("EXAMPLE CREATED")

            const confusingItems = state.couples[
                Math.trunc(Math.random() * state.couples.length)
            ]?.to
                .split(" ")
                .slice(1, 4)

            let shuffledOptions = [
                ...state.couples[state.exampleNumber]?.to.split(" "),
                ...confusingItems,
            ]

            for (let i = shuffledOptions.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                ;[shuffledOptions[i], shuffledOptions[j]] = [
                    shuffledOptions[j],
                    shuffledOptions[i],
                ]
            }

            shuffledOptions = shuffledOptions.map((word) => ({
                text: word,
                isChecked: false,
                id: ID(),
            }))

            return {
                ...state,
                isReviewed: false,
                piecesOfAnswer: [],
                optionsOfWords: shuffledOptions,
            }
        }

        case SET_ANSWER_PIECE: {
            return {
                ...state,
                piecesOfAnswer: [
                    ...state.piecesOfAnswer,
                    { text: action.word.text, id: action.word.id },
                ],
                optionsOfWords: state.optionsOfWords.map((option) =>
                    option.id === action.word.id
                        ? {
                              ...option,
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
                    (otherWord) => otherWord.id !== action.id
                ),

                optionsOfWords: state.optionsOfWords.map((option) =>
                    option.id === action.id
                        ? {
                              ...option,
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

export const checkAnswer = () => ({
    type: CHECK_ANSWER,
})

export const incrementExNumber = () => ({
    type: INCREMENT_EX_NUM,
})

export const createExample = () => ({
    type: CREATE_EXAMLE,
})

export const setOptionOfWords = (id) => ({
    type: SET_WORD_OPTION,
    id,
})

export const setPieceOfAnswer = (word) => ({
    type: SET_ANSWER_PIECE,
    word,
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

            dispath(createExample())
        } catch (error) {
            dispath(newNotice(error.message, "warning"))
        }

        dispath(setFetching(false))
    }

export { LessonReducer }
