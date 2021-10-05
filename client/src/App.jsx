import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import { Route, Redirect } from "react-router"

import { connect } from "react-redux"
import { Header } from "./components/Header/Header"
import Loader from "./components/common/Loader"
import { initializeApp } from "./redux/reducers/AppReducer"
import { EntryPage } from "./components/pages/EntryPage/EntryPage"
import { AuthPage } from "./components/pages/AuthPage"

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
            <div className="container">
                {isAuth ? (
                    <>
                        <Switch>
                            <Redirect to="/entry" />
                        </Switch>
                    </>
                ) : (
                    <Switch>
                        <Route path="/auth" exact>
                            <EntryPage />
                        </Route>
                        <Route path="/auth" exact>
                            <AuthPage />
                        </Route>
                        <Redirect to="/auth" />
                    </Switch>
                )}
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => ({
    isReady: state.App.isReady,
    isAuth: state.UserAuthData.isAuth,
})

export default connect(mapStateToProps, { initializeApp })(App)
