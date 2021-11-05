import React from "react"
import { Route, Redirect } from "react-router"
import { CSSTransition } from "react-transition-group"
import { EntryPage } from "./pages/EntryPage/EntryPage"
import { HomePage } from "./pages/HomePage/HomePage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPageContainer } from "./pages/RegisterPage/RegisterPage"
import StartPage from "./pages/StartPage/StartPage"
import { LessonPage } from "./pages/LessonPage/LessonPage"
import { AboutPage } from "./pages/AboutPage/AboutPage"
import { ProfilePage } from "./pages/ProfilePage/ProfilePage"

const routesIfUserAuth = [
    { path: "/home", name: "Home", Component: HomePage },
    { path: "/start", name: "Start", Component: StartPage },
    { path: "/lesson", name: "Lesson", Component: LessonPage },
    { path: "/about", name: "About", Component: AboutPage },
    { path: "/profile", name: "Profile", Component: ProfilePage },
]

const routesIfUserNotAuth = [
    { path: "/entry", name: "Entry", Component: EntryPage },
    { path: "/login", name: "Login", Component: LoginPage },
    { path: "/register", name: "Register", Component: RegisterPageContainer },
]

const RoutesContainer = ({ isAuth }) => {
    const routes = isAuth ? routesIfUserAuth : routesIfUserNotAuth

    return (
        <main className='container'>
            {routes.map(({ path, name, Component }) => {
                return (
                    <Route path={path} key={name} exact>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={500}
                                classNames='page'
                                unmountOnExit
                            >
                                <div className='page'>
                                    <Component />
                                </div>
                            </CSSTransition>
                        )}
                    </Route>
                )
            })}

            {isAuth ? <Redirect to='/home' /> : <Redirect to='/entry' />}
        </main>
    )
}
export { RoutesContainer }
