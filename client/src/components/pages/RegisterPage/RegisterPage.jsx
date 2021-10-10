import React, { useState } from "react"
import { Formik } from "formik"
import * as yup from "yup"

import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import "./RegisterPage.scss"

import { authAPI } from "../../../api/api"
import { connect } from "react-redux"
import { register } from "../../../redux/reducers/UserAuthDataReducer"

const RegisterForm = ({ className, onSubmitReg }) => {
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
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Is required!"),
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
                const { login, password } = values
                onSubmitReg(login, password)
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
                                placeholder="email"
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

const RegisterPage = ({ authErrorMsg, register }) => {
    const onSubmitReg = (email, password) => {
        register(email, password)
    }

    return (
        <div className="register-page">
            {authErrorMsg && <h1>{authErrorMsg}</h1>}
            <div className="register-page__container sky-container">
                <RegisterForm onSubmitReg={onSubmitReg} className="register-page__form" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authErrorMsg: state.UserAuthData.errorMsg,
})

const RegisterPageContainer = connect(mapStateToProps, { register })(RegisterPage)

export { RegisterPageContainer }
