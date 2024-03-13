import React, { useState } from 'react'
import emilVerify from './imgs/emilVerify.jpeg'
import { useParams } from 'react-router-dom'
import { affiliateURL } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'

export default function VerifyEmail() {

    const { id } = useParams()
    const [useIsEmailVerify, setIsEmailVerify] = useState(false)

    const verifyFun = () => {
        const formData = new FormData()
        formData.append("slug", id)
        fetch(`${affiliateURL}/affiliate/email_verification/`, {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.json()
        }).then((res) => {
            if (res.message) {
                setIsEmailVerify(true)
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Server Error !")
        })
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>

            {
                useIsEmailVerify ? <div className=' shadow-lg rounded-2 text-center' style={{ maxWidth: "600px", width: "100%", minHeight: "400px" }}>
                    <div>

                        <div className='d-flex justify-content-center  align-items-center ' style={{ maxHeight: "250px", overflow: "hidden" }}>
                            <video autoPlay={true} className=' object-fit-cover '><source src="https://cdnl.iconscout.com/lottie/premium/thumb/verified-7239114-5874724.mp4" type="video/mp4" /></video>
                        </div>
                        <h3>Email Verified </h3>
                        <a href="https://affiliate.xircls.com/affiliate/login/" className='btn text-white px-3 mt-1 rounded-1' style={{ background: "#006aff" }}>Go To Login Page</a>

                    </div>
                </div> : <div className=' shadow-lg rounded-2 text-center' style={{ maxWidth: "600px", width: "100%", minHeight: "400px" }}>
                    <div>
                        <img className='w-100' src={emilVerify} alt="Email Verification" />
                    </div>
                    <div className='text-center p-5 pt-3'>
                        <h3>Verify Your Email</h3>
                        <p className='fw-normal mt-1'>
                            {id}
                            You're almost ready to start enjoying Affiliate. Simply click the big Blue button below to verify your email address.
                        </p>
                        <button className='btn text-white px-3 mt-1 rounded-1' onClick={verifyFun} style={{ background: "#006aff" }}>Click to Verify Email</button>
                    </div>
                </div>
            }

        </div>

    )
}