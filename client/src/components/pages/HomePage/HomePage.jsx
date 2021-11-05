import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { getCouples } from "../../../redux/reducers/LessonReducer"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import "./HomePage.scss"

const HomePage = ({ translate, ...props }) => {
    const history = useHistory()
    const [keyWord, setKeyWord] = useState(null)

    const { from, to } = useSelector((state) => state.PersonalData.langs)
    const dispatch = useDispatch()

    const onSubmit = async (theme) => {
        // langFrom, langTo, theme, keyword,
        dispatch(
            getCouples({
                langFrom: from,
                langTo: to,
                keyword: keyWord || null,
                theme,
            })
        )
        history.push("/lesson")
    }

    return (
        <div className='home' {...props}>
            <div className='home__column'>
                <header className='home__header'>
                    <h1 className='home__title'>
                        {translate("home-page.Lesson themes for today")}
                    </h1>
                </header>

                <div className='home__themes today-themes'>
                    <div className='today-themes__container'>
                        <ul className='today-themes__list'>
                            {translate("home-page.lessonThemes", {
                                returnObjects: true,
                            }).map((theme, i) => (
                                <GreenBtn
                                    onClick={() => onSubmit(theme)}
                                    className='today-themes__item'
                                    key={theme + i}
                                >
                                    {theme}
                                </GreenBtn>
                            ))}
                        </ul>
                    </div>
                </div>

                <span className='home__select-your-word'>
                    {translate("home-page.or")}
                    <br />
                    {translate("home-page.select the word you want to train")}
                </span>

                <form
                    className='home__your-word-form'
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit()
                    }}
                >
                    <MainInput
                        onChange={(e) => setKeyWord(e.target.value)}
                        placeholder={translate("home-page.Your word")}
                        className='home__input'
                    />

                    <GreenBtn className='home__sumbit-btn' type='submit'>
                        {translate("home-page.Learn")}
                    </GreenBtn>
                </form>
            </div>
        </div>
    )
}

export { HomePage }
