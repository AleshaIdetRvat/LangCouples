import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { Header } from "./components/Header/Header"
import { Loader } from "./components/common/Loader"
import { RoutesContainer } from "./components/RoutesContainer"
import { initializeApp } from "./redux/reducers/AppReducer"
import "../src/assets/style/app.scss"

const App = () => {
    const { isReady, isAuth } = useSelector((state) => ({
        isReady: state.App.isReady,
        isAuth: state.UserAuthData.isAuth,
    }))

    const dispatch = useDispatch()

    useEffect(() => dispatch(initializeApp()), [dispatch])

    if (!isReady) return <Loader />

    return (
        <BrowserRouter>
            <Header />
            <RoutesContainer isAuth={isAuth} />
        </BrowserRouter>
    )
}

export { App }
