import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { RuFlag, EnFlag, DeFlag } from "../../../assets/image/LangFlags"
import "./LangSelector.scss"

const LangSelector = (props) => {
    const [isOpened, setOpened] = React.useState(false)
    const [langs, setLangs] = React.useState([
        { lang: "ru", Flag: RuFlag },
        { lang: "en", Flag: EnFlag },
        { lang: "de", Flag: DeFlag },
    ])

    const onClickFlag = (i) => {
        const newLangs = [...langs]
        const oldFirstElem = newLangs[0]
        newLangs[0] = newLangs[i]
        newLangs[i] = oldFirstElem
        setLangs(newLangs)
    }

    const styles = classNames("lang-selector", { "--opened": isOpened })

    return (
        <div onClick={() => setOpened(!isOpened)} className={styles}>
            <div className="lang-selector__container">
                <div className="lang-selector__row">
                    {langs.map((item, i) => {
                        return (
                            <div
                                onClick={() => onClickFlag(i)}
                                className="lang-selector__item"
                            >
                                <item.Flag className="lang-selector__flag" />
                            </div>
                        )
                    })}
                    {/* <div className="lang-selector__item">
                        <RuFlag className="lang-selector__flag" />
                    </div>
                    <div className="lang-selector__item">
                        <EnFlag className="lang-selector__flag" />
                    </div>
                    <div className="lang-selector__item">
                        <DeFlag className="lang-selector__flag" />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

LangSelector.propTypes = {}

export default LangSelector
