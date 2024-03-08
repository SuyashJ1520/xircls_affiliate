import moment from 'moment'
import React, {  useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
import { postReq, affiliateURL } from '../../../assets/auth/jwtService'
// import { affiliateURL, getReq } from '../../../assets/auth/jwtService'

const Statement = () => {
  const [isLoading, setIsLoading] = useState(false)  // make it true
  const [tableData, setTableData] = useState([])

  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    const formData = new FormData()
    Object.entries(advanceSearchValue).map(([key, value]) => value && formData.append(key, value))
    formData.append("page", currentPage + 1)
    formData.append("size", currentEntry)
    formData.append("searchValue", searchValue)
    
        postReq("wallet_transactions_get_view", formData, affiliateURL)
      .then((res) => {
        console.log("wallet_transactions_get_view", res)
        setTableData(res.data.wallet_trans)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const columns = [
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.Created_at ? row.Created_at : "").format('YYYY-MM-DD')
    },
    {
      name: 'Time',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.Created_at ? row.Created_at : "").format('HH:mm:ss')
    },
    {
      name: 'Transaction ID',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.Tran_id ?? <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Note',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.Remark ?? <div className='text-center w-100'>-</div>)
    },
    {
      name: 'App',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.Product_name ?? <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Amount',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.Amount ?? <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Type',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.Transaction_type ?? <div className='text-center w-100'>-</div>)
    }
  ]

  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>

              <AdvanceServerSide
                tableName="Statements"
                tableCol={columns}
                data={tableData}
                isLoading={isLoading}
                getData={getData}
                count={4}
             
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Statement