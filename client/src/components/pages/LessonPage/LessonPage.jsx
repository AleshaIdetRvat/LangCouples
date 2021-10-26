import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { Clue } from "../../common/Clue/Clue"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { Loader } from "../../common/Loader/Loader"

import "./LessonPage.scss"

const shuffle = (array, confusingWords = []) => {
    if (!array) return []

    let shuffledArr = [...array, ...confusingWords]

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
    const { couples, isFetching } = useSelector((state) => {
        return {
            couples: state.PersonalData.couples,
            isFetching: state.PersonalData.isFetching,
        }
    })

    const [stepIndex, setStepIndex] = useState(0)
    const [answer, setAnswer] = useState([])

    const [wordOptions, setWordOptions] = useState([])

    useEffect(() => {
        setWordOptions(
            shuffle(couples[stepIndex]?.to.split(" ")).map((word) => ({
                word,
                isChecked: false,
            }))
        )
    }, [isFetching, stepIndex])

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
                        {couples[stepIndex]?.from}
                    </Clue>

                    <div className='lesson-page__lists'>
                        <div className='lesson-page__list lesson-answer'>
                            <div className='lesson-answer__row'>
                                {answer.map((word, i) => (
                                    <LessonWord
                                        onClick={() => {
                                            setWordOptions(
                                                wordOptions.map((option) =>
                                                    option.word === word
                                                        ? { word, isChecked: false }
                                                        : option
                                                )
                                            )
                                            setAnswer(
                                                answer.filter(
                                                    (otherWord) => otherWord !== word
                                                )
                                            )
                                        }}
                                        key={word + i}
                                    >
                                        {word}
                                    </LessonWord>
                                ))}
                            </div>
                        </div>

                        <hr />

                        <div className='lesson-page__list lesson-answer-options'>
                            <div className='lesson-answer-options__row'>
                                {wordOptions.map(({ word, isChecked }, i) => (
                                    <WordPure
                                        disabled={isChecked}
                                        className={isChecked ? "--cheked-option" : ""}
                                        onClick={() => {
                                            setAnswer([...answer, word])
                                            setWordOptions(
                                                wordOptions.map((option) =>
                                                    option.word === word
                                                        ? { word, isChecked: true }
                                                        : option
                                                )
                                            )
                                        }}
                                        key={word + i}
                                    >
                                        {word}
                                    </WordPure>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='lesson-page__btn-container'>
                        <GreenBtn
                            disabled={stepIndex >= couples.length - 1}
                            className='lesson-page__next-btn'
                            onClick={() => setStepIndex(stepIndex + 1)}
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
