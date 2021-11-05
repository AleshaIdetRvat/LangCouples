import React from "react"
import { useHistory } from "react-router"
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
    finishLesson,
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

const LessonPage = ({ translate }) => {
    const {
        couples,
        isFetching,
        exampleNumber,
        piecesOfAnswer,
        optionsOfWords,
        isReviewed,
        isAnswerCorrect,
        exercises,
    } = useSelector((state) => state.Lesson)

    const dispath = useDispatch()

    const history = useHistory()

    const specificExNumber =
        exampleNumber !== couples.length ? exampleNumber : exampleNumber - 1

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
        if (couples.length - 1 === exampleNumber) {
            dispath(incrementExNumber())
        }

        if (isReviewed) {
            dispath(incrementExNumber())

            if (couples.length === exampleNumber) {
                dispath(finishLesson(exercises))
                history.push("/home")
            } else {
                dispath(createExample(shuffleArray))
            }
        } else dispath(checkCurrentExample())
    }

    const styles = classNames({
        "lesson-page": true,
        "lesson-page--correct": isReviewed && isAnswerCorrect,
        "lesson-page--wrong": isReviewed && !isAnswerCorrect,
    })

    const btnInnerText = isReviewed
        ? exampleNumber === couples.length
            ? translate("lesson-page.Finish")
            : translate("lesson-page.Next")
        : translate("lesson-page.Review")

    return (
        <>
            <ReviewModalWindow
                title={translate("lesson-page.reviewModalTitle")}
                answerText={couples[specificExNumber]?.to}
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
                        {couples[specificExNumber]?.from}
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
