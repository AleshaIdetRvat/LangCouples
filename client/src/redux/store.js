import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import AppReducer from "./reducers/AppReducer"
import UserAuthDataReducer from "./reducers/UserAuthDataReducer"
import NoticeReducer from "./reducers/NoticeReducer"
import UserPersonalDataReducer from "./reducers/UserPersonalDataReducer"
import { LessonReducer } from "./reducers/LessonReducer"
import ProfileReducer from "./reducers/ProfileReducer"

const reducers = combineReducers({
    Lesson: LessonReducer,
    UserAuthData: UserAuthDataReducer,
    App: AppReducer,
    Notice: NoticeReducer,
    PersonalData: UserPersonalDataReducer,
    Profile: ProfileReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

window.reduxStore = store

export default store
