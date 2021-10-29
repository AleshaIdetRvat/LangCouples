import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { Clue } from "../../common/Clue/Clue"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { Loader } from "../../common/Loader/Loader"
import "./LessonPage.scss"
import {
    newExample,
    setOptionOfWords,
    setPieceOfAnswer,
} from "../../../redux/reducers/LessonReducer"
const shuffle = (array, confusingItems = []) => {
    if (!array) return []

    let shuffledArr = [...array, ...confusingItems]

    for (let i = shuffledArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]]
    }

    return shuffledArr
}

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
    } = useSelector((state) => state.Lesson)

    const dispath = useDispatch()

    // const [exampleNumber, setStepIndex] = useState(0)
    //
    // const [piecesOfAnswer, setAnswer] = useState([]) //piecesOfAnswer
    //
    // const [optionsOfWords, setWordOptions] = useState([]) //optionsOfWords

    // useEffect(() => {
    //     newExample()
    // }, [isFetching, exampleNumber])

    const mapToAnswerPieses = (word, i) => (
        <LessonWord
            onClick={() => dispath(setOptionOfWords(word))}
            key={word + i}
        >
            {word}
        </LessonWord>
    )

    const mapToOptionsOfWords = ({ word, isChecked }, i) => (
        <WordPure
            disabled={isChecked}
            className={isChecked ? "--cheked-option" : ""}
            onClick={() => dispath(setPieceOfAnswer(word))}
            key={word + i}
        >
            {word}
        </WordPure>
    )

    return (
        <>
            <Loader isLoading={isFetching} />

            <div className='lesson-page'>
                <div className='lesson-page__container'>
                    <Clue
                        className='lesson-page__question'
                        isTailPositionCenter={true}
                        isStatic={true}
                    >
                        {couples[exampleNumber - 1]?.from}
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
                            disabled={exampleNumber >= couples.length - 1}
                            className='lesson-page__next-btn'
                            onClick={() => {
                                dispath(newExample())
                            }}
                        >
                            Next
                        </GreenBtn>
                    </div>
                </div>
            </div>
        </>
    )
}
export { LessonPage }
