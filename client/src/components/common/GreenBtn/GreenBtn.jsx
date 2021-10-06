import React from "react"
import classNames from "classnames"
import "./GreenBtn.scss"

const GreenBtn = ({ children, disabled, onClick }) => {
    const styles = classNames("green-btn", {
        "btn-disabled": disabled,
    })

    return (
        <button onClick={onClick} className={styles}>
            <span className="green-btn__inner-text">{children}</span>
        </button>
    )
}

export { GreenBtn }
