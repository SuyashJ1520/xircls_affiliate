import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { affiliateURL, getReq } from '../../../assets/auth/jwtService'
import ComTable from '../../Components/DataTable/ComTable'
import { defaultFormatDate, defaultFormatDecimal, defaultFormatTime } from '../../Validator'

const AllEarnings = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [isLoading, setIsLoading] = useState(false)  // make it true
  const [tableData, setTableData] = useState([])
  const filteredArray = tableData?.filter(cur => (cur.user?.personal_email?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.user?.firstname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.created_at?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.remark?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.action?.toLowerCase()?.includes(searchFilter.toLowerCase())))

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

  const columns = [
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      selector: row => `${defaultFormatDate(row.created_at)}, ${defaultFormatTime(row.created_at)}`
      // selector: row => moment(row.created_at ? row.created_at : "").format('YYYY-MM-DD')
    },
    {
      name: ' Name',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.customer?.first_name && row?.customer?.last_name ? `${row?.customer?.first_name} ${row?.customer?.last_name}` : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '200px',
      selector: row => (row?.customer?.personal_email ?? <div className='text-center w-100'>-</div>
      )
    },
    {
      name: 'Mobile no',
      sortable: true,
      minWidth: '100px',
      selector: row => (row?.customer?.phonecode && row?.customer?.phoneno ? (<div title={`${row?.customer?.phonecode} ${row?.customer?.phoneno}`} className='text-center w-100'>{`${row?.customer?.phonecode} ${row?.customer?.phoneno}`}</div>) : <div className='text-center w-100'>-</div>
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
      selector: row => (row.product.product_name ?? <div className='text-center w-100'>-</div>)
    },
    // {
    //   name: 'Sales Price',
    //   sortable: true,
    //   minWidth: '100px',
    //   selector: row => (row.product_name ? row.product_name : <div className='text-center w-100'>-</div>)
    // },
    {
      name: 'Commission Earned',
      sortable: true,
      minWidth: '80px',
      selector: row => `$${defaultFormatDecimal(row.amount)}`
      // selector: row => (row.amount ? row.amount : <div className='text-center w-100'>0</div>)
    }
  ]
  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Total Earnings</h4>
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

export default AllEarnings