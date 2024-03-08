import React, { useEffect, useState } from 'react'
import { affiliateURL, getReq } from '../../../assets/auth/jwtService'
import { Col, Row, Spinner } from 'reactstrap'
import CardCom from '../../Components/SuperLeadz/CardCom'
import { DollarSign } from 'react-feather'

const Conversion_Rate = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [cardData, setCardData] = useState({})

  const getData = () => {
    getReq(`conversion_rate`, "", affiliateURL)
      .then((data) => {
        console.log("conversion_rate", data?.data?.conversion_rate)
        const updated_data = {
          average_order_value: data?.data?.conversion_rate ? data?.data?.conversion_rate : "0"
        }
        setCardData(updated_data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <Row>
        <Col md={6}>
          <CardCom icon={<DollarSign size={27} />} title={"Aveage Order Value"} data={!isLoading ? `₹${cardData?.average_order_value}` : <Spinner />} />
        </Col>
      </Row>
    </>
  )
}

export default Conversion_Rate