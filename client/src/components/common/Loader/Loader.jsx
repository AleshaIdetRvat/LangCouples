import React from "react"
import { CSSTransition } from "react-transition-group"
import loaderImg from "../../../assets/image/Loader.svg"
import "./Loader.scss"

const Loader = ({ isLoading }) => {
    return (
        <CSSTransition
            in={isLoading}
            timeout={300}
            mountOnEnter
            unmountOnExit
            classNames='loader'
        >
            <div className='loader'>
                <div className='loader__container'>
                    <img className='loader__img' src={loaderImg} alt='loading' />
                </div>
            </div>
        </CSSTransition>
    )
}

export { Loader }
