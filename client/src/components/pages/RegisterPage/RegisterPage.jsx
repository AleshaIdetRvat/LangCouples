import React from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import { Formik } from "formik"
import * as yup from "yup"

import { register } from "../../../redux/reducers/UserAuthDataReducer"
import { GreenBtn } from "../../common/GreenBtn/GreenBtn"
import { MainInput } from "../../common/MainInput/MainInput"
import { newNotice } from "../../../redux/reducers/NoticeReducer"
import "./RegisterPage.scss"
import { Loader } from "../../common/Loader/Loader"

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
                    <form
                        onSubmit={handleSubmit}
                        className={`${className} login-form`}
                    >
                        <div className='register-form__input-login'>
                            <MainInput
                                value={values.login}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.login}
                                touched={touched.login}
                                name='login'
                                type='text'
                                placeholder='email'
                            />
                        </div>
                        <div className='register-form__input-password'>
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

                        <div className='register-form__input-conf-password'>
                            <MainInput
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                name='confirmPassword'
                                type='password'
                                placeholder='confirm password'
                            />
                        </div>

                        <GreenBtn
                            className='register-form__submit'
                            disabled={!isValid || !dirty}
                            type='submit'
                        >
                            Register
                        </GreenBtn>
                    </form>
                )
            }}
        </Formik>
    )
}

const RegisterPage = ({ isFetching, authError, register, newNotice }) => {
    const history = useHistory()

    const onSubmitReg = async (email, password) => {
        try {
            await register(email, password)

            history.push("/start")
        } catch (error) {}
    }

    React.useEffect(() => {
        authError.text && newNotice(authError.text, "warning")
    })

    return (
        <>
            <Loader isLoading={isFetching} />
            <div className='register-page'>
                <div className='register-page__container sky-container'>
                    <RegisterForm
                        onSubmitReg={onSubmitReg}
                        className='register-page__form'
                    />
                </div>
            </div>
        </>
    )
}

RegisterPage.propTypes = {
    authError: PropTypes.shape({
        text: PropTypes.string,
        id: PropTypes.string,
    }),
    register: PropTypes.func,
    newNotice: PropTypes.func,
}

const mapStateToProps = (state) => ({
    authError: state.UserAuthData.errorMsg,
    isFetching: state.UserAuthData.isFetching,
})

const RegisterPageContainer = connect(mapStateToProps, { register, newNotice })(
    RegisterPage
)

export { RegisterPageContainer }
