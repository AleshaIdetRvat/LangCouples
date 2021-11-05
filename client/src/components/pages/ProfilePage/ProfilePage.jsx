import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserData } from "../../../redux/reducers/ProfileReducer"
import "./ProfilePage.scss"

const ProfilePage = ({ translate }) => {
    const { exercises, langs, email } = useSelector((state) => state.Profile)
    const dispatch = useDispatch()

    const smallCircleRef = React.useRef()
    const bigCircleRef = React.useRef()

    const procent = ((exercises.solved / exercises.completed) * 100).toFixed(0)

    React.useEffect(() => {
        dispatch(getUserData())
    }, [])

    React.useEffect(() => {
        if (exercises.completed !== 0) {
            smallCircleRef.current.style.width =
                smallCircleRef.current.style.height = procent
                    ? `${procent}%`
                    : "50px"
            bigCircleRef.current.style.width =
                bigCircleRef.current.style.height = procent
                    ? `${100 - procent}%`
                    : "50px"
            if (!(100 - procent)) {
                smallCircleRef.current.style.left = 0
            }
        }
    }, [procent])

    return (
        <div className='profile'>
            <div className='profile__container'>
                <header className='profile__header'>
                    <span>{translate("profile.Your login")}: </span>
                    <span className='profile__email'>{email}</span>
                </header>

                <article className='profile__statistic exercises-statistic'>
                    <div className='exercises-statistic__container'>
                        <h2 className='exercises-statistic__title'>
                            {translate("profile.statistic-title")}:
                            <hr className='exercises-statistic__separator' />
                        </h2>
                        <div className='exercises-statistic__diagram diagram'>
                            <div className='diagram__body'>
                                <div
                                    ref={bigCircleRef}
                                    className='diagram__big-circle'
                                >
                                    {exercises.completed !== 0
                                        ? 100 - procent
                                        : 0}
                                    %
                                </div>

                                {exercises.completed !== 0 && (
                                    <div
                                        ref={smallCircleRef}
                                        className='diagram__small-circle'
                                    >
                                        {procent}%
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='exercises-statistic__description'>
                            <hr className='exercises-statistic__separator' />
                            <div className='exercises-statistic__description-item exercises-desc-item'>
                                <div className='exercises-desc-item__circle' />
                                <strong>
                                    {exercises.completed - exercises.solved}
                                </strong>
                                <span>
                                    {translate("profile.failed attempts")}
                                </span>
                            </div>
                            <div className='exercises-statistic__description-item exercises-desc-item correctly-exercise-desc'>
                                <div className='exercises-desc-item__circle' />
                                <strong>{exercises.solved}</strong>
                                <span>
                                    {translate("profile.correctly solved")}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export { ProfilePage }
