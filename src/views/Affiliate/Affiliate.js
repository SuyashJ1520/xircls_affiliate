/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { SiConvertio } from 'react-icons/si'
import { Card, CardBody, Col, Input, InputGroup, Modal, ModalBody, Row } from "reactstrap"
import "../Affiliate/affiliate.css"

// import { SiConvertio } from "react-icons/si"
import CardCom from "../Components/SuperLeadz/CardCom"
// import axios from "axios"
import { Copy, UserPlus, Users } from "react-feather"
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import { affiliateURL, getReq, postReq } from "../../assets/auth/jwtService"
// import axios from "axios"
import Spinner from "@src/views/Components/DataTable/Spinner.js"
import FrontBaseLoader from "../Components/Loader/Loader"
import AllEarnings from "./components/AllEarnings"

const Affiliate = () => {
  const [apiLoader, setApiLoader] = useState(false)
  const [tableData, setTableData] = useState([])
  const [cardData, setCardData] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [isModal, setIsModal] = useState(false)
  const [isModal2, setIsModal2] = useState(false)

  const [inputChange, setInputChange] = useState({
    withdraw_amount: "",
    withdraw_remark: ""
  })

  const [resData, setResData] = useState()

  const [productSlug, setProductSlug] = useState("Infiniti")

  const [selectPage, setSelectPage] = useState("infiniti")

  const navigate = useNavigate()

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
    general: `https://www.xircls.com/merchant/signup/?aft_no=${resData?.user?.unique_id}`,
    product: `https://www.xircls.com/merchant/signup/?aft_no=${resData?.user?.unique_id}&prod=${getProdSlug()}`,
    page: {
      infiniti: `https://www.xircls.com/products/infiniti/?aft_no=${resData?.user?.unique_id}`,
      semper_fi: `https://www.xircls.com/products/semperfi/?aft_no=${resData?.user?.unique_id}`,
      sniper: `https://www.xircls.com/products/sniper/?aft_no=${resData?.user?.unique_id}`,
      superleadz: `https://www.xircls.com/products/superleadz/?aft_no=${resData?.user?.unique_id}`,
      flash_accounts: `https://www.xircls.com/products/flash_accounts?aft_no=${resData?.user?.unique_id}`,
      home: `https://www.xircls.com/?aft_no=${resData?.user?.unique_id}`
    }
  }

  const [walletData, setWalletData] = useState({
    payout_count: 0,
    clicks_count: "",
    customers_count: "",
    leads_count: ""
  })

  const [dashData, setDashData] = useState({
    conversion_rate: "",
    average_order_value: ""
  })
  const [withdraw_amount_error, setWithdraw_amount_error] = useState({
    isValid: false,
    msg: ''
  })
  const withdraw_amount_error_fun = () => {
    if (inputChange.withdraw_amount === '0' || inputChange.withdraw_amount === '') {
      setWithdraw_amount_error({
        isValid: false,
        msg: 'Enter valid amount'
      })
      return false
    } else if (inputChange.withdraw_amount > cardData?.wallet_data?.withdrawable) {
      setWithdraw_amount_error({
        isValid: false,
        msg: 'Requested amount is more than withdrawable amount'
      })
      return false
    } else {
      setWithdraw_amount_error({
        isValid: true,
        msg: ''

      })
      return true

    }
  }

  const withdraw_amt_chnage = (e) => {
    setInputChange({ ...inputChange, withdraw_remark: e.target.value })
    withdraw_amount_error_fun()
  }

  useEffect(() => {
    getReq(`average_order_value`, "", affiliateURL)
      .then((data) => {
        console.log("average_order_value", data?.data?.average_order_value)
        const updateData = {
          average_order_value: data?.data?.average_order_value ? data?.data?.average_order_value : "0"
        }
        setDashData(() => ({
          ...updateData
        }))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    getReq(`conversion_rate`, "", affiliateURL)
      .then((data) => {
        console.log("conversion_rate", data?.data?.conversion_rate)
        const updateData = {
          conversion_rate: data?.data?.conversion_rate ? data?.data?.conversion_rate : "0"
        }
        setDashData(() => ({
          ...updateData
        }))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    getReq("dashboard", "", affiliateURL)
      .then((res) => {
        // console.log({res})
        setResData(res.data)

        const updateData = {
          clicks_count: res?.data?.clicks_count ?? "0",
          customers_count: res?.data?.customers_count ?? "0",
          leads_count: res?.data?.leads_count ?? "0",
          paid_all_time: res?.data?.paid_all_time ?? "0",
          payout_count: res?.data?.payout_count ??  "0"
        }
        setWalletData(() => ({
          ...updateData
        }))

        console.log(res.data.clicks_count, walletData, "ff")
      })
      .catch((err) => {
        toast.error('Something went wrong!')
        // navigate("/new_signup/new_mode/")
        console.log(err)
      })
  }, [])

  const getData = () => {
    getReq("affiliate_dashboard", "", affiliateURL)
      .then((data) => {
        console.log({ data }, "wassup dashboard")
        setTableData(data.data)
      })
      .catch((error) => {
        console.log({ error }, "error wassup dashboard")
      })

    getReq("affiliate_wallet", "", affiliateURL)
      .then((data) => {
        console.log({ data }, "wassup wallet")
        setCardData(data.data)

        setIsLoading(false)
      })
      .catch((error) => {
        console.log({ error }, "error wassup wallet")
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const withdrawReq = () => {
    if (!withdraw_amount_error_fun()) {
      return false
    }

    setIsModal2(false)
    setApiLoader(true)
    const form_data = new FormData()
    form_data.append("requested_amount", inputChange.withdraw_amount)
    form_data.append("action", "Pending")
    form_data.append("remark", inputChange.withdraw_remark)
    postReq("affiliate_withdrawn_request", form_data, affiliateURL)
      .then((res) => {
        console.log(res)
        getData()
        setApiLoader(false)
      })
      .catch((err) => {
        console.log(err)
        setApiLoader(false)
      })
  }
  // console.log("productSlug", productSlug)
  // console.log("selectPage", selectPage)
  // console.log("urls?.page?.[selectPage]", urls?.page?.[selectPage])
  return (
    <>
      <style>
        {`
          .modal .modal-content {
            box-shadow: 0 4px 15px -8px #464646 !important
          }
      `}
      </style>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }
      <Card>
        <CardBody className="d-flex justify-content-between align-items-center">
          <h3 className="m-0">Dashboard</h3>


            <div className=" px-1  d-flex gap-1 justify-content-center  align-items-center ">
             <h4 className="m-0">Wallet Balance : ₹ {cardData?.wallet_data?.withdrawable}</h4>
            <button className="btn btn-sm btn-primary" onClick={() => setIsModal2(!isModal2)}>Withdraw</button>
            </div>
          <div className="d-flex align-items-center gap-1">
            <button className="btn btn-primary-main w-100" onClick={() => setIsModal(!isModal)}>Affiliate Link</button>

            {/* <Link to='/merchant/create_support/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="Support"> */}
            {/* <AiFillPhone size={14} style={{ marginBottom: "2px" }} /> */}
            {/* </Link> */}
            {/* <Link to='/merchant/SuperLeadz/faq/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="FAQ"> */}
            {/* <AiOutlineQuestion size={14} style={{ marginBottom: "2px" }} /> */}
            {/* </Link> */}
            {/* <Link to='/merchant/SuperLeadz/billing/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="Billing"> */}
            {/* <BiDollar size={14} style={{ marginBottom: "2px" }} /> */}
            {/* </Link> */}
            {/* <Settings style={{ rotate: "90deg" }} size='60px' /> */}
          </div>
        </CardBody>
      </Card>
      <div className={`position-relative`}>
        <Row className="match-height">
          <Col md={6} onClick={() => navigate('/merchant/affiliate/all_revenue/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<img width={27} src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png"  />} title={"Total Sales"} info={'The total sales generated from your customers'} data={!isLoading ? `₹${cardData?.wallet_data?.total_revenue ?? 0}` : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/all_earnings/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<img width={27} src="https://cdn2.iconfinder.com/data/icons/thin-money-finance-2/24/thin-1107_money_coins-256.png"  />} title={"Total Earnings"} info={'Your total income from affiliate commissions on sales, including accrued commissions that have not yet been paid out'} data={!isLoading ? `₹${cardData?.wallet_data?.total ?? 0}` : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/dash_payout/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<img width={27} src="https://cdn2.iconfinder.com/data/icons/the-finance/512/payout_2-512.png"  />} title={"Payout"} info={'The specific portion of the total earnings that have been paid out to you'} data={!isLoading ? `₹${Math.round((walletData?.paid_all_time + Number.EPSILON) * 100) / 100 ?? 0}` : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/all_withdrawal/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<img width={27} src="https://cdn2.iconfinder.com/data/icons/the-finance/512/ATM_money-512.png"  />} title={"Pending Payout"} info={'Total amount of commission or earnings accumulated over a specific period but has not yet been paid out'} data={!isLoading ? `₹${cardData?.pending_payouts ?? 0}` : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/all_customers/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<Users size={27} />} title={"Customers"} info={'Individuals or entities who have clicked on your affiliate referral link/s and completed at least one purchase on XIRCLS, resulting in a commission for you'} data={!isLoading ? walletData.customers_count : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/order_value/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<img width={27} src="https://cdn-icons-png.flaticon.com/512/2361/2361607.png"  />} title={"Average Order Value"} info={'The average amount spent by your customers on XIRCLS solutions'} data={!isLoading ? dashData?.average_order_value : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/all_clicks/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<img width={27} src="https://cdn-icons-png.flaticon.com/512/181/181838.png"  />} title={"Clicks"} info={'The number of times visitors clicked on your affiliate referral link/s'} data={!isLoading ? walletData.clicks_count : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/all_leads/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<UserPlus size={27} />} title={"Leads"} info={'Potential customers who’ve signed up but haven’t made a purchase'} data={!isLoading ? walletData.leads_count : <Spinner />} />
          </Col>
          <Col md={6} onClick={() => navigate('/merchant/affiliate/conversion_rate/')} style={{ cursor: "pointer" }}>
            <CardCom icon={<SiConvertio size={27} />} title={"Conversion Rate"} info={'The percentage of clicks on your affiliate referral link/s that converted into purchases on XIRCLS'} data={!isLoading ? dashData.conversion_rate : <Spinner />} />
          </Col>

          <Col md={12}>
            <AllEarnings />
          </Col>
        </Row>

        {/* affiliate links modal */}

        <Modal
          isOpen={isModal}
          toggle={() => setIsModal(!isModal)}
          className='modal-dialog-centered py-1'
        >
          <div className="d-flex justify-content-center p-2">
            <h4 className="m-0">Your Affiliate Link</h4>
            <button onClick={() => setIsModal(!isModal)} type="button" class="btn-close" aria-label="Close" style={{ position: "absolute", right: "-7px", top: "-7px", backgroundColor: "white", color: "black", opacity: "1", padding: "10px", boxShadow: "0 5px 20px 0 rgba(34, 41, 47, 0.1)" }}></button>
          </div>
          <ModalBody >
            <div className=" d-flex gap-1">
              <div style={{ width: "170px" }}>
                <Select
                  value={pageArr?.find($ => $.value === selectPage)}
                  options={pageArr}
                  onChange={e => {
                    setSelectPage(e.value)
                  }}
                />
              </div>
              <InputGroup>
                <Input readOnly value={urls?.page?.[selectPage]} />
                <button onClick={() => {
                  navigator.clipboard
                    .writeText(urls?.page?.[selectPage])
                    .then(() => toast.success("Copied to clipboard!"))
                    .catch(() => toast.error("Copy failed. Please try again."))
                }} style={{ width: "55px", border: "1px solid #d5d5d5", background: "transparent", borderRadius: "0px 5px 5px 0px" }}>
                  <Copy size={15} />
                </button>
              </InputGroup>
            </div>

            <h5 className="text-center mt-2 text-success">Copy your link and share it anywhere</h5>

          </ModalBody>
        </Modal>


        {/* withdraw modal */}

        <Modal
          isOpen={isModal2}
          toggle={() => setIsModal2(!isModal2)}
          className='modal-dialog-centered py-2'
          size="sm"
          onClosed={() => setInputChange({ withdraw_amount: "", withdraw_remark: "" })}
        >
          <div className="d-flex justify-content-center p-2">
            <h4 className="m-0">Request a Payout</h4>
            <button onClick={() => setIsModal2(!isModal2)} type="button" class="btn-close" aria-label="Close" style={{ position: "absolute", right: "-7px", top: "-7px", backgroundColor: "white", color: "black", opacity: "1", padding: "10px", boxShadow: "0 5px 20px 0 rgba(34, 41, 47, 0.1)" }}></button>
          </div>
          <ModalBody >
            <div className="d-flex justify-content-start gap-1 align-items-start" >
              <label>Available Earnings</label>
              <h4>₹{cardData?.wallet_data?.withdrawable}</h4>
            </div>
            {/* <div className="d-flex justify-content-center align-items-center gap-1 mt-2">
              <label>Requited Withdrawn Amount :</label><h4 style={{ display: "contents" }}>₹</h4>
              <Input type="text" className="w-25 h-25" value={inputChange.withdraw_amount} onChange={(e) => { setInputChange({ ...inputChange, withdraw_amount: e.target.value }) }} />
            </div> */}

            <div className="mt-2">
              <label htmlFor="basicDetails-email">
                Withdrawal Amount
              </label>
              <input
                placeholder="Required Withdrawn Amount"
                type='text'
                id='basicDetails-email'
                name='withdraw_amount'
                className="form-control"
                value={`$${inputChange.withdraw_amount}`}
                onChange={(e) => {
                  const valueWithoutDollar = e.target.value.replace(/\$/g, '')
                  setInputChange({ ...inputChange, withdraw_amount: valueWithoutDollar })
                }}
                style={{ marginTop: "5px" }}
              />
            </div>


            {/* {
                inputChange.withdraw_amount > cardData?.wallet_data?.withdrawable ? (
                  <div className="mt-1">
                    <p className="text-danger text-center">Requested amount is more than withdrawable amount</p>
                  </div>
                ) : ""
              } */}
            {
              !withdraw_amount_error.isValid && <p className="text-danger">{withdraw_amount_error.msg}</p>
            }
            {/* <div className="d-flex justify-content-center align-items-center gap-1 mt-2">
              <label>Remark :</label>
              <Input type="text" className="w-25 h-25" value={inputChange.withdraw_remark} onChange={withdraw_amt_chnage} />
            </div> */}

            <div className="mt-2">
              <label htmlFor="basicDetails-email">
                Note
              </label>
              <input placeholder="Note" type='text' id='basicDetails-email' name='email' className="form-control" value={inputChange.withdraw_remark} onChange={withdraw_amt_chnage} style={{ marginTop: "5px" }} />
            </div>

            <div className="d-flex justify-content-center align-items-center mt-2">
              <button className="btn btn-primary-main" onClick={() => withdrawReq()}>Submit</button>
            </div>
          </ModalBody>
        </Modal>

        {/* //-------- */}
        {/* <Modal className='modal-dialog-centered ' isOpen={isModal2}>
          <div className="d-flex justify-content-end me-1" >
            <a onClick={() => setIsModal2(!isModal2)}>
              <X size={'20px'} />
            </a>
          </div>
          <div className="py-2">
            <div class="modal-header d-flex justify-content-center align-items-center">
              <h4 class="modal-title m-0">Withdraw</h4>
            </div>
            <ModalBody >
              <div className="d-flex justify-content-center gap-1" >
                <label>Withdrawable Amount :</label>
                <h4>{cardData?.wallet_data?.withdrawable}</h4>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-1 mt-2">
                <label>Requited Withdrawn Amount :</label><h4 style={{ display: "contents" }}>₹</h4>
                <Input type="text" className="w-25 h-25" value={inputChange.withdraw_amount} onChange={(e) => { setInputChange({ ...inputChange, withdraw_amount: e.target.value }) }} />
              </div>
              {
                !withdraw_amount_error.isValid && <p className="text-danger text-center">{withdraw_amount_error.msg}</p>
              }
              <div className="d-flex justify-content-center align-items-center gap-1 mt-2">
                <label>Remark :</label>
                <Input type="text" className="w-25 h-25" value={inputChange.withdraw_remark} onChange={withdraw_amt_chnage} />
              </div>
              <div className="d-flex justify-content-center align-items-center mt-2">
                <button className="btn btn-primary-main" onClick={() => withdrawReq()}>Submit</button>
              </div>
            </ModalBody>
          </div>
        </Modal> */}
      </div>
    </>
  )
}

export default Affiliate
