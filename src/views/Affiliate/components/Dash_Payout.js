import React, { useState } from 'react'
import { Card, CardBody, Col, Row, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledButtonDropdown } from 'reactstrap'
// import ComTable from '../Components/DataTable/ComTable'
// import { useLocation } from 'react-router-dom'
// import { affiliateURL, getReq, postReq } from '../../assets/auth/jwtService'
// import { MoreVertical } from 'react-feather'
// import toast from 'react-hot-toast'
import { affiliateURL, postReq } from '../../../assets/auth/jwtService'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
import { defaultFormatDate, defaultFormatDecimal, defaultFormatTime } from '../../Validator'
// import ComTable from '../../Components/DataTable/ComTable'

const Dash_Payout = () => {

  // const [searchFilter, setSearchFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)  // make it true
  const [tableData, setTableData] = useState([])
  const [selected, setSelected] = useState([])

  // const getData = () => {
  //   getReq(`dash_payout`, "", affiliateURL)
  //     .then((data) => {
  //       console.log("dash_payout", data?.data?.payout)
  //       setTableData(data?.data?.payout)
  //       setIsLoading(false)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
  // useEffect(() => {
  //   getData()
  // }, [])

  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    setIsLoading(true)
    const form_data = new FormData()
    Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
    form_data.append("page", currentPage + 1)
    form_data.append("size", currentEntry)
    form_data.append("searchValue", searchValue)

    postReq("dash_payout", form_data, affiliateURL)
      .then((data) => {
        console.log(data.data, "payout_details_obj")
        setTableData(data?.data?.payout_details_obj)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

  }

  // const filteredArray = tableData?.filter(cur => (cur?.tran_id.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur?.lastname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur?.created_at.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur?.remark.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur?.action.toLowerCase()?.includes(searchFilter.toLowerCase())))


  const columns = [
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      selector: row => `${defaultFormatDate(row.payout_created_at)}, ${defaultFormatTime(row.payout_created_at)}`
      // selector: row => moment(row.created_at ? row.created_at : "").format('YYYY-MM-DD')
    },
    {
      name: 'Completed on',
      sortable: true,
      minWidth: '100px',
      selector: row => `${defaultFormatDate(row.payout_completed_on)}, ${defaultFormatTime(row.payout_completed_on)}`
    },
    {
      name: 'Transaction ID',
      sortable: true,
      minWidth: '100px',
      selector: row => (row.payout_tran_id ?? <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Note',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.payout_remark ?? <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Admin Note',
      sortable: true,
      minWidth: '200px',
      selector: row => (row.payout_admin_remark ?? <div className='text-center w-100'>-</div>)
    },
    {
      name: 'Payout Amount',
      sortable: true,
      minWidth: '100px',
      selector: row => `$${defaultFormatDecimal(row.payout_amount)}`
      // selector: row => (row.payout_amount ? row.payout_amount : <div className='text-center w-100'>0</div>)
    }

  ]


  return (
    <>
      <style>
        {`
          .dropdown-menu-custom.dropdown-menu[data-popper-placement]:not([data-popper-placement^="top-"]) {
            top: -100px !important;
            left: -100px !important;
          }import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide';

        `}
      </style>
      {/* <Card>
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
      </Card> */}

      <Card>
        <CardBody>
          <AdvanceServerSide
            tableName="Payouts"
            tableCol={columns}
            data={tableData}
            isLoading={isLoading}
            getData={getData}
            count={tableData?.recordsTotal}
            // selectableRows={true}
            setSelectedRows={setSelected}
            selectedRows={selected}
            advanceFilter={true}
          />
        </CardBody>
      </Card>
    </>
  )
}

export default Dash_Payout