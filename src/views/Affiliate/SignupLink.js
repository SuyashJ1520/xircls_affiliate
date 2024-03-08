import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Container, Input, InputGroup, Row } from 'reactstrap'
import { Copy } from 'react-feather'
import Form from 'react-bootstrap/Form'
import toast from 'react-hot-toast'
import { getReq } from '../../assets/auth/jwtService'
import Select from 'react-select'

const SignupLink = () => {
    const [selected, setSelected] = useState('product')

    const [resData, setResData] = useState({ product: [] })

    const [productSlug, setProductSlug] = useState("Infiniti")

    const [selectPage, setSelectPage] = useState("infiniti")

    const getProdSlug = () => {
        try {
            return resData?.product[resData?.product?.findIndex($ => $?.name === productSlug)]?.unique_id
        } catch (_) {
            return ""
        }
    }

    const pageArr = [
        { label: "Infiniti", value: "infiniti" },
        { label: "Semper Fi", value: "semper_fi" },
        { label: "Sniper", value: "sniper" },
        { label: "SuperLeadz", value: "superleadz" },
        { label: "Flash Accounts", value: "flash_accounts" },
        { label: "Home", value: "home" }
    ]

    const urls = {
        general: `https://www.xircls.com/merchant/signup/?aft_no=${resData?.user?.slug}`,
        product: `https://www.xircls.com/merchant/signup/?aft_no=${resData?.user?.slug}&prod=${getProdSlug()}`,
        page: {
            infiniti: `https://www.xircls.com/products/infiniti/customer-acquisition-and-loyalty/?aft_no=${resData?.user?.slug}`,
            semper_fi: `https://www.xircls.com/products/semperfi/customer-loyalty/?aft_no=${resData?.user?.slug}`,
            sniper: `https://www.xircls.com/about-us/vision-&-mission-statement/?aft_no=${resData?.user?.slug}`,
            superleadz: `https://www.xircls.com/about-us/vision-&-mission-statement/?aft_no=${resData?.user?.slug}`,
            flash_accounts: `https://www.xircls.com/about-us/vision-&-mission-statement/?aft_no=${resData?.user?.slug}`,
            home: `https://www.xircls.com/?aft_no=${resData?.user?.slug}`
        }
    }

    console.log({ resData, urls })

    useEffect(() => {
        getReq("userid")
            .then((res) => {
                setResData(res.data)
            })
            .catch((err) => {
                toast.error('Something went wrong!')
                // navigate("/new_signup/new_mode/")
                console.log(err)
            })
    }, [])

    return (
        <>
            <Card>
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <h3 className='display-6 text-center mb-2'>Generate Sign-Up Link</h3>
                                <hr />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col xs={3}>
                                <label>Link Type</label>
                            </Col>
                            <Col xs={3}>
                                <div className="form-check"><input checked={selected === "product"} onChange={() => {
                                    setSelected("product")
                                }} type="radio" id='select_product' name='selectType' className="form-check-input" /><label htmlFor='select_product' className="form-check-label">Product</label></div>
                            </Col>
                            <Col xs={3}>
                                <div className="form-check"><input checked={selected === "general"} onChange={() => {
                                    setSelected("general")
                                }} type="radio" id='select_general' name='selectType' className="form-check-input" /><label htmlFor='select_general' className="form-check-label">General</label></div>
                            </Col>
                            <Col xs={3}>
                                <div className="form-check"><input checked={selected === "page"} onChange={() => {
                                    setSelected("page")
                                }} type="radio" id='select_page' name='selectType' className="form-check-input" /><label htmlFor='select_page' className="form-check-label">Page</label></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label>Referral Link</label>
                            </Col>
                            {selected === "product" ? <Col xs={3}>
                                <Select value={{ label: resData?.product[resData?.product?.findIndex($ => $?.name === productSlug)]?.name, value: resData?.product[resData?.product?.findIndex($ => $?.name === productSlug)]?.unique_id }} onChange={(e) => {
                                    setProductSlug(e.label)
                                }} options={resData?.product?.map(product => {
                                    return { label: product?.name, value: product?.unique_id }
                                })} />
                            </Col> : selected === "page" ? <Col xs={3}>
                                <Select value={pageArr?.filter($ => $.value === selectPage)} options={pageArr} onChange={e => {
                                    setSelectPage(e.value)
                                }} />
                            </Col> : <Col xs={3}>
                                <InputGroup>
                                    <Input readOnly defaultValue={urls?.general} />
                                    <Button onClick={() => {
                                        navigator.clipboard
                                            .writeText(urls?.general)
                                            .then(() => toast.success("Copied to clipboard!"))
                                            .catch(() => toast.error("Copy failed. Please try again."))
                                    }} color='primary'>
                                        <Copy size={15} />
                                    </Button>
                                </InputGroup>
                            </Col>}
                            {selected === "product" ? <Col xs={3}>
                                <InputGroup>
                                    <Input readOnly defaultValue={urls?.product} />
                                    <Button onClick={() => {
                                        navigator.clipboard
                                            .writeText(urls?.product)
                                            .then(() => toast.success("Copied to clipboard!"))
                                            .catch(() => toast.error("Copy failed. Please try again."))
                                    }} color='primary'>
                                        <Copy size={15} />
                                    </Button>
                                </InputGroup>
                            </Col> : selected === "page" ? <Col xs={3}>
                                <InputGroup>
                                    <Input readOnly defaultValue={urls?.page?.[selectPage]} />
                                    <Button onClick={() => {
                                        navigator.clipboard
                                            .writeText(urls?.page?.[selectPage])
                                            .then(() => toast.success("Copied to clipboard!"))
                                            .catch(() => toast.error("Copy failed. Please try again."))
                                    }} color='primary'>
                                        <Copy size={15} />
                                    </Button>
                                </InputGroup>
                            </Col> : <>
                            </>}
                        </Row>
                    </Container>
                </CardBody>
            </Card>
            {/* <Row>
                <Card>
                    <CardBody>
                        <h3 className='display-6 text-center mb-2'>Generate Sign-Up Link</h3>
                        <hr />
                        <Row className='mt-2'>
                            <Col sm={3}>
                                <label>Link Type</label>
                            </Col>
                            <Col sm={3}>
                                <div className='d-flex align-items-center gap-1'>
                                    <input type="radio" value="product" name="radio" onChange={() => {
                                        setSelected('product')
                                        setVal(subselected["product"].infinti)
                                    }} checked={selected === 'product'} />
                                    <label>Product</label>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className='d-flex align-items-center gap-1'>
                                    <input type="radio" value="general" name="radio" onChange={() => {
                                        setSelected('general')
                                        setVal(subselected["general"])
                                    }} checked={selected === 'general'} />
                                    <label>General</label>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className='d-flex align-items-center gap-1'>
                                    <input type="radio" value="page" name="radio" onChange={() => {
                                        setSelected('page')
                                        setVal(subselected["page"].home)
                                    }} checked={selected === 'page'} />
                                    <label>Page</label>
                                </div>
                            </Col>

                        </Row>

                        <Row className='mt-4'>
                            <Col sm={4}>
                                <label>Referral Link</label>
                            </Col>
                            {selected === 'general' ? (
                                <Col sm={4}>
                                    <div className="input-group w-100">
                                        <input
                                            value={subselected[selected]}
                                            type="text"
                                            className="form-control"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            id="button-addon2"
                                        >
                                            <Copy style={{ cursor: "pointer" }}
                                                size={25}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(val)
                                                    toast('Copied')
                                                }} />
                                        </button>
                                    </div>
                                </Col>
                            ) : (
                                <>
                                    <Col sm={4}>
                                        <Form.Select onChange={e => {
                                            setVal(e.target.value)
                                            console.log(e.target.value)
                                        }}>
                                            {Object.entries(subselected[selected]).map(([key, value]) => {
                                                return <option value={value}>{key}</option>
                                            })}


                                        </Form.Select>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="input-group">
                                            <input
                                                value={val}
                                                type="text"
                                                className="form-control"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                id="button-addon2"
                                            >
                                                <Copy style={{ cursor: "pointer" }}
                                                    size={25}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(val)
                                                        toast('Copied')
                                                    }} />
                                            </button>
                                        </div>
                                    </Col>
                                </>
                            )}

                        </Row>
                    </CardBody>
                </Card>
            </Row > */}
        </>
    )
}

export default SignupLink