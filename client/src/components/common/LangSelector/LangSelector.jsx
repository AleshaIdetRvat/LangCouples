import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { RuFlag, EnFlag, DeFlag } from "../../../assets/image/LangFlags"
import "./LangSelector.scss"

const LangSelector = ({ currentLang, selectLang, ...props }) => {
    const [isOpened, setOpened] = React.useState(false)

    const langsList = [
        { lang: "ru", Flag: RuFlag },
        { lang: "en", Flag: EnFlag },
        { lang: "de", Flag: DeFlag },
    ]

    let SelectedFlag
    let OtherLangs = []

    for (const { lang, Flag } of langsList) {
        if (lang === currentLang) SelectedFlag = Flag
        else OtherLangs.push({ lang, Flag })
    }

    const styles = classNames({ "lang-selector": true, "--opened": isOpened })

    return (
        <div onClick={() => setOpened(!isOpened)} className={styles} {...props}>
            <div className="lang-selector__container">
                <div className="lang-selector__row">
                    <div className="lang-selector__item --selected">
                        <SelectedFlag className="lang-selector__flag" />
                    </div>
                    {OtherLangs.map(({ lang, Flag }) => (
                        <div
                            onClick={() => selectLang(lang)}
                            className="lang-selector__item"
                            key={lang}
                        >
                            <Flag className="lang-selector__flag" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

LangSelector.propTypes = {
    currentLang: PropTypes.string,
    selectLang: PropTypes.func,
}

export { LangSelector }
