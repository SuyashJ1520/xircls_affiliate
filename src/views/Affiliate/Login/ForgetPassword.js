/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Row } from 'reactstrap'
import { setToken } from "../../../assets/auth/auth"
import { affiliateURL, postReq } from "../../../assets/auth/jwtService"
import FrontBaseLoader from "../../Components/Loader/Loader"
import LoginOTP from "./LoginOTP"


const ForgetPassword = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({
        email: ""
    })
    const [showOTP, setShowOTP] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const loginButtonHandler = () => {
        if (data.email === "" || !(data.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))) {
            toast.error('Enter valid email-address')
            return
        }
        setLoading(true)
        setShowOTP(true)
        setLoading(false)
        const formData = new FormData()
        Object.entries(data).map(([key, value]) => formData.append(key, value))

        // postReq("loginaffliate", formData, affiliateURL)
        //     .then((res) => {
        //         console.log("login response", res.data)
        //     })
        //     .catch((err) => {
        //         toast.error(err.response.data.error)
        //         console.log(err)
        //         setLoading(false)
        //     })

    }

    return (
        <> {
            loading ? <FrontBaseLoader /> : ''
        }
            <div className="xircls_front_base products">
                {
                    !showOTP &&
                    <Container className='login pt-5 pb-3 d-flex justify-content-center'>
                        <Row className="w-100">
                            <div className='mx-auto' style={{ width: `666px`, maxWidth: `95%` }}>
                                <div className="front_border" style={{ border: "1px solid #ebe9f1", padding: "3rem" }}>
                                    <Form >
                                        <h3 className="third-font text-center font-three mb-2">Reset Password</h3>
                                        <hr />
                                        <div className="email mb-3 mt-2">
                                            <label htmlFor="email" className='mb-1 fs-4'>EMAIL:</label>
                                            <input id='email' name="email" type='text' placeholder='Email address' value={data.email} className="form-control rounded-2" onInput={(e) => inputChangeHandler(e)} />
                                            
                                            <p className="sixth-font font-size-sm fs-6 mt-2">Enter the email address you used to sign up to receive a password reset link in your inbox. </p>

                                        </div>
                                        <div className="d-flex align-items-center mt-2">
                                            <button type="button" onClick={() => loginButtonHandler()} id='login-btn' className="btn bg-black text-white me-1 form-btn text-light">
                                                Send Email
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Row>
                    </Container >
                }
                {
                    showOTP && <LoginOTP email={data.email} setShowOTP={setShowOTP} />
                }
             
            </div>

        </>
    )
}

export default ForgetPassword