import React from "react"
import { Formik } from "formik"
import * as yup from "yup"

import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import "./RegisterPage.scss"

const RegisterForm = ({ onSubmitLogin, className }) => {
    //
    const validationSchema = yup.object().shape({
        login: yup.string().email("Invalid email").required("Is required!"),
        //
        password: yup
            .string()
            .min(5, "Too Short!")
            .max(20, "Too Long!")
            .required("Is required!"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    })

    return (
        <Formik
            initialValues={{
                login: "",
                password: "",
                confirmPassword: "",
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
                        <div className="register-form__input-login">
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
                        <div className="register-form__input-password">
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

                        <div className="register-form__input-conf-password">
                            <MainInput
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                name="confirmPassword"
                                type="password"
                                placeholder="confirm password"
                            />
                        </div>

                        <GreenBtn
                            className="register-form__submit"
                            disabled={!isValid || !dirty}
                            type="submit"
                        >
                            Register
                        </GreenBtn>
                    </form>
                )
            }}
        </Formik>
    )
}

const RegisterPage = () => {
    return (
        <div className="register-page">
            <div className="register-page__container sky-container">
                <RegisterForm className="register-page__form" />
            </div>
        </div>
    )
}

export { RegisterPage }
