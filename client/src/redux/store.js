import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import AppReducer from "./reducers/AppReducer"
import UserAuthDataReducer from "./reducers/UserAuthDataReducer"

const reducers = combineReducers({
    UserAuthData: UserAuthDataReducer,
    App: AppReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

window.reduxStore = store

export default store
