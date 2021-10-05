import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./MenuBurger.scss"

const MenuBurger = ({ isOpen, onClick }) => {
    const menuStyles = classNames("menu-burger", {
        "--opened": isOpen,
    })

    return (
        <div className={menuStyles} onClick={onClick}>
            <div className="menu-burger__container">
                <div className="menu-burger__top-row" />
                <div className="menu-burger__mid-row" />
                <div className="menu-burger__bottom-row" />
            </div>
        </div>
    )
}

MenuBurger.propTypes = {
    isOpen: PropTypes.bool,
}

export { MenuBurger }
