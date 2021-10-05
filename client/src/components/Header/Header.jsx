import React from "react"
import { NavLink } from "react-router-dom"
import classNames from "classnames"
import { IconProfile } from "../../assets/image/IconProfile"
import { MenuBurger } from "./MenuBurger/MenuBurger"
import "./Header.scss"

const Header = () => {
    const [isMenuOpen, setMenuOpen] = React.useState(false)
    const headerStyles = classNames("header", {})
    return (
        <header className={headerStyles}>
            <div className="header__container">
                <div className="header__grid">
                    <div className="header__logo header-logo">
                        <div className="header-logo__top-title">Lang</div>
                        <div className="header-logo__bottom-title">Couples</div>
                    </div>
                    <IconProfile className="header__profile" />
                    <MenuBurger
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        isOpen={isMenuOpen}
                    />
                </div>
            </div>
        </header>
    )
}

export { Header }
