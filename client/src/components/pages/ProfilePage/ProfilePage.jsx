import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserData } from "../../../redux/reducers/ProfileReducer"
import "./ProfilePage.scss"

const ProfilePage = () => {
    const { exercises, langs, email } = useSelector((state) => state.Profile)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getUserData())
    }, [])

    return (
        <div className='profile'>
            <div className='profile__container'>
                <h1 className='profile__title main-title'>Your Profile</h1>
                <header className='profile__header'>
                    <span>Login: </span>
                    <strong className='profile__email'>{email}</strong>
                </header>

                <article className='profile__statistic exercises-statistic'>
                    <div className='exercises-statistic__container'>
                        <h2 className='exercises-statistic__title'>
                            Exercises
                        </h2>
                        <div className='exercises-statistic__diagram diagram'>
                            <div className='diagram__body'>
                                <div className='diagram__big-circle' />
                                <div className='diagram__small-circle' />
                            </div>
                        </div>
                        <div className='exercises-statistic__description'>
                            <div className='exercises-statistic__description-item exercises-desc-item'>
                                <div className='exercises-desc-item__circle' />
                                <strong>{exercises.completed}</strong>
                                <span>all</span>
                            </div>
                            <div className='exercises-statistic__description-item exercises-desc-item correctly-exercise-desc'>
                                <div className='exercises-desc-item__circle' />
                                <strong>{exercises.solved}</strong>
                                <span>correctly solved</span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export { ProfilePage }
