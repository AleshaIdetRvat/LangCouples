import React from "react"
import { Link } from "react-router-dom"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import "./EntryPage.scss"

const EntryPage = () => {
    return (
        <article className='entry-page'>
            <div className='entry-page__container'>
                <div className='entry-page__welcome'>
                    <div className='entry-page__title'>
                        <h3>Hello dear friend,</h3>
                        <h3>you can</h3>
                    </div>
                </div>
                <div className='sky-container'>
                    <div className='entry-page__sign-up entry-sign-up'>
                        <div className='entry-sign-up__login'>
                            <Link to='/login'>
                                <GreenBtn className='entry-sign-up__login-btn'>
                                    Login
                                </GreenBtn>
                            </Link>
                        </div>
                        <span className='entry-sign-up__separator'>or</span>
                        <div className='entry-sign-up__register'>
                            <Link to='/register'>
                                <GreenBtn className='entry-sign-up__reg-btn'>
                                    Register
                                </GreenBtn>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export { EntryPage }
