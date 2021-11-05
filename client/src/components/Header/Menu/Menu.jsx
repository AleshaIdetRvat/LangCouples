import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import classNames from "classnames"
import { logout } from "../../../redux/reducers/UserAuthDataReducer"
import "./Menu.scss"

const Menu = ({ isMenuOpen, closeMenu }) => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.UserAuthData.isAuth)

    const navLinks = [
        ...(isAuth
            ? [
                  { path: "/home", name: "Home" },
                  { path: "/start", name: "Settings" },
              ]
            : []),
        { path: "/about", name: "About Us" },
    ]

    const styles = classNames({
        menu: true,
        "menu--open": isMenuOpen,
    })

    return (
        <div className={styles}>
            <div
                className='menu__container'
                onClick={(e) =>
                    e.target.classList.value === "menu__container" &&
                    closeMenu()
                }
            >
                <div className='menu__body'>
                    <nav
                        className='menu__column'
                        onClick={(e) =>
                            e.target.classList.value === "menu__link" &&
                            closeMenu()
                        }
                    >
                        {navLinks.map(({ name, path }) => (
                            <NavLink
                                tabIndex={isMenuOpen ? 0 : -1}
                                className='menu__link'
                                activeClassName='menu__link--active'
                                to={path}
                                key={name + path}
                            >
                                {name}
                            </NavLink>
                        ))}
                        {isAuth && (
                            <button
                                className='menu__link'
                                tabIndex={isMenuOpen ? 0 : -1}
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export { Menu }
