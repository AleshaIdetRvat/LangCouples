import React from "react"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import "./EntryPage.scss"

const EntryPage = () => {
    return (
        <div className="entry-page">
            <div className="entry-page__container">
                <div className="entry-page__welcome">
                    <ul className="entry-page__title">
                        <li>Hello dear friend,</li>
                        <li>you can</li>
                    </ul>
                </div>
                <div className="entry-page__sign-up entry-sign-up">
                    <div className="entry-sign-up__login">
                        <GreenBtn className="entry-sign-up__login-btn">Login</GreenBtn>
                    </div>
                    <span className="entry-sign-up__separator">or</span>
                    <div className="entry-sign-up__register">
                        <GreenBtn className="entry-sign-up__reg-btn">Register</GreenBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { EntryPage }
