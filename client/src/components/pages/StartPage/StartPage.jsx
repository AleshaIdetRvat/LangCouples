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
import "./StartPage.scss"

const StartPage = (props) => {
    const { langs, setLangFrom, setLangTo, saveLangs } = props
    const history = useHistory()

    const onClick = () => {
        saveLangs(langs)
        history.push("/home")
    }

    return (
        <div className="start-page">
            <div className="start-page__container">
                <div className="start-page__column">
                    <h4 className="start-page__title">Choose your native language</h4>
                    <div className="start-page__lang first-lang">
                        <LangSelector selectLang={setLangTo} currentLang={langs.to} />
                    </div>
                    <h4 className="start-page__title">Language that you want to learn</h4>
                    <div className="start-page__lang">
                        <LangSelector selectLang={setLangFrom} currentLang={langs.from} />
                    </div>
                    <GreenBtn
                        disabled={langs.from === langs.to}
                        className="start-page__btn"
                        onClick={onClick}
                    >
                        Make couple
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

export default connect(mapStateToProps, { setLangFrom, setLangTo, saveLangs })(StartPage)
