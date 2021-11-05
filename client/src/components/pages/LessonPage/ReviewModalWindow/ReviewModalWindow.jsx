import classNames from "classnames"
import React from "react"
import { CSSTransition } from "react-transition-group"
import "./ReviewModalWindow.scss"

const ReviewModalWindow = ({
    title,
    isCorrect,
    isReviewed,
    answerText,
    ...props
}) => {
    const styles = classNames({
        "review-modal": true,
        "review-modal--correct": isCorrect,
        "review-modal--wrong": !isCorrect,
    })
    return (
        <CSSTransition
            in={isReviewed}
            timeout={300}
            unmountOnExit
            mountOnEnter
            classNames='review-modal'
        >
            <div className={styles} {...props}>
                <div className='review-modal__body'>
                    <h2 className='review-modal__title'>{title}:</h2>
                    <p className='review-modal__answer'>{answerText}</p>
                </div>
            </div>
        </CSSTransition>
    )
}

export { ReviewModalWindow }
