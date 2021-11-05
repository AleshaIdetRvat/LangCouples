import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./MenuBurgerBtn.scss"

const MenuBurgerBtn = ({ isOpen, onClick, className, ...props }) => {
    const menuStyles = classNames(className, {
        "menu-burger-btn": true,
        "--opened": isOpen,
    })

    return (
        <button
            type='button'
            className={menuStyles}
            onClick={onClick}
            {...props}
        >
            <div className='menu-burger-btn__container'>
                <div className='menu-burger-btn__top-row' />
                <div className='menu-burger-btn__mid-row' />
                <div className='menu-burger-btn__bottom-row' />
            </div>
        </button>
    )
}

MenuBurgerBtn.propTypes = {
    isOpen: PropTypes.bool,
}

export { MenuBurgerBtn }
