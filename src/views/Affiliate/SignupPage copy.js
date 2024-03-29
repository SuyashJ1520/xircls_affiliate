/* eslint-disable no-unused-vars */
import { Container, Row, Col } from "reactstrap"
import { useEffect, useState } from "react"
import { affiliateURL, baseURL, getReq, postReq } from "../../assets/auth/jwtService"
import { setToken } from "../../assets/auth/auth"
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom"
import { selectPhoneList } from "../../Helper/data"
import Select from 'react-select'
import { validForm, validateEmail } from "../Validator"
import { Eye, EyeOff } from "react-feather"
import FrontBaseLoader from "../Components/Loader/Loader"
import axios from "axios"
import Footer from "../XirclsFrontend/base/Footer"

const SignupPage = () => {
  const [useLoader, setLoader] = useState(false)
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const urlParams = new URLSearchParams(window.location.search)
  const affid = urlParams.get('affid')
  const valueToCheck = [
    {
      name: 'first_name',
      message: 'Please enter your first name',
      type: 'string',
      id: 'first_name'
    },
    {
      name: 'last_name',
      message: 'Please enter your last name',
      type: 'string',
      id: 'last_name'
    },
    // {
    //   name: 'username',
    //   message: 'Please Enter your Username',
    //   type: 'text',
    //   id: 'username'
    // },
    {
      name: 'email',
      message: 'Please enter your email ID',
      type: 'string',
      id: 'email'
    },
    {
      name: 'phone_no',
      message: 'Please enter your phone number',
      type: 'string',
      id: 'phone_no'
    },
    {
      name: 'address1',
      message: 'Please Enter your Address',
      type: 'string',
      id: 'address1'
    },
    {
      name: 'country',
      message: 'Please Enter your Country',
      type: 'string',
      id: 'country'
    },
    {
      name: 'state',
      message: 'Please Enter your State',
      type: 'string',
      id: 'state'
    },
    {
      name: 'city',
      message: 'Please Enter your city',
      type: 'string',
      id: 'city'
    },
    {
      name: 'pincode',
      message: 'Please Enter your Pin code',
      type: 'number',
      id: 'pincode'
    },
    {
      name: 'password',
      message: 'Please enter your password',
      type: 'string',
      id: 'password'
    },
    {
      name: 'confirm_password',
      message: 'Please confirm your password',
      type: 'string',
      id: 'confirm_password'
    },
    {
      name: 'termsAndCondition',
      message: 'Please check the terms and privacy policy',
      type: 'string',
      id: 'termsAndCondition'
    }
  ]

  let checkForm = true
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  // const [apiLoader, setApiLoader] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    // username: "",
    phone_code: "",
    phone_no: "",
    address1: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    email: "",
    password: "",
    confirm_password: "",
    termsAndCondition: false,
    checkPassword: true,
    checkEmail: true,
    affiliateid: affid
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const ConfirmPasswordVisibility = () => {
    setShowRePassword(!showRePassword)
  }


  const inputChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleChange = (options, actionMeta, check) => {
    if (check) {
      const option_list = options.map((cur) => {
        return cur.value
      })
      setOfferData({ ...offerData, [actionMeta.name]: option_list })
    } else {
      setData({ ...data, [actionMeta.name]: options.value })
    }

  }

  const submitButtonHandler = () => {
    checkForm = validForm(valueToCheck, data)
    const formData = new FormData()
  
    // return null 
    Object.entries(data).map(([key, value]) => {
      formData.append(key, value)
    })
    
    if (checkForm) {
      const emailCheck = validateEmail(data.email)
      let test = true
      if (!data.checkEmail) {
        document.getElementById('email_val').innerHTML = 'Email already exist'
        test = false
      } else if (!data.checkPassword) {
        document.getElementById('confirm_password_val').innerHTML = "Passwords don't match"
        test = false
      } else {
        document.getElementById('email_val').innerHTML = ''
        document.getElementById('confirm_password_val').innerHTML = ""
      }

      if (test) {
        if (!emailCheck) {
          toast.error("Invaild email ID")
        } else {
          setLoader(true)
          const formData = new FormData()
          Object.entries(data).map(([key, value]) => formData.append(key, value))
          console.log(formData)
          postReq("signupaffliate", formData, affiliateURL)

            .then((res) => {
              // setApiLoader(false)
              console.log(res.data)
              const tokenValue = JSON.stringify(res.data)
              setToken(tokenValue)
              if (res.status === 200) {
                toast.success('User Signup Successfully!')
                navigate("/affiliate/login/")
              }
            })
            .catch((err) => {
              if (err.response && err.response.status === 400) {
                toast.error("Email Already Exist!")
              } else {
                toast.error("Server Error")
              }
            }).finally(() => setLoader(false))

        }

      }
    }
  }

  useEffect(() => {
    if (data.password !== "" || data.confirm_password !== "") {
      if (data.confirm_password === "") {

      } else {
        if (data.password !== data.confirm_password) {
          // checkPassword = false
          setData({ ...data, checkPassword: false })
          document.getElementById('confirm_password_val').innerHTML = "Passwords don't match"
          // setShowError(true)
        } else {
          document.getElementById('confirm_password_val').innerHTML = ""
          // checkPassword = true
          setData({ ...data, checkPassword: true })

        }
      }
    }
  }, [data.password, data.confirm_password])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(resp => {
        console.log(resp)
        setData({ ...data, phone_code: `${resp.country_calling_code}` })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  useEffect(() => {
    getReq('countries')
      .then((resp) => {
        console.log(resp)

        setCountry(resp.data.data.countries.map((curElem) => {
          return { value: curElem.id, label: `${curElem.name}` }
        }))
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  useEffect(() => {
    if (data.country !== "") {

      const form_data = new FormData()
      form_data.append('country_id', data.country)
      postReq('getState', form_data)
        .then((resp) => {
          console.log(resp)
          setState(resp.data.data.states.map((curElem) => {
            return { value: curElem.id, label: `${curElem.name}` }
          }))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [data.country])

  const checkValidation = (e) => {
    if (e.target.value !== "") {
      const emailCheck = e.target.name === 'email' ? validateEmail(data.email) : true
      if (!emailCheck) {
        toast.error("Invaild email ID")
      } else {
        const form_data = new FormData()
        document.getElementById('email_val').innerHTML = ''
        // postReq("checkValid", form_data)
        axios.post(`${baseURL}/merchant/check_validation/`, form_data)
          .then(resp => {
            console.log(resp)
            if (resp.status === 400) {
              toast.error(resp.message)
              if (e.target.name === 'email') {
                document.getElementById('email_val').innerHTML = 'Email already exist'
                setData({ ...data, checkEmail: false })
              }

              // checkForm = false
            } else {
              const updatedData = {
                checkEmail: true
              }
              setData((preData) => ({
                ...preData,
                ...updatedData
              }))
            }
          })
          .catch((error) => {
            console.log(error)
            if (e.target.name === 'email') {
              document.getElementById('email_val').innerHTML = 'Email already exist'
              setData({ ...data, checkEmail: false })
            }
          })
      }

    }
  }

  console.log(data)

  return (
    <div className="products bg-white">
      {
        useLoader && <FrontBaseLoader />
      }
      <Container className="mt-5 mb-5">
        <Row>
          <Col lg={6} className='mx-auto px-2'>
            <div className="border p-1 p-md-3">
              <div>
                <h3 className="third-font   font-three mb-2">Sign Up for a New Affiliate Account</h3>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <div className="mt-2 ">
                    <label className="font-three form-label label" htmlFor="">First Name: *</label>
                    <input autoComplete="off" type="text" className="w- form-input" name="first_name" value={data.first_name} placeholder="First Name" onChange={(e) => inputChangeHandler(e)} />
                    <p id="first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mt-2 ">
                    <label className="font-three form-label label" htmlFor="last_name">Last Name: *</label>
                    <input autoComplete="off" type="text" className="w- form-input" name="last_name" value={data.last_name} placeholder="Last Name" onChange={(e) => inputChangeHandler(e)} />
                    <p id="last_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-2 ">
                <label className="font-three form-label label" htmlFor="">User Name: *</label>
                <input autoComplete="off" type="text" className="w- form-input" name="username" value={data.username} placeholder="User Name" onChange={(e) => inputChangeHandler(e)} />
                <p id="username_val" className="text-danger m-0 p-0 vaildMessage"></p>
              </div> */}

              <div className="mb-2 mt-2">
                <label className="font-three form-label label" htmlFor="">Email address: *</label>
                <input type="email" name="fake-email" style={{ display: 'none' }} />
                <input type="email" className="w- form-input" name="email" placeholder="Email address" value={data.email} onBlur={(e) => checkValidation(e)} onChange={(e) => inputChangeHandler(e)} />
                <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
              </div>
              <div className="mb-2 mt-2 ">
                <label className="font-three form-label label" htmlFor="">Mobile Number: *</label>
                <div className="row">
                  <div className="col-md-3 mb-md-0 mb-2">
                    <Select
                      isMulti={false}
                      options={selectPhoneList}
                      inputId="aria-example-input"
                      closeMenuOnSelect={true}
                      name="phone_code"
                      onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                      value={data?.phone_code ? selectPhoneList.filter(option => data?.phone_code.includes(option.value)) : ""}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          fontSize: '12px',
                          margin: 0,
                          height: '100%'
                        })
                      }}
                    />
                  </div>
                  <div className="col-md-9 mb-md-0 mb-2">
                    <div className="w-100">
                      <input type="text" autoComplete="off" className="w-100 form-input" name="phone_no" value={data.phone_no} placeholder="Mobile Number" onChange={(e) => inputChangeHandler(e)} />
                    </div>
                  </div>
                </div>
                <p id="phone_no_val" className="text-danger m-0 p-0 vaildMessage"></p>

              </div>

              <div className="mb-2 ">
                <label className="font-three form-label label" htmlFor="">Address 1: *</label>
                <input type="text" name="address1" value={data.address1} style={{ display: 'none' }} />
                <input type="text" className="w- form-input" name="address1" value={data.address1} placeholder="Enter address" onBlur={(e) => checkValidation(e)} onChange={(e) => inputChangeHandler(e)} />
                <p id="address1_val" className="text-danger m-0 p-0 vaildMessage"></p>
              </div>

              <div className="mb-2 ">
                <label className="font-three form-label label" htmlFor="">Address 2: *</label>
                <input type="text" name="address2" style={{ display: 'none' }} />
                <input type="text" className="w- form-input" name="address2" placeholder="Enter address" onBlur={(e) => checkValidation(e)} onChange={(e) => inputChangeHandler(e)} />
              </div>

              <div className="d-flex justify-content-between gap-1">
                <div className="w-50">
                  <label className="font-three form-label label" htmlFor="">Country: *</label>
                  <input type="text" name="country" style={{ display: 'none' }} />
                  {/* <input type="text" className="w- form-input" name="country" value={data.country} placeholder="Country" onBlur={(e) => checkValidation(e)} onChange={(e) => inputChangeHandler(e)} /> */}
                  <p id="country_val" className="text-danger m-0 p-0 vaildMessage"></p>
                  <Select
                    options={country}
                    inputId="aria-example-input"
                    closeMenuOnSelect={true}
                    name="country"
                    placeholder="Select Country"
                    value={country.filter(option => String(data?.country) === String(option.value))}
                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                  />
                </div>
                <div className=" w-50">
                  <label className="font-three form-label label" htmlFor="">State: *</label>
                  <input type="text" name="state" style={{ display: 'none' }} />
                  {/* <input type="text" className="w- form-input" name="state" value={data.state} placeholder="State" onBlur={(e) => checkValidation(e)} onChange={(e) => inputChangeHandler(e)} /> */}
                  <Select
                    options={state ?? []}
                    inputId="aria-example-input"
                    closeMenuOnSelect={true}
                    noOptionsMessage={() => "Please select a state"}
                    name="state"
                    placeholder="Select state"
                    value={state.filter(option => String(data?.state) === String(option.value))}
                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                  />
                  <p id="state_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </div>
              </div>

              <div className="d-flex justify-content-between gap-1 mt-2">
                <div className="w-50">
                  <label className="font-three form-label label" htmlFor="">City: *</label>
                  <input type="text" name="city" style={{ display: 'none' }} />
                  <input type="text" className="w- form-input" name="city" value={data.city} placeholder="City" onBlur={(e) => checkValidation(e)} onChange={(e) => inputChangeHandler(e)} />
                  <p id="city_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </div>

                <div className=" w-50">
                  <label className="font-three form-label label" htmlFor="">Pin Code: *</label>
                  <input type="number" name="pincode" style={{ display: 'none' }} />
                  <input type="number" className="w- form-input" name="pincode" value={data.pincode} placeholder="Pin code" onBlur={(e) => checkValidation(e)} onChange={(e) => inputChangeHandler(e)} />
                  <p id="pincode_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </div>
              </div>

              <div className="mb-2 mt-2 ">
                <label className="font-three form-label label" htmlFor="">Choose Password: *</label>
                <div className="input-group">
                  <input type="password" name="fake-password" style={{ display: 'none' }} />
                  <input autoComplete="off" type={showPassword ? "text" : "password"} className="w- form-input" name="password" value={data.password} onChange={(e) => inputChangeHandler(e)} placeholder="Choose Password" required aria-autocomplete="list" />
                  <div className="input-group-addon position-relative">
                    {showPassword ? (
                      <EyeOff
                        size={15}
                        className="feather-icon position-absolute top-50 end-50 translate-middle-y me-1 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <Eye
                        size={15}
                        className="feather-icon position-absolute top-50 end-50 translate-middle-y me-1 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
                <p id="password_val" className="text-danger m-0 p-0 vaildMessage"></p>

              </div>
              <div className="mb-2 mt-2 ">
                <label className="font-three form-label label" htmlFor="">Re-enter Password: *</label>
                <div className="input-group">
                  <input autoComplete="off" type={showRePassword ? "text" : "password"} className="w- form-input" name="confirm_password" value={data.confirm_password} onChange={(e) => inputChangeHandler(e)} placeholder="Re-enter Password" required aria-autocomplete="list" />
                  <div className="input-group-addon position-relative">
                    {showRePassword ? (
                      <EyeOff
                        size={15}
                        className="feather-icon position-absolute top-50 end-50 translate-middle-y me-1 cursor-pointer"
                        onClick={ConfirmPasswordVisibility}
                      />
                    ) : (
                      <Eye
                        size={15}
                        className="feather-icon position-absolute top-50 end-50 translate-middle-y me-1 cursor-pointer"
                        onClick={ConfirmPasswordVisibility}
                      />
                    )}
                  </div>
                </div>
                <p id="confirm_password_val" className="text-danger m-0 p-0 vaildMessage"></p>
              </div>
              <div className="parent mb-3 mt-2">
                <div className=" d-flex align-items-center">
                  <input id="privacy" type="checkbox" checked={data.termsAndCondition} onChange={() => setData({ ...data, termsAndCondition: !data.termsAndCondition })} />
                  <label htmlFor="privacy" className="cursor-pointer">
                    <div className="ms-1 fw-bolder" style={{ textTransform: 'uppercase' }}>
                      By signing up, you agree to XIRCLS'

                      <a href="" target="" className="text-blue">  Terms of Use </a>

                      and

                      <a href="" target="" className="text-blue">  Privacy Policy.</a>


                    </div>

                  </label>
                </div>
                <p id="termsAndCondition_val" className="text-danger m-0 p-0 vaildMessage"></p>

              </div>
              <div className="mb-3">
                <button onClick={() => submitButtonHandler()} type="button" className="btn bg-black text-white me-1 form-btn">Sign Up</button>
              </div>
              <div>
                <span className="sixth-font fs-5">
                  Already a XIRCLS merchant? Login <Link to="/affiliate/login/" className="text-blue">here</Link>.
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <Footer/> */}
    </div>
  )
}

export default SignupPage