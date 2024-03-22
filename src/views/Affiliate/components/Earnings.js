/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import AllEarnings from './AllEarnings'
import { Col, Row } from 'reactstrap'
import CardCom from '../../Components/SuperLeadz/CardCom'
import { DollarSign } from 'react-feather'
import { affiliateURL, getReq } from '../../../assets/auth/jwtService'
import Spinner from '../../Components/DataTable/Spinner'
import { json } from 'd3'

const Earnings = () => {
    const [cardData, setCardData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
        getReq("affiliate_wallet", "", affiliateURL)
            .then((res) => {
                // console.log({ data }, "wassup wallet")
                setCardData(res.data)

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

    return (
        <>
            <Row>
                <Col md={6} onClick={() => navigate('')} style={{ cursor: "pointer" }}>
                    <CardCom icon={<DollarSign size={27} />} title={"Commission Amount"} data={!isLoading ? `$${cardData.wallet_data?.total}` : <Spinner />} />
                </Col>

                <Col md={6} onClick={() => navigate('')} style={{ cursor: "pointer" }}>
                    <CardCom icon={<DollarSign size={27} />} title={"Total Commissions"} data={!isLoading ? `$${cardData.total_commission ?? "0" }` : <Spinner />}/>
                </Col>

                <Col md={6} onClick={() => navigate('')} style={{ cursor: "pointer" }}>
                    <CardCom icon={<DollarSign size={27} />} title={"Paid Commission"} data={!isLoading ? `$${cardData.wallet_data?.withdrawable - cardData.wallet_data?.total}` : <Spinner />} />
                </Col>

                <Col md={6} onClick={() => navigate('')} style={{ cursor: "pointer" }}>
                    <CardCom icon={<DollarSign size={27} />} title={"Unpaid Commission"} data={!isLoading ? `$${cardData.wallet_data?.withdrawable}` : <Spinner />} />
                </Col>
            </Row>
            <AllEarnings />
        </>
    )
}

export default Earnings