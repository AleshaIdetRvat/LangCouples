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
    exercises: {
        completed: 0, // количество всех задач (ошибочные и верные)
        solved: 0, // количество только верно решенных задач
    },
}

const LessonReducer = (state = initState, action) => {
    switch (action.type) {
        case INCREMENT_RESOLVED_EXMPLS: {
            return {
                ...state,
                exercises: {
                    ...state.exercises,
                    solved: state.isAnswerCorrect
                        ? state.exercises.solved + 1
                        : state.exercises.solved,
                },
            }
        }

        case INCREMENT_ALL_EXMPLS: {
            console.log("INCREMENT_ALL_EXMPLS", state.exercises.completed)

            return {
                ...state,
                exercises: {
                    solved: state.exercises.solved,
                    completed: state.exercises.completed + 1,
                },
            }
        }

        case CHECK_ANSWER: {
            const specificExNumber =
                state.exampleNumber !== state.couples.length
                    ? state.exampleNumber
                    : state.exampleNumber - 1
            return {
                ...state,
                isReviewed: true,
                isAnswerCorrect:
                    state.piecesOfAnswer.map((word) => word.text).join(" ") ===
                    state.couples[specificExNumber].to,
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

            console.log("Create example #", state.exampleNumber)

            return {
                //
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
                isFetching: true,
                isReviewed: false,
                isAnswerCorrect: false,
                exampleNumber: 0,
                piecesOfAnswer: [],
                optionsOfWords: [],
                exercises: {
                    completed: 0,
                    solved: 0,
                },
                couples: action.couples,
            }

        default:
            return state
    }
}

const incrementSolvedExercises = () => ({
    type: INCREMENT_RESOLVED_EXMPLS,
})

const incrementAllExercises = () => ({
    type: INCREMENT_ALL_EXMPLS,
})

export const checkCurrentExample = () => (dispatch) => {
    dispatch(checkAnswer())
    dispatch(incrementSolvedExercises())
    dispatch(incrementAllExercises())
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

export const finishLesson = (exercises) => async (dispath) => {
    dispath(setFetching(true))

    try {
        await mainAPI.updateStatisticOfExercises(exercises)

        dispath(newNotice("Exercise result saved!", "success"))
    } catch (error) {
        dispath(newNotice(error.message, "warning"))
    }

    dispath(setFetching(false))
}

export { LessonReducer }
