import React from "react"
import { Formik } from "formik"
import * as yup from "yup"
import { login } from "../../../redux/reducers/UserAuthDataReducer"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import "./LoginPage.scss"
import { connect } from "react-redux"
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
                    <form onSubmit={handleSubmit} className={`${className} login-form`}>
                        <div className="login-form__input-login">
                            <MainInput
                                value={values.login}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.login}
                                touched={touched.login}
                                name="login"
                                type="text"
                                placeholder="login"
                            />
                        </div>
                        <div className="login-form__input-password">
                            <MainInput
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password}
                                touched={touched.password}
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                        </div>

                        <GreenBtn
                            className="login-form__submit"
                            disabled={!isValid || !dirty}
                            type="submit"
                        >
                            Login
                        </GreenBtn>
                    </form>
                )
            }}
        </Formik>
    )
}

const LoginPage = ({ authErrorMsg, login }) => {
    const onSubmitLogin = (email, password) => {
        login(email, password)
    }
    return (
        <div className="login-page">
            {authErrorMsg && <h1>{authErrorMsg}</h1>}
            <div className="login-page__container sky-container">
                <LoginForm onSubmitLogin={onSubmitLogin} className="login-page__form" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authErrorMsg: state.UserAuthData.errorMsg,
})

const LoginPageContainer = connect(mapStateToProps, { login })(LoginPage)

export { LoginPageContainer }
