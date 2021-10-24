import React from "react"
import classNames from "classnames"
import { IconProfile } from "../../assets/image/IconProfile"
import { MenuBurger } from "./MenuBurger/MenuBurger"
import Notifications from "../common/Notifications/Notifications"
import "./Header.scss"

const Header = () => {
    const [isMenuOpen, setMenuOpen] = React.useState(false)
    const headerStyles = classNames("header", {})
    return (
        <header className={headerStyles}>
            <Notifications />
            <div className="header__container">
                <div className="header__grid">
                    <div className="header__logo header-logo">
                        <div className="header-logo__top-title">Lang</div>
                        <div className="header-logo__bottom-title">Couples</div>
                    </div>
                    <button className="header__profile">
                        <IconProfile className="header__profile-img" />
                    </button>

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
