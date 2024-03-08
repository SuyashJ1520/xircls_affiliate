/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Card, CardBody, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { affiliateURL, deleteReq, getReq, postReq, putReq } from '../../../assets/auth/jwtService'
import Spinner from '../../Components/DataTable/Spinner'

const Account = () => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const deafultData = {
    is_saving: true,
    is_indian: true,
    account_no: "",
    account_holder_name: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    pan_number: "",
    gstin_number: "",
    country: "",
    tax_id: ""
  }


  const [formData, setFormData] = useState(deafultData)

  const [isLoading, setIsLoading] = useState(true)
  const [id, setId] = useState("")

  const handleInputChange = (e, type) => {
    const { name, value } = e.target
    if (type === "formData") {
      console.log("formData")
      setFormData((prev) => ({ ...prev, [name]: value === "" ? null : value }))
    }
  }

  const validate = () => {
    if (formData.is_saving) {
      for (const key in deafultData) {
        console.log(key, "", deafultData[key])
        if (key === 'is_saving') {
          continue
        } else if ((deafultData[key] === "" || deafultData[key] === null)) {
          toast.error(`${key} cannot be empty`)
          break
        }
        return false // Found an empty value
      }
    }
  }
  const getBankDetails = () => {
    getReq('bank_view', "", affiliateURL)
      .then((res) => {
        console.log("bank", res)
        setFormData(res?.data?.bank_details ?? deafultData)
        setId(res?.data?.bank_details?.id)
      })
      .catch((err) => {
        console.log(err)
      }).finally(() => setIsLoading(false))
  }

  const addBank = () => {

    // if (!validate()) {
    //   return null
    // }
    const form_data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form_data.append(key, value)
    })
    console.log(form_data)

    // return null
    postReq("bank_view", form_data, affiliateURL)
      .then((res) => {
        console.log(res)
        toast.success('Bank details added successfully')
        getBankDetails()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const editBank = () => {
    const form_data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form_data.append(key, value)
    })
    console.log(form_data)
    form_data.append('id', id)
    // return null

    putReq("bank_view", form_data, affiliateURL)
      .then((res) => {
        console.log(res)
        toast.success('Bank details Edit successfully')
        getBankDetails()
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
        setFormData({
          is_saving: true,
          is_indian: true,
          account_no: "",
          account_holder_name: "",
          ifsc_code: "",
          bank_name: "",
          branch_name: "",
          pan_number: "",
          gstin_number: "",
          country: "",
          tax_id: ""
        })
        console.log(res)
        setId(null)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    getBankDetails()
  }, [])


  return (
    <>
      <Card>
        <CardBody>
          {
            isLoading ? (
              <div className='d-flex justify-content-center align-items-center mt-2'>
                <Spinner size='40px' />
              </div>
            ) : (
              <Row>
                <Col md={12} className="mt-2">
                  {
                    id ? (
                      <h4 className="mb-0">Edit Bank Account</h4>
                    ) : (
                      <div>
                        <h4 className="mb-0">Add Bank Account</h4>
                        <p className='text-danger'>You don`t have an account</p>
                      </div>
                    )
                  }
                </Col>
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={6} className="mt-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            id="saving_account"
                            type="radio"
                            name="account_type"
                            checked={formData.is_saving === true}
                            onChange={(() => {
                              // setRadioName("saving_account")
                              setFormData((prev) => ({ ...prev, is_saving: true }))

                            })}
                          />
                          <label className="form-check-label" htmlFor="saving_account">
                            Saving Account
                          </label>
                        </div>
                      </Col>

                      <Col md={6} className="mt-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            id="current_account"
                            type="radio"
                            name="account_type"
                            checked={formData.is_saving === false}

                            onChange={(() => {
                              setFormData((prev) => ({ ...prev, is_saving: false }))
                              // setRadioName("current_account")
                            })}
                          />
                          <label className="form-check-label" htmlFor="current_account">
                            Current Account
                          </label>
                        </div>
                      </Col>

                      {
                        formData?.is_saving === false &&
                        <>
                          <Col md={6} className="mt-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                id="indian"
                                type="radio"
                                name="acc_country"
                                checked={formData.is_indian === true}
                                onChange={(() => {
                                  // setCountryName("indian")
                                  setFormData((prev) => ({ ...prev, is_indian: true }))
                                })}
                              />
                              <label className="form-check-label" htmlFor="indian">
                                Based in India
                              </label>
                            </div>
                          </Col>

                          <Col md={6} className="mt-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                id="non_indian"
                                type="radio"
                                name="acc_country"
                                checked={formData.is_indian === false}

                                onChange={(() => {
                                  // setCountryName("non_indian")
                                  setFormData((prev) => ({ ...prev, is_indian: false }))

                                })}
                              />
                              <label className="form-check-label" htmlFor="non_indian">
                                Outside of India
                              </label>
                            </div>
                          </Col>
                        </>

                      }

                      {formData?.is_saving === false && formData?.is_indian === true ? (
                        <>
                          <Col md={4} className="mt-2">
                            <label htmlFor="basicDetails-first-name">Pan Number</label>
                            <input
                              placeholder="Pan Number"
                              value={formData?.pan_number}
                              type="text"
                              id="basicDetails-first-name"
                              name="pan_number"
                              className="form-control"
                              onChange={(e) => handleInputChange(e, "formData")}
                            />
                          </Col>

                          <Col md={4} className="mt-2">
                            <label htmlFor="basicDetails-first-name">GSTIN Number</label>
                            <input
                              placeholder="GSTIN Number"
                              value={formData?.gstin_number}
                              type="text"
                              id="basicDetails-first-name"
                              name="gstin_number"
                              className="form-control"
                              onChange={(e) => handleInputChange(e, "formData")}
                            />
                          </Col>
                        </>
                      ) : formData?.is_saving === false && formData?.is_indian === false && (
                        <>
                          <Col md={4} className="mt-2">
                            <label htmlFor="basicDetails-first-name">Tax Id</label>
                            <input
                              placeholder="Tax Id"
                              value={formData?.tax_id}
                              type="text"
                              id="basicDetails-first-name"
                              name="tax_id"
                              className="form-control"
                              onChange={(e) => handleInputChange(e, "formData")}
                            />
                          </Col>

                          <Col md={4} className="mt-2">
                            <label htmlFor="basicDetails-first-name">Country</label>
                            <input
                              placeholder="Country"
                              value={formData?.country}
                              type="text"
                              id="basicDetails-first-name"
                              name="country"
                              className="form-control"
                              onChange={(e) => handleInputChange(e, "formData")}
                            />
                          </Col>
                        </>
                      )}

                      <>
                        <Col md={4} className="mt-2">
                          <label htmlFor="basicDetails-first-name">
                            Account Number
                          </label>
                          <input placeholder="Account Number" value={formData?.account_no} type='text' id='basicDetails-first-name' name='account_no' className="form-control" onChange={(e) => handleInputChange(e, "formData")} />
                        </Col>

                        <Col md={4} className="mt-2">
                          <label htmlFor="basicDetails-first-name">
                            Account holder Name
                          </label>
                          <input placeholder="Name" value={formData?.account_holder_name} type='text' id='basicDetails-first-name' name='account_holder_name' className="form-control" onChange={(e) => handleInputChange(e, "formData")} />
                        </Col>

                        <Col md={4} className="mt-2">
                          <label htmlFor="basicDetails-first-name">
                            IFSC Code
                          </label>
                          <input placeholder="IFSC Code" value={formData?.ifsc_code} type='text' id='basicDetails-first-name' name='ifsc_code' className="form-control" onChange={(e) => handleInputChange(e, "formData")} />
                        </Col>

                        <Col md={4} className="mt-2">
                          <label htmlFor="basicDetails-first-name">
                            Bank Name
                          </label>
                          <input placeholder="Bank Name" value={formData?.bank_name} type='text' id='basicDetails-first-name' name='bank_name' className="form-control" onChange={(e) => handleInputChange(e, "formData")} />
                        </Col>

                        <Col md={4} className="mt-2">
                          <label htmlFor="basicDetails-first-name">
                            BranchIndividual Name
                          </label>
                          <input placeholder="Branch Name" value={formData?.branch_name} type='text' id='basicDetails-first-name' name='branch_name' className="form-control" onChange={(e) => handleInputChange(e, "formData")} />
                        </Col>
                      </>

                      {/* ---------------------------------- */}
                    </Row>

                    {
                      id ? (
                        <div className='d-flex justify-content-between mt-3'>
                          <div>
                            <button className="btn btn-danger" type="button" onClick={() => toggle()}>Delete</button>
                          </div>

                          <div className='d-flex justify-content-end gap-2 '>
                            <button className="btn btn-primary" type="button">Cancel</button>
                            <button className="btn btn-primary" type="button" onClick={() => editBank()}>Edit</button>
                          </div>
                        </div>
                      ) : (
                        <div>

                          <div className='d-flex justify-content-end gap-2 mt-3'>
                            <button className="btn btn-primary" type="button">Cancel</button>
                            <button className="btn btn-primary" type="button" onClick={() => addBank()}>Add Bank Account</button>
                          </div>
                        </div>
                      )
                    }

                  </Col>
                </Row>
              </Row >
            )
          }

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

export default Account