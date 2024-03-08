import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { affiliateURL, getReq } from '../../../assets/auth/jwtService'
import ComTable from '../../Components/DataTable/ComTable'

const AllWithdrawal = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)  // make it true
  const [tableData, setTableData] = useState([])
  // const filteredArray = tableData?.filter(cur => (cur?.tran_id?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur?.created_at?.toLowerCase()?.includes(searchFilter.toLowerCase())))
  const filteredArray = tableData?.filter(cur => (cur.firstname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.lastname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.created_at?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.remark?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.action?.toLowerCase()?.includes(searchFilter.toLowerCase())))

  const getData = () => {

    getReq("affiliate_withdrawn_transactions", "", affiliateURL)
      .then((data) => {
        console.log("affiliate_withdrawn_transactions", data?.data?.withdrawable)
        setTableData(data?.data?.withdrawable)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(setTableData, setIsLoading)

  const columns = [
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.created_at ? row.created_at : "-").format('YYYY-MM-DD')
    },
    {
      name: 'Time',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.created_at ? row.created_at : "-").format('HH:mm:ss')
    },
    {
      name: 'Completed on',
      sortable: true,
      minWidth: '100px',
      selector: row => {
        const completedOn = row.completed_on || null
        return completedOn ? moment(completedOn).format('YYYY-MM-DD') : '-'
      }
    },
    {
      name: 'Remarks',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.remark ? row.remark : <div className='text-center w-100'>-</div>)
    },
    {
      name: <>Requested<br />Amount</>,
      sortable: true,
      minWidth: '100px',
      selector: row => (row.requested_amount ? row.requested_amount : <div className='text-center w-100'>-</div>)
    }
  ]
  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Pending Payout</h4>
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

export default AllWithdrawal