/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react"
import { ChevronLeft } from "react-feather"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import { affiliateURL, postReq } from "../../assets/auth/jwtService"
import FrontBaseLoader from "../Components/Loader/Loader"

const ForgetOTP = ({ email, setShowOTP }) => {
    const [otp, setOTP] = useState(['', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [usePage, setPage] = useState(true)
    const [time, setTime] = useState(300)
    const [ResendBtn, setResendBtn] = useState(false)
    const navigate = useNavigate()

    const sendOTP = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("email", email)
        setLoading(true)
        postReq("two_step_verification", formData, affiliateURL)
            .then((res) => {
                toast.success("OTP has been sent!")
                setTime(300)
                setResendBtn(false)
            })
            .catch((err) => {
                toast.error("Something went wrong!")
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {

        const intervalId = setInterval(() => {
            if (time > 0) {
                setTime((prevTime) => prevTime - 1)
            } else {
                clearInterval(intervalId)
                // setShowOTP(false)
                // toast.error('OTP Expired!')
                setResendBtn(true)
            }
        }, 1000)

        return () => clearInterval(intervalId) // Cleanup on component unmount

    }, [time])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }

    const inputRefs = Array.from({ length: 5 }, (_, i) => useRef(null))

    const handleInputChange = (index, value) => {
        const newOTP = [...otp]
        newOTP[index] = value

        // Move to the next input when a digit is entered
        if (index < 4 && value !== '') {
            inputRefs[index + 1].current.focus()
        }

        setOTP(newOTP)
    }

    const handleBackspace = (index) => {
        // Move to the previous input when backspace is pressed on an empty input
        if (index > 0 && otp[index] === '') {
            inputRefs[index - 1].current.focus()
        }
    }

    const handleOTP = (e) => {
        e.preventDefault()
        for (const elm of otp) {
            if (elm === '') {
                toast.error("Enter OTP")
                return
            }
        }
        const formData = new FormData()
        formData.append("otp", otp.join(''))
        formData.append("email", email)
        setLoading(true)
        setPage(true)
        // postReq("two_step_verification", formData, affiliateURL)
        //     .then((res) => {
        //     })
        //     .catch((err) => {
        //         if (err.response.status === 404) {
        //             toast.error(err.response.data.error)
        //         } else {
        //             toast.error("Server Error!")
        //         }
        //     })
        //     .finally(() => {
        //         setLoading(false)
        //     })

    }

    useEffect(() => {
        inputRefs[0].current.focus()

    }, [])
    return (
        <>
            {loading ? <FrontBaseLoader /> : ''}
            <div className="xircls_front_base products">
                <Container className='login pt-5 pb-3 d-flex justify-content-center'>
                   
                   {
                    
                   } <div className="w-100">
                        <div className='mx-auto' style={{ width: `666px`, maxWidth: `95%` }}>
                            <div className="front_border position-relative " style={{ border: "1px solid #ebe9f1", padding: "3rem" }}>
                                <button className="btn btn-sm position-absolute top-0 start-0 mt-1 ms-1" onClick={() => setShowOTP(false)}><ChevronLeft size={15} /> Back </button>
                                <h3 className=" text-center mb-1">Two-step verification</h3>
                                <p className="text-center">
                                    Enter the 5-digit verification code that was sent to your <span className="text-primary">{email}</span>.
                                </p>
                                <div className="d-flex justify-content-center  gap-2 mt-3">
                                    {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            value={value}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(index)}
                                            ref={inputRefs[index]}
                                            className="form-control text-center"
                                            style={{maxWidth:"60px"}}
                                        />
                                    ))}
                                </div>
                                <div className="text-center mt-3 ">
                                    <button className="btn text-white px-3" style={{ background: "#0f9afc", width:"220px" }} onClick={handleOTP}>Verify otp</button>
                                    <div className="mt-1">
                                        <p > Don`t received a code ? {
                                            ResendBtn ? <span className=" text-decoration-underline  text-primary cursor-pointer" onClick={sendOTP} >Resend otp</span> : <span> Try again in  <span className="text-primary">{formatTime(time)}</span> mins.</span>
                                        } </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default ForgetOTP
