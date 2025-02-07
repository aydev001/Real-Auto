import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModalAlert, openModalAlert } from '../../store/actionSlice/actionSlice'
import { Formik } from 'formik';
import * as Yup from "yup"
import { errorToast, succsessToast } from "../../services/toastService";
import axios from "axios";
import { fetchUserOrders, fetchUserProfile } from "../../store/userSlice/userSlice";
import { useMask } from "@react-input/mask";

const Login = () => {
    const dispatch = useDispatch()
    const [passType, setPasstype] = useState("password")
    const validationSchema = Yup.object({
        phone_number: Yup.string()
            .min(19, "Write the number in full")
            .required("Phone number is required")
            .max(35, "Phone number cannot exceed 35 characters"),

        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters")
    });

    const inputRef = useMask({
        mask: '+998 (__) ___-__-__',
        replacement: { _: /\d/ },
    });
    return (
        <div className="mt-[15px]">
            <Formik
                initialValues={{ phone_number: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    const baseURL = process.env.VITE_BASE_URL
                    try {
                        setSubmitting(true)
                        // const res = await axios.post(`${baseURL}/users/login`, values)
                        // localStorage.setItem("authToken", res.data.token)
                        setSubmitting(false)
                        resetForm()
                        dispatch(closeModalAlert())
                        dispatch(fetchUserProfile())
                        dispatch(fetchUserOrders())
                        succsessToast("You have successfully logged in")
                    } catch (error) {
                        console.log(error)
                        setSubmitting(false)
                        errorToast(error.response?.data.message)
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} className='form-data'>
                        <div className='flex flex-col'>
                            <label htmlFor="phone_number">Phone number</label>
                            <input
                                name="phone_number"
                                ref={inputRef}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone_number}
                                type="text"
                                id='phone_number'
                                placeholder='Enter the number'
                                autoComplete="phone_number" />
                            <div className='min-h-[10px] leading-[12px]'>
                                {errors.phone_number && touched.phone_number && <span className="text-[12px] text-orange-600 font-medium">{errors.phone_number}</span>}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-[14px] font-medium text-neutral-200' htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    type={passType}
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    id='password'
                                    placeholder='Enter the password'
                                    autoComplete="current-password" />

                                <button onClick={() => setPasstype(prev => prev === "text" ? "password" : "text")}
                                    type="button"
                                    className="absolute top-0 right-2 bottom-0 text-gray-600"
                                >
                                    {passType === "text" ? <RxEyeOpen /> : <RxEyeClosed />}
                                </button>
                            </div>
                            <div className='min-h-[10px] leading-[12px]'>
                                {errors.password && touched.password && <span className="text-[12px] text-orange-600 font-medium">{errors.password}</span>}
                            </div>
                        </div>
                        <hr className="mb-[5px]" />
                        <button type='submit' disabled={isSubmitting} className={`${isSubmitting ? "cursor-wait" : "cursor-pointer"} btn-form`}>
                            <span>
                                {isSubmitting ? "Login..." : "Login"}
                            </span>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login
