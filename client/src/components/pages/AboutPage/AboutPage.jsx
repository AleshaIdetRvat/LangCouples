import React from "react"
import "./AboutPage.scss"

const AboutPage = () => {
    return (
        <div className='about'>
            <div className='about__container'>
                <h1 className='about__title main-title'>About Us</h1>
                <p className='about__description'>
                    <strong>"Lang Couples"</strong> is a simple app for learn
                    foreign languages. You can check this project on{" "}
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
