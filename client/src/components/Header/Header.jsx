import React from "react"
import { useLocation } from "react-router"
import { useSelector } from "react-redux"
import classNames from "classnames"
import { IconProfile } from "../../assets/image/IconProfile"
import { MenuBurger } from "./MenuBurger/MenuBurger"
import Notifications from "../common/Notifications/Notifications"
import "./Header.scss"

const Header = () => {
    const [allCouplesLength, exampleNumber] = useSelector((state) => [
        state.Lesson.couples.length,
        state.Lesson.exampleNumber,
    ])

    const [isMenuOpen, setMenuOpen] = React.useState(false)

    const location = useLocation()

    const progressBarRef = React.useRef()

    React.useEffect(() => {
        if (progressBarRef.current && progressBarRef.current.style) {
            const barStyle = progressBarRef.current.style
            const translateXValue =
                allCouplesLength !== 0
                    ? (exampleNumber / allCouplesLength) * 100
                    : 0

            barStyle.transform = `translate(${-100 + translateXValue}%)`
            if (allCouplesLength !== 0 && allCouplesLength === exampleNumber) {
                barStyle.background = "var(--blue)"
            }
        }
    }, [location, exampleNumber])

    const headerStyles = classNames("header", {})

    return (
        <header className={headerStyles}>
            <Notifications />
            <div className='header__container'>
                <div className='header__grid'>
                    {location.pathname === "/lesson" ? (
                        <>
                            <div className='header__progress-bar progress-bar'>
                                <div className='progress-bar__container'>
                                    <div
                                        ref={progressBarRef}
                                        className='progress-bar__body'
                                    />
                                </div>
                            </div>
                            <MenuBurger
                                aria-label='finish the exercize'
                                onClick={() => {}}
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
                            <button className='header__profile'>
                                <IconProfile className='header__profile-img' />
                            </button>

                            <MenuBurger
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
