import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Col, Input } from 'reactstrap'
import { affiliateURL, getReq, postReq } from '../../../assets/auth/jwtService'
import ComTable from '../../Components/DataTable/ComTable'
import FrontBaseLoader from '../../Components/Loader/Loader'


const Security = () => {
  const [data, setdata] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [apiLoader, setApiLoader] = useState(false)
  const [UserData, setUserData] = useState(null)
  const [NewPassword, setNewPassword] = useState({
    new_password: '',
    confirm_password: '',
    isMatch:true
  })

  const getData = () => {
    getReq('get_user_account_details', "", affiliateURL)
      .then((res) => {
        console.log(res.data.affiliate_person)
        setUserData(res.data.affiliate_person)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.email_id.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.email_id.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  const changePassword = () => {
    console.log(NewPassword)
    if (NewPassword.new_password === '') {
      return toast.error("Password cannot be empty!")
    }
    if (NewPassword.new_password !== NewPassword.confirm_password) {
      return toast.error("Password don`t match!")
    }
    setApiLoader(true)
    const form_data = new FormData()
    form_data.append('new_password', NewPassword.new_password)
    form_data.append('confirm_password', NewPassword.confirm_password)
    postReq('password_update', form_data, affiliateURL)
      .then(() => {
        toast.success('Password changed successfully')
        setApiLoader(false)
        setNewPassword({
          new_password: '',
          confirm_password: '',
          isMatch:true
        })
      })
      .catch((error) => {
        setApiLoader(false)
        toast.error('Something went wrong')
        console.log(error)
      })
  }


const columns = [
  {
    name: 'Sr. No.',
    cell: (row, index) => index + 1,
    width: '100px'
  },
  {
    name: 'Browser',
    selector: row => row.browser_name
  },
  {
    name: 'Device',
    selector: row => row.os_name
  },
  {
    name: 'Action',
    selector: row => row.action
  },
  {
    name: 'Recent Activity',
    selector: row => row.login_time
  }
]

const getLoggedData = () => {
  getReq('logDetails', "", affiliateURL)
    .then((data) => {
      console.log(data)
      setdata(data?.data?.log_entries)
    })
    .catch((err) => {
      console.log(err)
    })
}

const updateCheck = () => {
  const form_data = new FormData()

  Object.entries(UserData).forEach(([key, value]) => {
    if (key === 'is_two_verification') {
      form_data.append(key, !UserData.is_two_verification)
    } else {
      form_data.append(key, value)
    }
  })
  postReq('edit_user_account_details', form_data, affiliateURL)
    .then((resp) => {
      console.log(resp.data.affiliate_person)
      if (resp.data.affiliate_person.is_two_verification) {
        toast.success("Two Step Verification is ON ")
      } else {
        toast.success("Two Step Verification is OFF ")
      }
      getData()
    })
    .catch((error) => {
      toast.error("Something went wrong")
      console.log(error)
    })
}

const matchPass = () => {
  if (NewPassword.new_password !== NewPassword.confirm_password) {
    setNewPassword({
      ...NewPassword,
      isMatch:false
    })
  } else {
    setNewPassword({
      ...NewPassword,
      isMatch:true
    })
  }
}

useEffect(() => {
  getLoggedData()
  getData()
}, [])

useEffect(() => {
  matchPass()
}, [NewPassword.new_password, NewPassword.confirm_password])


const defferContent = <>
  <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
    <h4 className='m-0'>Details</h4>
  </Col>
  <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
    <Input
      className='dataTable-filter form-control ms-1'
      style={{ width: `180px`, height: `2.714rem` }}
      type='text'
      bsSize='sm'
      id='search-input-1'
      placeholder='Search...'
      value={searchValue}
      onChange={handleFilter}
    />
  </Col>
</>
if (!UserData) {
  return <FrontBaseLoader />
}

return (
  <>
    {
      apiLoader && <FrontBaseLoader />
    }
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-body'>
            <div className="d-flex justify-content-start align-items-center py-1">
              <div style={{ fontSize: '1.125rem', fontWeight: '400' }}>Change Password</div>
            </div>
            {/* <div className="alert alert-warning h5 p-2 gap-1" role="alert">
                Ensure that these requirements are met<br />
                Minimum 8 characters long uppercase& symbol
              </div> */}
            <div className="row">
              <div className="col-12 mb-1">
                <label htmlFor="new_password">New Password</label>
                <input type="text" id='new_password' className='form-control' value={NewPassword.new_password} onChange={(e) => setNewPassword({ ...NewPassword, new_password: e.target.value })} />
              </div>
              <div className="col-12 mb-1">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="text" id='confirm_password' className='form-control' value={NewPassword.confirm_password} onChange={(e) => setNewPassword({ ...NewPassword, confirm_password: e.target.value })} />
              </div>
              {
                !NewPassword.isMatch && <p className='text-danger'>Password don`t match!</p>
              }
              
            </div>
            <button type="submit" className='col-3 btn btn-primary' onClick={changePassword}>
              Change Password
            </button>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div>
              <div className="v-card-item">
                <div className="v-card-item__content">
                  <div className='d-flex justify-content-between '>
                    <div className="v-card-title h5">Two-step verification </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={UserData?.is_two_verification} onChange={updateCheck} />
                    </div>

                  </div>
                  <div className="v-card-subtitle">
                    <small className="text-base ">
                      Keep your account secure with authentication step.
                    </small>
                  </div>
                </div>
              </div>
              <div className='mt-1'>
                <small className="text-base ">
                  Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.
                  <div className='text-primary'>Learn more.</div>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='my-2'>
            <ComTable
              tableCol={columns}
              data={data}
              searchValue={searchValue}
              handleFilter={handleFilter}
              filteredData={filteredData}
              content={defferContent}
            />
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default Security