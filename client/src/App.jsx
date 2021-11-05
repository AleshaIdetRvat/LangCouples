import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { Header } from "./components/Header/Header"
import { RoutesContainer } from "./components/RoutesContainer"
import { Footer } from "./components/Footer/Footer"
import { Loader } from "./components/common/Loader/Loader"
import { initializeApp } from "./redux/reducers/AppReducer"
import "../src/assets/style/app.scss"

const App = () => {
    const { isReady, isAuth } = useSelector((state) => ({
        isReady: state.App.isReady,
        isAuth: state.UserAuthData.isAuth,
    }))

    const dispatch = useDispatch()

    useEffect(() => dispatch(initializeApp()), [dispatch])

    return (
        <Suspense fallback={<Loader isLoading={true} />}>
            <Loader isLoading={!isReady} />
            <BrowserRouter>
                <Header isAuth={isAuth} />
                <RoutesContainer isAuth={isAuth} />
            </BrowserRouter>
        </Suspense>
    )
}

export { App }
