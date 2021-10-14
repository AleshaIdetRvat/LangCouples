import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import AppReducer from "./reducers/AppReducer"
import UserAuthDataReducer from "./reducers/UserAuthDataReducer"
import NoticeReducer from "./reducers/NoticeReducer"

const reducers = combineReducers({
    UserAuthData: UserAuthDataReducer,
    App: AppReducer,
    Notice: NoticeReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

window.reduxStore = store

export default store
