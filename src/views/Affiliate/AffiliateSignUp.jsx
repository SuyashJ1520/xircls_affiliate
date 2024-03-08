import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Container, Input, InputGroup, Row } from 'reactstrap'
import { selectPhoneList } from '../../Helper/data'
import Select from 'react-select'
import { Eye, EyeOff } from 'react-feather'
import { postReq } from '../../assets/auth/jwtService'

const AffiliateSignUp = () => {

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone_code: "",
    phone_no: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    password: "",
    confirm_password: ""
  })

  const [invalidList, setInvalidList] = useState([])

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
    setInvalidList([...invalidList].filter($ => $ !== e.target.name))
  }

  function handleSubmit() {
    const arr = new Array()
    const form_data = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value === "" && key !== "termsAndCondition") {
        arr.push(key)
      }
      form_data.append(key, value)
    })
    setInvalidList([...arr])
    if (arr.length <= 0) {
      console.log(form_data)
      postReq("signupaffliate", form_data)
        .then((res) => {
          // setApiLoader(false)
          console.log(res.data)
          const tokenValue = JSON.stringify(res.data)
          setToken(tokenValue)
          if (res.status === 201) {
            toast.success('Signed in successfully')
          }
        })
        .catch((err) => {
          console.log(err)
          // setApiLoader(false)
          toast.error(err.messages)
        })
    }
  }

  console.log({ invalidList })

  const [passwords, setPasswords] = useState({
    password: false,
    confirm_password: false
  })

  return (
    <Card>
      <CardBody>
        <Container fluid>
          <Row>
            <Col md={6} className='mb-2'>
              <label htmlFor="first_name">First name *</label>
              <input onChange={handleChange} value={data?.first_name} type="text" placeholder='First name' className="form-control" id="first_name" name="first_name" />
              {invalidList.includes("first_name") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="last_name">Last name *</label>
              <input onChange={handleChange} value={data?.last_name} type="text" placeholder='Last name' className="form-control" id="last_name" name="last_name" />
              {invalidList.includes("last_name") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="phone_no">Mobile Number *</label>
              <div className="d-flex gap-1 align-items-center">
                <Select className='w-25' placeholder="Ph Code" options={selectPhoneList} value={selectPhoneList.filter($ => $?.value === data?.phone_code)} onChange={(e) => handleChange({ target: { name: "phone_code", value: e?.value } })} />
                <input onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    handleChange(e)
                  }
                }} value={data?.phone_no} type="text" placeholder='Mobile Number' className="form-control flex-grow-1" id="phone_no" name="phone_no" />
              </div>
              {(invalidList.includes("phone_code") || invalidList.includes("phone_no")) && <span className='text-danger' style={{ fontSize: "12px" }}>These fields are required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="username">Email Address *</label>
              <input onChange={handleChange} value={data?.username} type="text" placeholder='Email Address' className="form-control" id="username" name="username" />
              {invalidList.includes("username") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="address1">Address 1 *</label>
              <textarea onChange={handleChange} value={data?.address1} type="text" placeholder='Address 1' className="form-control" id="address1" name="address1" />
              {invalidList.includes("address1") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="address2">Address 2 *</label>
              <textarea onChange={handleChange} value={data?.address2} type="text" placeholder='Address 2' className="form-control" id="address2" name="address2" />
              {invalidList.includes("address2") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="country">Country *</label>
              <input onChange={handleChange} value={data?.country} type="text" placeholder='Country' className="form-control" id="country" name="country" />
              {invalidList.includes("country") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="state">State *</label>
              <input onChange={handleChange} value={data?.state} type="text" placeholder='State' className="form-control" id="state" name="state" />
              {invalidList.includes("state") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="city">City *</label>
              <input onChange={handleChange} value={data?.city} type="text" placeholder='City' className="form-control" id="city" name="city" />
              {invalidList.includes("city") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="pincode">Pin Code *</label>
              <input onChange={handleChange} value={data?.pincode} type="text" placeholder='Pin Code' className="form-control" id="pincode" name="pincode" />
              {invalidList.includes("pincode") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="password">Choose Password *</label>
              <InputGroup>
                <Input onChange={handleChange} value={data?.password} type={passwords.password ? "text" : "password"} placeholder='Password' id="password" name="password" />
                <Button onClick={() => setPasswords({ ...passwords, password: !passwords.password })} color='outline-primary' >
                  {passwords.password ? <Eye size={14} /> : <EyeOff size={14} />}
                </Button>
              </InputGroup>
              {invalidList.includes("password") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={6} className='mb-2'>
              <label htmlFor="confirm_password">Re-enter Password *</label>
              <InputGroup>
                <Input onChange={handleChange} value={data?.confirm_password} type={passwords.confirm_password ? "text" : "password"} placeholder='Re-enter Password' id="confirm_password" name="confirm_password" />
                <Button onClick={() => setPasswords({ ...passwords, confirm_password: !passwords.confirm_password })} color='outline-primary' >
                  {passwords.confirm_password ? <Eye size={14} /> : <EyeOff size={14} />}
                </Button>
              </InputGroup>
              {invalidList.includes("confirm_password") && <span className='text-danger' style={{ fontSize: "12px" }}>This field is required</span>}
            </Col>
            <Col md={12} className='mb-2'>
              <button className="btn btn-primary-main" onClick={handleSubmit}>Add affiliate person</button>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  )
}

export default AffiliateSignUp