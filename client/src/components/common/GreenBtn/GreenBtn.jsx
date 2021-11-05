import React from "react"
import classNames from "classnames"
import "./GreenBtn.scss"

const GreenBtn = ({ children, disabled, onClick, className, ...props }) => {
    const styles = classNames("green-btn", className, {
        "btn-disabled": disabled,
    })

    return (
        <button
            onClick={onClick}
            className={styles}
            {...props}
            disabled={disabled}
        >
            <span className='green-btn__inner-text'>{children}</span>
        </button>
    )
}

export { GreenBtn }
