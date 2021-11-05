import React from "react"
import "./AboutPage.scss"

const AboutPage = ({ translate }) => {
    return (
        <div className='about'>
            <div className='about__container'>
                <h1 className='about__title main-title'>
                    {translate("about-page.title")}
                </h1>
                <p className='about__description'>
                    <strong>«LangCouples»</strong>
                    {" - "}
                    {translate("about-page.description")}
                    <a
                        className='about__link link-git-hub'
                        href='https://github.com/AleshaIdetRvat/LangCouples'
                        target='_blank'
                    >
                        GitHub
                    </a>
                </p>
            </div>
        </div>
    )
}

export { AboutPage }
