import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { Clue } from "../../common/Clue/Clue"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { Loader } from "../../common/Loader/Loader"
import {
    incrementExNumber,
    createExample,
    setOptionOfWords,
    setPieceOfAnswer,
    checkCurrentExample,
} from "../../../redux/reducers/LessonReducer"
import { ReviewModalWindow } from "./ReviewModalWindow/ReviewModalWindow"
import { shuffleArray } from "../../../utils/arrayShuffle"
import classNames from "classnames"
import "./LessonPage.scss"

const WordPure = ({ className, children, ...props }) => (
    <button className={`lesson-word ${className}`} {...props}>
        <div className='lesson-word__container'>
            <div className='lesson-word__body'>
                <span className='lesson-word__msg'>{children}</span>
            </div>
        </div>
    </button>
)

const LessonWord = ({ onClick, isClose = false, ...props }) => {
    const [isShow, setShow] = React.useState(true)

    const duration = 300

    return (
        <CSSTransition
            in={isShow && !isClose}
            timeout={duration}
            classNames='lesson-word'
        >
            <WordPure
                onClick={() => {
                    setShow(!isShow)
                    onClick && setTimeout(onClick, duration)
                }}
                {...props}
            />
        </CSSTransition>
    )
}

const LessonPage = () => {
    const {
        couples,
        isFetching,
        exampleNumber,
        piecesOfAnswer,
        optionsOfWords,
        isReviewed,
        isAnswerCorrect,
    } = useSelector((state) => state.Lesson)

    const dispath = useDispatch()

    const mapToAnswerPieses = ({ text, id }) => (
        <LessonWord onClick={() => dispath(setOptionOfWords(id))} key={id}>
            {text}
        </LessonWord>
    )

    const mapToOptionsOfWords = ({ text, isChecked, id }) => (
        <WordPure
            disabled={isChecked}
            className={isChecked ? "--cheked-option" : ""}
            onClick={() => dispath(setPieceOfAnswer({ text, id }))}
            key={id}
        >
            {text}
        </WordPure>
    )

    const onClickBottomBtn = () => {
        if (isReviewed) {
            if (couples.length - 1 === exampleNumber) {
                dispath(incrementExNumber())
                console.log("__FINISH")
                // finish move
            } else if (exampleNumber < couples.length - 1) {
                dispath(incrementExNumber())
                dispath(createExample(shuffleArray))
            }
        } else {
            dispath(checkCurrentExample())
        }
    }

    const styles = classNames({
        "lesson-page": true,
        "lesson-page--correct": isReviewed && isAnswerCorrect,
        "lesson-page--wrong": isReviewed && !isAnswerCorrect,
    })

    const btnInnerText = isReviewed
        ? couples.length === exampleNumber
            ? "Finish"
            : "Next"
        : "Review"

    return (
        <>
            <ReviewModalWindow
                answerText={
                    couples[
                        exampleNumber !== couples.length
                            ? exampleNumber
                            : exampleNumber - 1
                    ]?.to
                }
                isReviewed={isReviewed}
                isCorrect={isAnswerCorrect}
            />

            <Loader isLoading={isFetching} />

            <div className={styles}>
                <div className='lesson-page__container'>
                    <Clue
                        className='lesson-page__question'
                        isTailPositionCenter={true}
                        isStatic={true}
                    >
                        {
                            couples[
                                exampleNumber !== couples.length
                                    ? exampleNumber
                                    : exampleNumber - 1
                            ]?.from
                        }
                    </Clue>

                    <div className='lesson-page__lists'>
                        <div className='lesson-page__list lesson-answer'>
                            <div className='lesson-answer__row'>
                                {piecesOfAnswer.map(mapToAnswerPieses)}
                            </div>
                        </div>

                        <div className='lesson-page__list lesson-answer-options'>
                            <div className='lesson-answer-options__row'>
                                {optionsOfWords.map(mapToOptionsOfWords)}
                            </div>
                        </div>
                    </div>

                    <div className='lesson-page__btn-container'>
                        <GreenBtn
                            // disabled={exampleNumber >= couples.length - 1}
                            className='lesson-page__next-btn'
                            onClick={onClickBottomBtn}
                        >
                            {btnInnerText}
                        </GreenBtn>
                    </div>
                </div>
            </div>
        </>
    )
}
export { LessonPage }
