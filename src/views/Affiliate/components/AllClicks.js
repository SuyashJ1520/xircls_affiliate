import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import moment from 'moment'
import ComTable from '../../Components/DataTable/ComTable'
import { affiliateURL, getReq } from '../../../assets/auth/jwtService'

const AllClicks = () => {

  const [searchFilter, setSearchFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState([])
  // const filteredArray = tableData?.filter(cur => (cur?.tran_id?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur?.created_at?.toLowerCase()?.includes(searchFilter.toLowerCase())))
  useEffect(() => {
    getReq("affiliate_clicks", "", affiliateURL)
      .then((data) => {
        console.log("affiliate_clicks", data.data)
        setTableData(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const columns = [
    {
      name: 'Created At',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.created_at ? row.created_at : "").format('MMM D, YYYY')
    },
    {
      name: 'IP Address',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.ip_address ? row.ip_address : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Link',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.link ? row.link : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Country',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.country ? row.country : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'State',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.city ? row.city : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'City',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.city ? row.city : <div className='text-center w-100'>-</div>)
    }
  ]


  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Clicks</h4>
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
                filteredData={tableData}
                isLoading={isLoading}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AllClicks