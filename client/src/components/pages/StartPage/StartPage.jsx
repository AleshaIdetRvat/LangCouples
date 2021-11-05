import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
    setLangFrom,
    setLangTo,
    saveLangs,
} from "../../../redux/reducers/UserPersonalDataReducer"
import { LangSelector } from "../../common/LangSelector/LangSelector"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { useHistory } from "react-router-dom"
import { Clue } from "../../common/Clue/Clue"
import { useTranslation } from "react-i18next"
import "./StartPage.scss"

const StartPage = (props) => {
    const { translate, langs, setLangFrom, setLangTo, saveLangs } = props
    const { i18n } = useTranslation()
    const [isFirstLangTouched, setFirstLangTouched] = React.useState(false)

    const history = useHistory()

    const onClick = () => {
        saveLangs(langs)
        history.push("/home")
    }

    React.useEffect(() => i18n.changeLanguage(langs.from), [langs.from])

    return (
        <div className='start-page'>
            <div className='start-page__container'>
                <div className='start-page__column'>
                    <h4 className='start-page__title'>
                        {translate("start-page.Choose your native language")}
                    </h4>

                    <div
                        onClick={() => setFirstLangTouched(true)}
                        className='start-page__lang first-lang'
                    >
                        <Clue
                            className='first-lang__clue'
                            isClose={isFirstLangTouched}
                        >
                            {translate("start-page.click me")}!
                        </Clue>
                        <LangSelector
                            selectLang={setLangFrom}
                            currentLang={langs.from}
                        />
                    </div>

                    <h4 className='start-page__title'>
                        {translate(
                            "start-page.Language that you want to learn"
                        )}
                    </h4>

                    <div className='start-page__lang'>
                        <LangSelector
                            selectLang={setLangTo}
                            currentLang={langs.to}
                        />
                    </div>

                    <GreenBtn
                        disabled={langs.from === langs.to}
                        className='start-page__btn'
                        onClick={onClick}
                    >
                        {translate("start-page.Let's go")}
                    </GreenBtn>
                </div>
            </div>
        </div>
    )
}

StartPage.propTypes = {
    langs: PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
    }),
    setLangFrom: PropTypes.func,
    setLangTo: PropTypes.func,
}

const mapStateToProps = (state) => ({ langs: state.PersonalData.langs })

export default connect(mapStateToProps, { setLangFrom, setLangTo, saveLangs })(
    StartPage
)
