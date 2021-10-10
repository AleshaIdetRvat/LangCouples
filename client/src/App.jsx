import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import { Route, Redirect } from "react-router"

import { connect } from "react-redux"
import { Header } from "./components/Header/Header"
import Loader from "./components/common/Loader"
import { initializeApp } from "./redux/reducers/AppReducer"
import { EntryPage } from "./components/pages/EntryPage/EntryPage"
import { LoginPage } from "./components/pages/LoginPage/LoginPage"
import { RegisterPage } from "./components/pages/RegisterPage/RegisterPage"

const App = ({ isReady, isAuth, initializeApp }) => {
    React.useEffect(() => {
        initializeApp()
    }, [initializeApp])

    if (!isReady) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Header />
            <main className="container">
                {isAuth ? (
                    <>
                        <Switch>
                            <Redirect to="/start" />
                        </Switch>
                    </>
                ) : (
                    <Switch>
                        <Route path="/entry" exact>
                            <EntryPage />
                        </Route>
                        <Route path="/login" exact>
                            <LoginPage />
                        </Route>
                        <Route path="/register" exact>
                            <RegisterPage />
                        </Route>
                        <Redirect to="/entry" />
                    </Switch>
                )}
            </main>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => ({
    isReady: state.App.isReady,
    isAuth: state.UserAuthData.isAuth,
})

export default connect(mapStateToProps, { initializeApp })(App)
