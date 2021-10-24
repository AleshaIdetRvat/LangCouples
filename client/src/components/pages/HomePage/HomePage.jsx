import React from "react"
import { useSelector } from "react-redux"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import "./HomePage.scss"

const HomePage = (props) => {
    const langs = useSelector((state) => state.PersonalData.langs)
    const lessonThemes = ["one", "two", "three", "four", "five", "six", "seven"]

    return (
        <div className='home' {...props}>
            <div className='home__column'>
                <header className='home__header'>
                    <h1 className='home__title'>Lesson themes for today</h1>
                </header>
                <div className='home__themes today-themes'>
                    <div className='today-themes__container'>
                        <ul className='today-themes__list'>
                            {lessonThemes.map((theme) => (
                                <GreenBtn className='today-themes__item'>
                                    {theme}
                                </GreenBtn>
                            ))}
                        </ul>
                    </div>
                </div>

                <span className='home__select-your-word'>
                    or
                    <br />
                    select the word you want to train
                </span>
                <form
                    className='home__your-word-form'
                    onSubmit={(e) => e.preventDefault()}
                >
                    <MainInput placeholder='Your word' className='home__input' />
                    <GreenBtn className='home__sumbit-btn'>Learn</GreenBtn>
                </form>
            </div>
        </div>
    )
}

export { HomePage }
