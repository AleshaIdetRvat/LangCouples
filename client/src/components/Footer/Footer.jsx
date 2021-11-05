import React from "react"
import githubIcon from "../../assets/image/githubIcon.png"
import emailIcon from "../../assets/image/arroba.png"

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <ul className='footer__contacts'>
                    <li className='footer__contact footer-contact'>
                        <img
                            className='footer-contact__icon'
                            src={emailIcon}
                            alt='email'
                        />
                        <a
                            className='footer-contact__link'
                            href='mailto: alexey.frontend.dev@gmail.com'
                            target='_blank'
                            rel='noreferrer'
                        >
                            alexey.frontend.dev@gmail.com
                        </a>
                    </li>
                    <li className='footer__contact footer-contact'>
                        <img
                            className='footer-contact__icon'
                            src={githubIcon}
                            alt='github'
                        />
                        <a
                            className='footer-contact__link'
                            href='https://github.com/AleshaIdetRvat'
                            target='_blank'
                            rel='noreferrer'
                        >
                            AleshaIdetRvat
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export { Footer }
