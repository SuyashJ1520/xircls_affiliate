import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import moment from 'moment'
import ComTable from '../../Components/DataTable/ComTable'
import { affiliateURL, postReq } from '../../../assets/auth/jwtService'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'

const AllLeads = () => {

  // const [searchFilter, setSearchFilter] = useState("")
  const [isLoading, setIsLoading] = useState(false)  // make it true
  const [tableData, setTableData] = useState([])
  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    setIsLoading(true)
    const formData = new FormData()
    Object.entries(advanceSearchValue).map(([key, value]) => value && formData.append(key, value))
    formData.append("page", currentPage + 1)
    formData.append("size", currentEntry)
    formData.append("searchValue", searchValue)
    postReq("leads_get_view", formData, affiliateURL)
      .then((data) => {
        console.log("leads_get_view", data?.data?.leads_obj)
        setTableData(data?.data?.leads_obj)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  // }, [])
  // return null
  const columns = [
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.lead_created_at ? row.lead_created_at : "").format('YYYY-MM-DD')
    },
    {
      name: 'Time',
      sortable: true,
      minWidth: '100px',
      selector: row => moment(row.lead_created_at ? row.lead_created_at : "").format('HH:mm:ss')
    },
    {
      name: 'Name',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.lead_first_name ? `${row.lead_first_name}` : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.lead_email ? (<div title={row.lead_email} className='text-center w-100'> {row.lead_email}</div>) : <div className='text-center w-100'>-</div>
      )
    },
    {
      name: 'Phone no.',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.lead_phoneno ? (<div title={row.lead_phoneno} className='text-center w-100'> {row.lead_phonecode}  {row.lead_phoneno}</div>) : <div className='text-center w-100'>-</div>
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
      name: 'Status',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.lead_status ? row.lead_status : <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Email Verification Status',
      // sortable: true,
      minWidth: '100px',
      selector: row => (row.lead_is_email_verified ? <span className='badge bg-success'>Verified</span> : <span className='badge bg-danger'>Not verified</span>)
    }
  ]

  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <AdvanceServerSide
                tableName="Leads"
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

export default AllLeads