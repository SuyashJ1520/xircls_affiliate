/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import moment from 'moment'
import { affiliateURL, getReq } from '../../../assets/auth/jwtService'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
import ComTable from '../../Components/DataTable/ComTable'
import { defaultFormatDate, defaultFormatDecimal, defaultFormatTime } from '../../Validator'

const AllRevenue = ({title}) => {
  const [searchFilter, setSearchFilter] = useState("")

  const [isLoading, setIsLoading] = useState(true)  // make it true
  const [tableData, setTableData] = useState([])
  const filteredArray = tableData?.filter(cur => (cur.firstname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.lastname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.created_at?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.remark?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.action?.toLowerCase()?.includes(searchFilter.toLowerCase())))

  console.log(affiliateURL, "affiliateURL")
  const getData = () => {
    getReq("affiliate_revenue", "", affiliateURL)
      .then((data) => {
        console.log("affiliate_revenue", data?.data)
        setTableData(data?.data?.total_revenue)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  // useEffect(() => {}, [

  // ])

  const columns = [
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      selector: row => `${defaultFormatDate(row.created_at)}, ${defaultFormatTime(row.created_at)}`
      // selector: row => moment(row.created_at ? row.created_at : "").format('YYYY-MM-DD')
    },
    {
      name: 'Company',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.company && row.company ? (<div title={`${row.company} ${row.company}`} className='text-center w-100'>{`${row.company} ${row.company}`}</div>) : <div className='text-center w-100'>-</div>
      )
    },
    {
      name: 'Order ID',
      sortable: true,
      minWidth: '100px',
      selector: () =>  <div className='text-center w-100'>Dummy</div>
    },
    {
      name: 'App',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.product_name ? row.product_name : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Sales Price',
      sortable: true,
      minWidth: '100px',
      selector: row => `$${defaultFormatDecimal(row?.sale_amount)}`
      // selector: row => (row?.sale_amount ? row?.sale_amount : <div className='text-center w-100'>0</div>)

    },
    {
      name: 'Commission',
      sortable: true,
      minWidth: '80px',
      selector: row => (row.amount ? `$${defaultFormatDecimal(row?.amount)}` : <div className='text-center w-100'>0</div>)
    }
  ]
  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>{title ?? 'Total Sales'}</h4>
    </Col>
    <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
      <input value={searchFilter} onChange={e => setSearchFilter(e.target.value)} type="text" placeholder="Search..." className='form-control ms-1' style={{ width: "200px" }} />
    </Col>
  </>
  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <ComTable
                content={defferContent}
                tableCol={columns}
                data={tableData}
                searchValue={searchFilter}
                filteredData={filteredArray}
                isLoading={isLoading}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}


export default AllRevenue