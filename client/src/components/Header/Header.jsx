import React from "react"
import { useLocation, useHistory } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames"
import { IconProfile } from "../../assets/image/IconProfile"
import { MenuBurgerBtn } from "./MenuBurgerBtn/MenuBurgerBtn"
import Notifications from "../common/Notifications/Notifications"
import { finishLesson } from "../../redux/reducers/LessonReducer"
import { Menu } from "./Menu/Menu"
import "./Header.scss"

const Header = ({ isAuth }) => {
    const [allCouplesLength, exampleNumber, exercises] = useSelector(
        (state) => [
            state.Lesson.couples.length,
            state.Lesson.exampleNumber,
            state.Lesson.exercises,
        ]
    )

    const dispatch = useDispatch()

    const [isMenuOpen, setMenuOpen] = React.useState(false)

    const location = useLocation()
    const history = useHistory()

    const progressBarRef = React.useRef()

    const finishExercise = () => {
        dispatch(finishLesson(exercises))
        history.push("/home")
    }

    React.useEffect(() => {
        if (progressBarRef.current && progressBarRef.current.style) {
            const barStyle = progressBarRef.current.style
            const translateXValue =
                allCouplesLength !== 0
                    ? (exampleNumber / allCouplesLength) * 100
                    : 0

            barStyle.transform = `translate(${-100 + translateXValue}%)`
            if (allCouplesLength !== 0 && allCouplesLength !== exampleNumber) {
                barStyle.background = "var(--green)"
            } else if (allCouplesLength === exampleNumber) {
                barStyle.background = "var(--blue)"
            }
        }
    }, [location, exampleNumber, allCouplesLength])

    const headerStyles = classNames("header", {})

    return (
        <header className={headerStyles}>
            <Notifications />
            <Menu
                closeMenu={() => setMenuOpen(false)}
                isMenuOpen={isMenuOpen}
            />

            <div className='header__container'>
                <div className='header__grid'>
                    {location.pathname === "/lesson" ? (
                        <>
                            <div className='header__progress-bar progress-bar'>
                                <div className='progress-bar__container'>
                                    <div
                                        className='progress-bar__body'
                                        ref={progressBarRef}
                                    />
                                </div>
                            </div>
                            <MenuBurgerBtn
                                aria-label='finish the exercize'
                                onClick={finishExercise}
                                isOpen={true}
                            />
                        </>
                    ) : (
                        <>
                            <div className='header__logo header-logo'>
                                <h2 className='header-logo__top-title'>Lang</h2>
                                <h2 className='header-logo__bottom-title'>
                                    Couples
                                </h2>
                            </div>
                            {isAuth && (
                                <Link
                                    className='header__profile'
                                    to='/profile'
                                    aria-label='profile'
                                >
                                    <IconProfile className='header__profile-img' />
                                </Link>
                            )}

                            <MenuBurgerBtn
                                className='header__menu-burger'
                                onClick={() => setMenuOpen(!isMenuOpen)}
                                isOpen={isMenuOpen}
                                aria-label={
                                    isMenuOpen ? "close menu" : "open menu"
                                }
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export { Header }
