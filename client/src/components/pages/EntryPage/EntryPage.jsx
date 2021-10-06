import React from "react"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import "./EntryPage.scss"

const EntryPage = () => {
    return (
        <div class="entry-page">
            <div className="entry-page__container">
                <div className="entry-page__welcome">
                    <h1 className="entry-page__title">Hello dear friend, you can</h1>
                </div>
                <div className="entry-page__sign-up entry-sign-up">
                    <div className="entry-sign-up__login">
                        <GreenBtn className="entry-sign-up__login-btn">Login</GreenBtn>
                    </div>
                    <span className="entry-sign-up__separator">or</span>
                    <div className="entry-sign-up__register"></div>
                </div>
            </div>
        </div>
    )
}

export { EntryPage }
