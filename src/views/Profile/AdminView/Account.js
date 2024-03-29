/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsBank } from "react-icons/bs"
import { FaPaypal } from "react-icons/fa"
import Select from 'react-select'
import { Button, Card, CardBody, Col, Modal, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { affiliateURL, deleteReq, getReq, postReq, putReq } from '../../../assets/auth/jwtService'
import Spinner from '../../Components/DataTable/Spinner'
const Account = () => {
  const [modal, setModal] = useState(false)
  const [usePage, setPage] = useState(1)
  const [useCountry, setCountry] = useState([])
  const [useCurrency, setCurrency] = useState([])
  const [useEmailVerify, setEmailVerify] = useState(true)

  const toggle = () => setModal(!modal)
  const deafultData = {
    account_type: "Ind",
    pay_method: "Bank",
    branch_name : '',
    bank_country : '',
    bank_currency : '',
    ifsc_code : '',
    gstin_number : '',
    tax_id : '',
    account_no : '',
    account_holder_name : '',
    paypal_email : '',
    date_of_birth : '',
    reg_business_name : ''
  }


  const [useAccDetails, setAccDetails] = useState(deafultData)

  const [isLoading, setIsLoading] = useState(true)
  const [id, setId] = useState('')

  const getBankDetails = () => {
    getReq('bank_view', "", affiliateURL)
      .then((res) => {
        console.log("bank", res)
        setAccDetails(res?.data?.bank_details ?? deafultData)
        setId(res?.data?.bank_details?.id)
      })
      .catch((err) => {
        console.log(err)
      }).finally(() => setIsLoading(false))
  }

  const addBank = (e) => {
    e.preventDefault()
    const form_data = new FormData()
    if (useAccDetails.pay_method === "Paypal" && !useEmailVerify) {
      if (useAccDetails.paypal_email === '') {
        return toast.error("Email cannot be empty")
      } 
      return toast.error("Email don`t Match")
    }
    Object.entries(useAccDetails).forEach(([key, value]) => {
      if (
        (useAccDetails.account_type === "Ind" && key === "reg_business_name") ||
        (useAccDetails.account_type === "Bus" && key === "date_of_birth") ||
        (useAccDetails.pay_method === "Bank" && key === "paypal_email") ||
        (useAccDetails.pay_method === "Paypal" && (
          key === "bank_name" ||
          key === "branch_name" ||
          key === "bank_country" ||
          key === "bank_currency" ||
          key === "ifsc_code" ||
          key === "gstin_number" ||
          key === "tax_id" ||
          key === "account_no" ||
          key === "account_holder_name"
        ))
      ) {
        form_data.append(key, ' ')
      } else if (key === "Cemail") {
        return null
      } else (
        form_data.append(key, value)
      )

    })
    console.log(form_data)
    // return null
    postReq("bank_view", form_data, affiliateURL)
      .then((res) => {
        console.log(res)
        toast.success('Bank details added successfully')
        getBankDetails()
        setPage(1)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Server Error !')
      })
  }
  const uptBank = (e) => {
    e.preventDefault()
    const form_data = new FormData()
    Object.entries(useAccDetails).forEach(([key, value]) => {
      if (
        (useAccDetails.account_type === "Ind" && key === "reg_business_name") ||
        (useAccDetails.account_type === "Bus" && key === "date_of_birth") ||
        (useAccDetails.pay_method === "Bank" && key === "paypal_email") ||
        (useAccDetails.pay_method === "Paypal" && (
          key === "bank_name" ||
          key === "branch_name" ||
          key === "bank_country" ||
          key === "bank_currency" ||
          key === "ifsc_code" ||
          key === "gstin_number" ||
          key === "tax_id" ||
          key === "account_no" ||
          key === "account_holder_name"
        ))
      ) {
        form_data.append(key, '')
      } else if (key === "Cemail") {
        return null
      } else {
        form_data.append(key, value)
      }

    })

    putReq("bank_view", form_data, affiliateURL)
      .then((res) => {
        console.log(res)
        toast.success('Bank details updated successfully')
        getBankDetails()
        setPage(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const deleteBank = () => {
    toggle(false)

    deleteReq("bank_view", '', affiliateURL)
      .then((res) => {
        toast.success('Bank is Deleted!')
        console.log(res)
        setId(null)
        setAccDetails({
          account_type: "Ind",
          pay_method: "Bank"
        })
        setPage(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAccDetails({ ...useAccDetails, [name]: value })
  }

  const EmailComppare = () => {
    if (useAccDetails.paypal_email !== useAccDetails.Cemail) {
      setEmailVerify(false)
    } else {
      setEmailVerify(true)
    }
  }
  useEffect(() => {
    EmailComppare()
  }, [useAccDetails.Cemail, useAccDetails.paypal_email])
  
  useEffect(() => {
    getBankDetails()
    getReq('countries')
      .then((res) => {
        const newArr = res.data.data.countries.map((elm) => {
          return { label: elm.name, value: elm.name }
        })
        const curren = res.data.data.countries.map((elm) => {
          return { label: `${elm.currency_symbol} ${elm.currency}`, value: elm.currency }
        })
        setCountry(newArr)
        setCurrency(curren)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (isLoading) {
    return (<div className='d-flex justify-content-center align-items-center mt-2'>
      <Spinner size='40px' />
    </div>)
  }

  if (!id) {
    return (
      <div className=' py-5 w-100 d-flex flex-column  justify-content-center  align-items-center ' style={{ maxHeight: '300px' }}>
        <h4 className=''>You haven't added a bank account.</h4>
        <button className='btn btn-primary mt-2 px-3' onClick={() => setId("adding")}>Add an Bank Account</button>
      </div>
    )
  }

  if (id) {

    return (
      <>
        <Card>
          <CardBody>
            {
              false && <button className="btn btn-primary" type="button">Add Bank Account</button>
            }

            <div >
              {
                usePage === 1 &&
                <Row>
                  <h4>General Information</h4>

                  <Col md="12" className=''>
                    <label htmlFor="">Account Type</label>

                    <div className=" d-flex  gap-3" style={{ marginTop: "5px" }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="Ind"
                          type="radio"
                          name="acc_country"
                          checked={useAccDetails.account_type === "Ind"}
                          onChange={() => setAccDetails({ ...useAccDetails, account_type: "Ind" })}
                        />
                        <label className="form-check-label" htmlFor="Ind">
                          Individual
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="Bus"
                          type="radio"
                          name="acc_country"
                          checked={useAccDetails.account_type === "Bus"}
                          onChange={() => setAccDetails({ ...useAccDetails, account_type: "Bus" })}
                        />
                        <label className="form-check-label" htmlFor="Bus">
                          Registered Business
                        </label>
                      </div>
                    </div>
                  </Col>
                  {
                    useAccDetails.account_type === "Bus" && <Col md={5} className="mt-2">
                      <label htmlFor="basicDetails-first-name">Registered Business Name</label>
                      <input
                        placeholder="First Name"
                        type="text"
                        name="reg_business_name"
                        className="form-control"
                        value={useAccDetails.reg_business_name || ''}
                        onChange={handleInputChange}
                      />
                    </Col>
                  }

                  <Col md={5} className="mt-2">
                    <label htmlFor="basicDetails-first-name">First Name</label>
                    <input
                      placeholder="First Name"
                      type="text"
                      name="first_name"
                      className="form-control"
                      value={useAccDetails.first_name || ''}
                      onChange={handleInputChange}

                    />
                  </Col>
                  <Col md={5} className="mt-2">
                    <label htmlFor="basicDetails-first-name">Last Name</label>
                    <input
                      placeholder="Last Name"
                      type="text"
                      name="last_name"
                      className="form-control"
                      value={useAccDetails.last_name || ''}
                      onChange={handleInputChange}
                    />
                  </Col>
                  {
                    useAccDetails.account_type === "Ind" &&
                    <Col md={5} className="mt-2">
                      <label htmlFor="basicDetails-first-name">Select BirthDate</label>
                      <input
                        placeholder="Last Name"
                        type="date"
                        name="date_of_birth"
                        className="form-control"
                        value={useAccDetails.date_of_birth || ''}
                        onChange={handleInputChange}

                      />
                    </Col>
                  }
                  <Col md={10} className="mt-2">
                    <label htmlFor="basicDetails-first-name">Select Country</label>
                    <Select
                      className=''
                      options={useCountry}
                      defaultValue={{ value: useAccDetails.country, label: useAccDetails.country }}
                      onChange={(e) => setAccDetails({ ...useAccDetails, country: e.value })}
                    />
                  </Col>
                  <Col md={5} className="mt-2">
                    <label htmlFor="">Address</label>
                    <input
                      placeholder="Primary Address "
                      type="text"
                      name="address1"
                      className="form-control"
                      onChange={handleInputChange}
                      value={useAccDetails.address1 || ''}
                    />
                  </Col>
                  <Col md={5} className="mt-2">
                    <div className='d-flex justify-content-between '>
                      <label htmlFor="">Address 2</label>
                      <label className='font-small-1'>Optional</label>

                    </div>
                    <input
                      placeholder="Secondry address"
                      type="text"
                      name="address2"
                      className="form-control"
                      value={useAccDetails.address2 || ''}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={5} className="mt-2">
                    <label htmlFor="">City</label>
                    <input
                      placeholder="City"
                      type="text"
                      name="city"
                      className="form-control"
                      value={useAccDetails.city || ''}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={5} className="mt-2">
                    <div className='d-flex justify-content-between '>
                      <label htmlFor="">Postal Code</label>
                      <label className='font-small-1'>Optional</label>
                    </div>
                    <input
                      placeholder="Postal Code"
                      type="text"
                      name="postal_code"
                      className="form-control"
                      value={useAccDetails.postal_code || ''}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={10} className="mt-3 d-flex justify-content-between ">
                    <button className="btn btn-primary" type="button" onClick={() => { setAccDetails(deafultData); setId(false) }}>Cancel</button>
                    <button className="btn btn-secondary" type="button" onClick={() => setPage(2)}>Next</button>
                  </Col>

                </Row>
              }
              {
                usePage === 2 &&
                <Row>
                  <div>

                    <h4>Select Payout Method</h4>

                    <div className='d-flex gap-2'>
                      <div onClick={() => setAccDetails({ ...useAccDetails, pay_method: "Bank" })} className={`border cursor-pointer rounded-2 p-1 px-2 text-center ${useAccDetails.pay_method === "Bank" ? "border-primary shadow-lg" : ''}`} style={{ minWidth: "100px" }}>
                        <BsBank />
                        <h6>Bank</h6>
                      </div>
                      <div onClick={() => setAccDetails({ ...useAccDetails, pay_method: "Paypal" })} className={`border cursor-pointer rounded-2 p-1 px-2 text-center ${useAccDetails.pay_method === "Paypal" ? "border-primary shadow-lg" : ''}`} style={{ minWidth: "100px" }}>
                        <FaPaypal />
                        <h6>Paypal</h6>
                      </div>
                    </div>
                    {
                      useAccDetails.pay_method === "Bank" ? <div>
                        <p className='m-0 mt-1'>Processing time : <span className='fw-bold'> 1-2 Business Days</span></p>
                        <p className='m-0'>Estimated Fees : <span className='fw-bold'>0.00 USD</span></p>
                      </div> : <div>
                        <p className='m-0 mt-1'>Processing time : <span className='fw-bold'> Same day</span></p>
                        <p className='m-0'>Estimated Fees : <span className='fw-bold'>Paypal fees may apply</span></p>
                      </div>

                    }

                  </div>

                  {
                    useAccDetails.pay_method === "Bank" &&
                    <div>
                      <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-first-name">Bank Name</label>
                        <input
                          placeholder="Bank name "
                          type="text"
                          name="bank_name"
                          className="form-control"
                          value={useAccDetails.bank_name || ''}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-first-name">Branch Name</label>
                        <input
                          placeholder="Branch name "
                          type="text"
                          name="branch_name"
                          className="form-control"
                          value={useAccDetails.branch_name || ''}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col md={7} className="mt-2">
                        <label htmlFor="basicDetails-first-name">Bank Account Country</label>
                        <Select
                          className=''
                          options={useCountry}
                          defaultValue={{ value: useAccDetails.country, label: useAccDetails.country }}
                          onChange={(e) => setAccDetails({ ...useAccDetails, bank_country: e.value })}
                        />
                      </Col>
                      <Col md={7} className="mt-2">
                        <label htmlFor="basicDetails-first-name">Bank Account Currency</label>
                        <Select
                          className=''
                          // defaultValue={{label:"fsdf", value:"Sdfsdf"}}
                          options={useCurrency}
                          defaultValue={{ value: useAccDetails.bank_currency, label: useAccDetails.bank_currency }}
                          onChange={(e) => setAccDetails({ ...useAccDetails, bank_currency: e.value })}

                        />
                      </Col>
                      <Col md={7} className="mt-2">
                        <label htmlFor="">IFSC Code</label>
                        <input
                          placeholder="IFSC Code "
                          type="text"
                          name="ifsc_code"
                          className="form-control"
                          value={useAccDetails.ifsc_code || ''}
                          onChange={handleInputChange}
                        />
                        <small>Bank State Branch code has 6 digits</small>
                      </Col>
                      {
                        useAccDetails.country === 'India' ? <Col md={7} className="mt-2">
                          <label htmlFor="">GST Number</label>
                          <input
                            placeholder="GST number "
                            type="text"
                            name="gstin_number"
                            className="form-control"
                            value={useAccDetails.gstin_number || ''}
                            onChange={handleInputChange}
                          />
                        </Col> : <Col md={7} className="mt-2">
                          <label htmlFor="">TAX ID</label>
                          <input
                            placeholder="TAX ID "
                            type="text"
                            name="tax_id"
                            className="form-control"
                            value={useAccDetails.tax_id || ''}
                            onChange={handleInputChange}
                          />
                        </Col>
                      }

                      <Col md={7} className="mt-2">
                        <label htmlFor="">Account Number</label>
                        <input
                          placeholder="Account Number "
                          type="text"
                          name="account_no"
                          className="form-control"
                          value={useAccDetails.account_no || ''}
                          onChange={handleInputChange}

                        />
                        <small>Bank State Branch code has 8-12 digits</small>
                      </Col>
                      <Col md={7} className="mt-2">
                        <label htmlFor="">Name of Account Holder <small>(as shown on bank statements)</small></label>
                        <input
                          placeholder="Name of Account Holder"
                          type="text"
                          name="account_holder_name"
                          className="form-control"
                          onChange={handleInputChange}
                          value={useAccDetails.account_holder_name || ''}

                        />
                      </Col>
                    </div>
                  }

                  {
                    useAccDetails.pay_method === "Paypal" &&
                    <div>
                      <Col md={7} className="mt-2">
                        <label htmlFor="basicDetails-first-name">Email address of your existing PayPal Account</label>
                        <input
                          placeholder="Email Address"
                          type="text"
                          name="paypal_email"
                          className="form-control"
                          onChange={handleInputChange}
                          value={useAccDetails.paypal_email || ''}

                        />
                      </Col>
                      <Col md={7} className="mt-2">
                        <label htmlFor="basicDetails-first-name">Confirm the email address of your existing PayPal Account</label>
                        <input
                          placeholder="Confirm Email Address"
                          type="text"
                          name="Cemail"
                          className="form-control"
                          value={useAccDetails.Cemail || ''}
                          onChange={handleInputChange}
                        />
                        { !useEmailVerify &&
                          <p className='text-danger' >Email ID does not match</p>
                        }
                      </Col>
                    </div>}

                  <Col md={10} className="mt-3 d-flex justify-content-between ">
                    <button className="btn btn-primary" type="button" onClick={() => setPage(1)}>Back</button>


                    {
                      id === "adding" ? <button className="btn btn-secondary"  onClick={addBank} >Save</button> : <div >
                        <button className="btn btn-danger me-2"  onClick={toggle} >Delete</button>
                        <button className="btn btn-secondary me-2"  onClick={uptBank} >Update</button>
                      </div>
                    }


                  </Col>

                </Row>
              }

            </div>
          </CardBody >
          <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader >Are you sure want to delete your bank account? </ModalHeader>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                No
              </Button>
              <Button color="secondary" onClick={deleteBank}>
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        </Card >
      </>
    )
  }


}

export default Account