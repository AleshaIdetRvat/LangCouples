import { mainAPI } from "../../api/api"
import { shuffleArray } from "../../utils/arrayShuffle"
import { newNotice } from "./NoticeReducer"

const INCREMENT_RESOLVED_EXMPLS = "INCREMENT_RESOLVED_EXMPLS"
const INCREMENT_ALL_EXMPLS = "INCREMENT_ALL_EXMPLS"
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
    exampleNumber: 0, // Номер текущего примера
    piecesOfAnswer: [],
    optionsOfWords: [],
    // exercises: {
    //     completed: 0,
    //     solved: 0,
    // },
    resolvedExamplesAmount: 0, // количество только верно решенных задач
    allExamplesAmount: 0, // количество всех задач (ошибочные и верные)
}

const LessonReducer = (state = initState, action) => {
    switch (action.type) {
        case INCREMENT_RESOLVED_EXMPLS: {
            return {
                ...state,
                resolvedExamplesAmount: state.isAnswerCorrect
                    ? state.resolvedExamplesAmount + 1
                    : state.resolvedExamplesAmount,
            }
        }

        case INCREMENT_ALL_EXMPLS: {
            return {
                ...state,
                allExamplesAmount: state.allExamplesAmount + 1,
            }
        }

        case CHECK_ANSWER: {
            return {
                ...state,
                isReviewed: true,
                isAnswerCorrect:
                    state.piecesOfAnswer.map((word) => word.text).join(" ") ===
                    state.couples[state.exampleNumber].to,
            }
        }

        case CREATE_EXAMLE: {
            const randomIndex = Math.trunc(Math.random() * state.couples.length)

            const confusingItems = state.couples[randomIndex]?.to
                .split(" ")
                .slice(1, 4)
            // получаем и добавляем случайные 3 слова
            // для того чтобы усложнить решение задачи
            const confusingOptions = [
                ...state.couples[state.exampleNumber]?.to.split(" "),
                ...confusingItems,
            ]

            return {
                ...state,
                isReviewed: false,
                piecesOfAnswer: [],
                optionsOfWords: action
                    .shuffledFunc(confusingOptions)
                    .map((word) => ({
                        text: word,
                        isChecked: false,
                        id: ID(),
                    })),
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
            console.log("couples.length: ", state.couples.length)
            console.log("example number: ", state.exampleNumber)

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

const incrementResolvedExamplesAmount = () => ({
    type: INCREMENT_RESOLVED_EXMPLS,
})

const incrementAllExamplesAmount = () => ({
    type: INCREMENT_ALL_EXMPLS,
})

export const checkCurrentExample = () => (dispatch) => {
    dispatch(checkAnswer())
    dispatch(incrementResolvedExamplesAmount())
    dispatch(incrementAllExamplesAmount())
}

const checkAnswer = () => ({
    type: CHECK_ANSWER,
})

export const incrementExNumber = () => ({
    type: INCREMENT_EX_NUM,
})

export const createExample = (shuffledFunc) => ({
    type: CREATE_EXAMLE,
    shuffledFunc,
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

            dispath(createExample(shuffleArray))
        } catch (error) {
            dispath(newNotice(error.message, "warning"))
        }

        dispath(setFetching(false))
    }

export { LessonReducer }
