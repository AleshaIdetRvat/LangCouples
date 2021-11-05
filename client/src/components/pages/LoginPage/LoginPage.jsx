import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import * as yup from "yup"
import { login } from "../../../redux/reducers/UserAuthDataReducer"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import { newNotice } from "../../../redux/reducers/NoticeReducer"
import "./LoginPage.scss"
import { Loader } from "../../common/Loader/Loader"

const LoginForm = ({ onSubmitLogin, className }) => {
    //
    const validationSchema = yup.object().shape({
        login: yup.string().email("Invalid email").required("Is required!"),
        //
        password: yup
            .string()
            .min(5, "Too Short!")
            .max(20, "Too Long!")
            .required("Is required!"),
    })

    return (
        <Formik
            initialValues={{
                login: "",
                password: "",
            }}
            //
            validateOnBlur
            //
            onSubmit={(values) => {
                const { login, password } = values
                onSubmitLogin(login, password)
            }}
            //
            validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
                handleSubmit,
                dirty,
            }) => {
                return (
                    <form
                        onSubmit={handleSubmit}
                        className={`${className} login-form`}
                    >
                        <div className='login-form__input-login'>
                            <MainInput
                                value={values.login}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.login}
                                touched={touched.login}
                                name='login'
                                type='text'
                                placeholder='login'
                            />
                        </div>
                        <div className='login-form__input-password'>
                            <MainInput
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password}
                                touched={touched.password}
                                name='password'
                                type='password'
                                placeholder='password'
                            />
                        </div>

                        <GreenBtn
                            className='login-form__submit'
                            disabled={!isValid || !dirty}
                            type='submit'
                        >
                            Login
                        </GreenBtn>
                    </form>
                )
            }}
        </Formik>
    )
}

const LoginPage = () => {
    const { errorMsg, isFetching } = useSelector((state) => state.UserAuthData)
    const dispatch = useDispatch()

    const onSubmitLogin = (email, password) => {
        dispatch(login(email, password))
    }

    React.useEffect(() => {
        errorMsg.text && dispatch(newNotice(errorMsg.text, "warning"))
    }, [errorMsg.text, dispatch])

    return (
        <>
            <Loader isLoading={isFetching} />

            <div className='login-page'>
                <div className='login-page__container sky-container'>
                    <LoginForm
                        onSubmitLogin={onSubmitLogin}
                        className='login-page__form'
                    />
                </div>
            </div>
        </>
    )
}

// LoginPage.propTypes = {
//     authError: PropTypes.shape({
//         text: PropTypes.string,
//         id: PropTypes.string,
//     }),
//     login: PropTypes.func,
//     newNotice: PropTypes.func,
// }

export { LoginPage }
