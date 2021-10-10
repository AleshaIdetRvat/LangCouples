import React from "react"
import classNames from "classnames"
import "./MainInput.scss"

const MainInput = ({ placeholder, touched, error, ...props }) => {
    const hasError = touched && error

    const inputStyles = classNames("main-input", { "--error": hasError })

    const errorBlockStyles = classNames("main-input__error-block", {
        "--error": hasError,
    })

    return (
        <div className="input-container">
            <input placeholder={placeholder} className={inputStyles} {...props} />

            <div className={errorBlockStyles}>{error}</div>
        </div>
    )
}

export { MainInput }
