/* eslint-disable no-unused-vars */
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { affiliateURL, postReq } from '../../../assets/auth/jwtService'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'

const AllCustomers = () => {

  const [isLoading, setIsLoading] = useState(false)  // make it true
  const [tableData, setTableData] = useState([])
  const filteredArray = tableData?.filter(cur => (cur?.tran_id?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur?.created_at?.toLowerCase()?.includes(searchFilter.toLowerCase())))
  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    setIsLoading(true)
    const formData = new FormData()
    Object.entries(advanceSearchValue).map(([key, value]) => value && formData.append(key, value))
    formData.append("page", currentPage + 1)
    formData.append("size", currentEntry)
    formData.append("searchValue", searchValue)
    postReq("customer_get_view", formData, affiliateURL)
      .then((data) => {
        console.log("customer_get_view", data?.data?.customers_obj)
        setTableData(data?.data?.customers_obj)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])


  const columns = [
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.customer_created_at ? row.customer_created_at : "").format('YYYY-MM-DD')
    },
    {
      name: 'Time',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.customer_created_at ? row.customer_created_at : "").format('HH:mm:ss')
    },
    {
      name: 'Company Name',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.customer_first_name ? `${row.customer_first_name}` : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Name',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.customer_first_name ? `${row.customer_first_name}` : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.customer_email ? (<div title={row.customer_email} className='text-center w-100'> {row.customer_email}</div>) : <div className='text-center w-100'>-</div>
      )
    },
    {
      name: 'Mobile No.',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.customer_phoneno ? (<div title={row.customer_phoneno} className='text-center w-100'>{row.customer_phonecode} {row.customer_phoneno}</div>) : <div className='text-center w-100'>-</div>
      )
    },
    {
      name: 'Customer Since',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.customer_app ? row.customer_app : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Product',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.customer_app ? row.customer_app : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Last Purchase Date',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.customer_app ? row.customer_app : <div className='text-center w-100'>-</div>)
    }
  ]


  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <AdvanceServerSide
                tableName="Customers"
                tableCol={columns}
                data={tableData}
                count={tableData.length}
                getData={getData}
                isLoading={isLoading}
                advanceFilter={isLoading}

              />

            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default AllCustomers