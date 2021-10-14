import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import { Route, Redirect } from "react-router"

import { connect } from "react-redux"
import { Header } from "./components/Header/Header"
import Loader from "./components/common/Loader"
import { initializeApp } from "./redux/reducers/AppReducer"
import { EntryPage } from "./components/pages/EntryPage/EntryPage"
import { LoginPageContainer } from "./components/pages/LoginPage/LoginPage"
import { RegisterPageContainer } from "./components/pages/RegisterPage/RegisterPage"
import StartPage from "./components/pages/StartPage/StartPage"

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
                    <Switch>
                        <Route path="/home" exact>
                            <h1>home page</h1>
                        </Route>
                        <Route path="/start" exact>
                            <StartPage />
                        </Route>
                        <Redirect to="/home" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/entry" exact>
                            <EntryPage />
                        </Route>
                        <Route path="/login" exact>
                            <LoginPageContainer />
                        </Route>
                        <Route path="/register" exact>
                            <RegisterPageContainer />
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
