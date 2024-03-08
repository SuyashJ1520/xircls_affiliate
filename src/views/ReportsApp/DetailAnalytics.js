import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { ArrowDown } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import { postReq } from '../../assets/auth/jwtService'
import ReactSpedometer from './ReactSpedometer'

export const DetailAnalytics = () => {

    const [filterType, setFilterType] = useState('this_week')
    // const [thisWeek, setThisWeek] = useState()
    const [customDate, setCustomDate] = useState([moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')])
    console.log(filterType, customDate)

    const options = [
        { value: 'previous_week', label: 'Previous Week' },
        { value: 'this_week', label: 'This Week' },
        { value: 'custom', label: 'custom' }
    ]

    const analyticsData = () => {

        const currentDate = moment()
        const form_data = new FormData()
        form_data.append('next_page', "True")
        form_data.append('cursor', "")

        if (filterType === "this_week") {
            form_data.append('start date', currentDate.clone().subtract(1, 'week').format('YYYY-MM-DD'))
            form_data.append('end date', moment(new Date()).format('YYYY-MM-DD'))
        } else if (filterType === "previous_week") {
            form_data.append('start date', currentDate.clone().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'))
            form_data.append('end date', moment(new Date()).format('YYYY-MM-DD'))
        } else {
            form_data.append('start date', customDate[0])
            form_data.append('end date', customDate[1])
        }
 
        postReq('getAnalyticsData', form_data)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log("ee", error)
            })
    }

    useEffect(() => {
        analyticsData()
    }, [filterType])


    return (
        <>
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <div className='d-flex justify-content-between align-items-center '>
                                <h4>Detail Analytics</h4>
                                <div className='d-flex'>
                                    <select className='form-control' onChange={(e) => setFilterType(e.target.value)}>
                                        {options.map((ele) => {
                                            return <option value={ele.value}>{ele.label}</option>
                                        })}
                                    </select>
                                    {filterType === 'custom' ? (
                                        <div className="custom">
                                            <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                                maxDate: "today", // Sets the maximum date as today
                                                mode: "range",
                                                dateFormat: "Y-m-d"
                                            }} className='form-control' value={customDate} onChange={(date) => setCustomDate(date)} />

                                        </div>
                                    ) : ''
                                    }
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md='4' sm='12'>
                    <Card>
                        <CardBody>
                            <ReactSpedometer />
                        </CardBody>
                    </Card>
                </Col>

                <Col md='8' sm='12'>
                    <Card>
                        <CardBody>
                            <Row>
                                <div className='d-flex justify-content-evenly '>
                                    <Col md='5'>
                                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                            <div className='p-1 d-flex justify-content-between'>
                                                <h4>Orders</h4>
                                                <h4 className='d-flex align-items-center gap-1' style={{ color: "red" }}>-0.68 % <ArrowDown /></h4>
                                            </div>
                                            <div className='p-1'>
                                                <h1 className=' display-6 ' style={{ color: "#5be12c" }}>5.95K</h1>
                                            </div>
                                            <div className='p-1'>
                                                <h6>
                                                    compare to <br />
                                                    (7430.0 last week)
                                                </h6>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md='5'>
                                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                            <div className='p-1 d-flex justify-content-between'>
                                                <h4>Customers</h4>
                                                <h4 className='d-flex align-items-center gap-1' style={{ color: "red" }}>-0.68 % <ArrowDown /></h4>
                                            </div>
                                            <div className='p-1'>
                                                <h1 className=' display-6 ' style={{ color: "#5be12c" }}>5.95K</h1>
                                            </div>
                                            <div className='p-1'>
                                                <h6>
                                                    compare to <br />
                                                    (7430.0 last week)
                                                </h6>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </Row>

                            <Row className='mt-2'>
                                <div className='d-flex justify-content-evenly '>
                                    <Col md='5'>
                                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                            <div className='p-1 d-flex justify-content-between'>
                                                <h4>Sales</h4>
                                                <h4 className='d-flex align-items-center gap-1' style={{ color: "red" }}>-0.68 % <ArrowDown /></h4>
                                            </div>
                                            <div className='p-1'>
                                                <h1 className=' display-6 ' style={{ color: "#5be12c" }}>5.95K</h1>
                                            </div>
                                            <div className='p-1'>
                                                <h6>
                                                    compare to <br />
                                                    (7430.0 last week)
                                                </h6>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md='5'>
                                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                            <div className='p-1 d-flex justify-content-between'>
                                                <h4>Return Rate</h4>
                                                <h4 className='d-flex align-items-center gap-1' style={{ color: "red" }}>-0.68 % <ArrowDown /></h4>
                                            </div>
                                            <div className='p-1'>
                                                <h1 className=' display-6 ' style={{ color: "#5be12c" }}>5.95K</h1>
                                            </div>
                                            <div className='p-1'>
                                                <h6>
                                                    compare to <br />
                                                    (7430.0 last week)
                                                </h6>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default DetailAnalytics