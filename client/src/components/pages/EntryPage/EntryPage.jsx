import React from "react"
import { Link } from "react-router-dom"
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
                <div className="sky-container">
                    <div className="entry-page__sign-up entry-sign-up">
                        <div className="entry-sign-up__login">
                            <Link to="/login">
                                <GreenBtn className="entry-sign-up__login-btn">
                                    Login
                                </GreenBtn>
                            </Link>
                        </div>
                        <span className="entry-sign-up__separator">or</span>
                        <div className="entry-sign-up__register">
                            <Link to="/register">
                                <GreenBtn className="entry-sign-up__reg-btn">
                                    Register
                                </GreenBtn>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { EntryPage }
