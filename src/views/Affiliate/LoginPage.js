/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Container, Row, Form } from 'reactstrap'
import { setToken } from "../../assets/auth/auth"
import toast from "react-hot-toast"
import Footer from "../XirclsFrontend/base/Footer"
import SignSection from "@src/default_components/SignSection.js"
import { Link, useNavigate } from "react-router-dom"
import FrontBaseLoader from "../Components/Loader/Loader"
import { affiliateURL, ngrokURL, postReq } from "../../assets/auth/jwtService"
import LoginOTP from "./LoginOTP"


const LoginPage = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [showOTP, setShowOTP] = useState(false)
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    console.log(data)

    const loginButtonHandler = () => {
        if (data.email === "" || data.password === "") {
            toast.error('email or Password not found')
            return
        }
        setShowError(false)
        setLoading(true)
        const formData = new FormData()
        Object.entries(data).map(([key, value]) => formData.append(key, value))

        postReq("loginaffliate", formData, affiliateURL)    
            .then((res) => {
                console.log("login response", res.data)
                if (res.data.two_step_veri) {
                    setShowOTP(true)
                } else if (res?.data?.token) {
                    toast.success('Login successful. Welcome!')
                    const tokenValue = JSON.stringify(res?.data?.token)
                    setToken(tokenValue)
                    navigate("/merchant/affiliate/dashboard/")
                } else {
                    toast.error('Invalid email or password')
                }
            })
            .catch((err) => {
                toast.error('Invalid email or password')
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
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
                                        <h3 className="third-font text-center font-three mb-2">Affiliate Login</h3>
                                        <hr />
                                        <div className="email mb-3 mt-2">
                                            <label htmlFor="email" className='mb-1 fs-4'>EMAIL:</label>
                                            <input id='email' name="email" type='text' placeholder='Email address' value={data.email} className="form-control rounded-2" onInput={(e) => inputChangeHandler(e)} />
                                            {showError && data.email === "" ? (
                                                <p
                                                    className="text-danger m-0 p-0"
                                                    style={{ fontSize: "0.9rem" }}
                                                >
                                                    * Enter your email address
                                                </p>
                                            ) : ""}
                                        </div>
                                        <div className="password my-3">
                                            <label htmlFor="password" className='mb-1 fs-4'>PASSWORD:</label>
                                            <input id='password' name="password" type='password' placeholder='Password' className="form-control rounded-0" onInput={(e) => inputChangeHandler(e)} />
                                            {showError && data.password === "" ? (
                                                <p
                                                    className="text-danger m-0 p-0 mb-3"
                                                    style={{ fontSize: "0.9rem" }}
                                                >
                                                    * Enter your password
                                                </p>
                                            ) : ""}
                                        </div>
                                        <div className="d-flex align-items-center mt-4">
                                            <button type="button" disabled={loading} onClick={() => loginButtonHandler()} id='login-btn' className="btn bg-black text-white me-1 form-btn text-light">
                                                LOGIN
                                            </button>
                                            <a href="#" id='f-password' className='mx-2'>Forgot password?</a>
                                        </div>
                                    </Form>
                                    <p className="sixth-font font-size-sm fs-6 mt-2">
                                        Already a XIRCLS Affiliate? Signup <Link to="/affiliate/signup/" className="text-blue">here</Link>.
                                    </p>
                                </div>
                            </div>
                        </Row>
                    </Container >
                }
                {
                    showOTP && <LoginOTP email={data.email} setShowOTP={setShowOTP} />
                }
                {/* <button className="btn" onClick={() => setShowOTP(!showOTP)}>Toggle signup</button> */}
                {/* <SignSection/> */}
                {/* <Footer /> */}
            </div>

        </>
    )
}

export default LoginPage