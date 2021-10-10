import React from "react"
import { Formik } from "formik"
import * as yup from "yup"

import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import "./LoginPage.scss"
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
                console.log(values)
                onSubmitLogin(values)
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

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-page__container sky-container">
                <LoginForm className="login-page__form" />
            </div>
        </div>
    )
}

export { LoginPage }
