/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import moment from 'moment'
import { affiliateURL, getReq } from '../../../assets/auth/jwtService'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
import ComTable from '../../Components/DataTable/ComTable'

const AllRevenue = () => {
  const [searchFilter, setSearchFilter] = useState("")

  const [isLoading, setIsLoading] = useState(true)  // make it true
  const [tableData, setTableData] = useState([])
  const filteredArray = tableData?.filter(cur => (cur.firstname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.lastname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.created_at?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.remark?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.action?.toLowerCase()?.includes(searchFilter.toLowerCase())))

  console.log(affiliateURL, "affiliateURL")
  const getData = () => {
    //  fetch('https://ed23-2402-e280-3d9c-20d-e2cf-c442-41b8-5d68.ngrok-free.app/recent_sales_get', {
      //   method: 'GET'
      // })
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
      selector: row => moment(row.created_at ? row.created_at : "").format('YYYY-MM-DD')
    },
    {
      name: 'Time',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.created_at ? row.created_at : "").format('HH:mm:ss')
    },
    {
      name: 'Merchant Name',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.user?.firstname && row?.user?.lastname ? `${row?.user?.firstname} ${row?.user?.lastname}` : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '200px',
      selector: row => (row?.user?.personal_email ? (<div title={row?.user?.personal_email} className='text-center w-100'> {row?.user?.personal_email}</div>) : <div className='text-center w-100'>-</div>
      )
    },
    {
      name: 'Mobile no',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.user?.phonecode && row?.user?.phoneno ? (<div title={`${row?.user?.phonecode} ${row?.user?.phoneno}`} className='text-center w-100'>{`${row?.user?.phonecode} ${row?.user?.phoneno}`}</div>) : <div className='text-center w-100'>-</div>
      )
    },
    {
      name: 'Company',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.company && row.company ? (<div title={`${row.company} ${row.company}`} className='text-center w-100'>{`${row.company} ${row.company}`}</div>) : <div className='text-center w-100'>-</div>
      )
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
      selector: row => (row.product_name ? row.product_name : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Commission Earned',
      sortable: true,
      minWidth: '80px',
      selector: row => (row.amount ? row.amount : <div className='text-center w-100'>0</div>)
    }
  ]
  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Total Sales</h4>
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