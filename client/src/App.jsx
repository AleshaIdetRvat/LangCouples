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
import HomePage from "./components/pages/HomePage/HomePage"
import "../src/assets/style/app.scss"
import { CSSTransition } from "react-transition-group"

const routesIfUserAuth = [
    { path: "/home", name: "Home", Component: HomePage },
    { path: "/start", name: "Start", Component: StartPage },
]

const routesIfUserNotAuth = [
    { path: "/entry", name: "Entry", Component: EntryPage },
    { path: "/login", name: "Login", Component: LoginPageContainer },
    { path: "/register", name: "Register", Component: RegisterPageContainer },
]

const App = ({ isReady, isAuth, initializeApp }) => {
    const routes = isAuth ? routesIfUserAuth : routesIfUserNotAuth

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
                {routes.map(({ path, name, Component }) => {
                    return (
                        <Route path={path} key={name} exact>
                            {({ match }) => (
                                <CSSTransition
                                    in={match != null}
                                    timeout={400}
                                    classNames="page"
                                    unmountOnExit
                                >
                                    <div className="page">
                                        <Component />
                                    </div>
                                </CSSTransition>
                            )}
                        </Route>
                    )
                })}

                {/* {isAuth ? (
                    <Switch>
                        <Route path="/home" exact>
                            <HomePage />
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
                )} */}
            </main>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => ({
    isReady: state.App.isReady,
    isAuth: state.UserAuthData.isAuth,
})

export default connect(mapStateToProps, { initializeApp })(App)
