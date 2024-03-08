import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginRedirect = ({goTo}) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/affiliate/${goTo}/`)
    }, [])
  return (
    <></>
  )
}

export default LoginRedirect