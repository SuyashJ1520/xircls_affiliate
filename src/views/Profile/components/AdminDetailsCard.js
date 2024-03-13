import { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { affiliateURL, getReq, postReq } from '../../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import Spinner from '../../Components/DataTable/Spinner'

function AdminDetailsCard() {
    const [cancelModalOpen, setCancelModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        accDetails: {},
        firstName: "",
        lastName: ""
    })

    console.log(data.accDetails, 'accDetails')

    const getData = () => {
        setIsLoading(true)
        getReq('get_user_account_details', "", affiliateURL)
            .then((res) => {
                const updatedData = {
                    accDetails: res?.data?.affiliate_person,
                    firstName: res?.data?.affiliate_person?.firstname,
                    lastName: res?.data?.affiliate_person?.lastname
                }
                setData((pre) => ({
                    ...pre,
                    ...updatedData
                }))
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const saveUserDetail = () => {
        const form_data = new FormData()
        form_data.append('firstname', data?.firstName)
        form_data.append('lastname', data?.lastName)
        postReq('edit_user_account_details', form_data, affiliateURL)
            .then((resp) => {
                console.log(resp.data)
                setCancelModalOpen(false)
                toast.success("Details Updated Successfully")
                getData()
            })
            .catch((error) => {
                toast.error("Something went wrong")
                setCancelModalOpen(false)
                console.log(error)
            })

    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <Card>
                {
                    isLoading ? <>
                        <CardBody>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Spinner size={'30px'} />
                            </div>
                        </CardBody>
                    </> : <>
                        <CardBody>
                            <div className="d-flex flex-column justify-content-center align-items-center gap-1">

                                {/* 1 */}

                                <div className="pt-4 d-flex flex-column justify-content-center align-items-center">
                                    <img src={defaultAvatar} alt="img" style={{ width: '100px', height: '100px', marginBottom: '1rem', borderRadius: '6px' }} />
                                    <h6 style={{ fontSize: '1.375rem', overflow: 'hidden', fontWeight: '500', marginBottom: '1rem' }}>{data?.firstName?.charAt(0)?.toUpperCase()}{data?.lastName?.charAt(0)?.toUpperCase()} </h6>
                                    <p className="badge badge-light-secondary">
                                        Admin
                                    </p>
                                </div>

                            </div>
                        </CardBody>
                        <CardBody>
                            <div>
                                <h5 style={{ color: 'rgba(47,43,61,0.42)', marginBottom: '1.2rem' }}>DETAILS</h5>

                                <div className='acc-details'>
                                    {/* <p className='mb-1' style={{ fontWeight: '400' }}>
                                        <span style={{ fontWeight: '600', fontSize: '.9375rem' }}>Username: </span>
                                        {data?.accDetails?.first_name} {data?.accDetails?.last_name}
                                    </p> */}
                                    <p className='mb-1' style={{ fontWeight: '400' }}>
                                        <span style={{ fontWeight: '600', fontSize: '.9375rem' }}>Email: </span>
                                        {data?.accDetails?.personal_email}
                                    </p>
                                    {/* <p className='mb-1' style={{fontWeight: '400'}}>
                                        <span style={{fontWeight: '600', fontSize: '.9375rem'}}>Role: </span> 
                                        {data?.accDetails?.user_email} 
                                    </p> */}
                                    <p className='mb-1' style={{ fontWeight: '400' }}>
                                        <span style={{ fontWeight: '600', fontSize: '.9375rem' }}>Mobile Number: </span>
                                        {data?.accDetails?.phoneno}
                                    </p>
                                    <p className='mb-1' style={{ fontWeight: '400' }}>
                                        <span className='me-1' style={{ fontWeight: '600', fontSize: '.9375rem' }}>Country:</span>
                                        {data?.accDetails?.country}
                                    </p>
                                </div>

                                <div className="d-flex flex-row justify-content-center align-items-center mt-2">
                                    <button type="button" onClick={() => setCancelModalOpen(!cancelModalOpen)} className="btn btn-primary mx-1">Edit</button>
                                </div>

                                <Modal
                                    isOpen={cancelModalOpen}
                                    toggle={() => setCancelModalOpen(!cancelModalOpen)}
                                    className='modal-dialog-centered'
                                >
                                    <ModalHeader toggle={() => setCancelModalOpen(!cancelModalOpen)}>Edit</ModalHeader>
                                    <ModalBody>
                                        <div className="row">
                                            <div className="col-12 mb-1">
                                                <label htmlFor="first_name">First Name</label>
                                                <input type="text" id='first_name' className='form-control' value={data?.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} />
                                            </div>
                                            <div className="col-12 mb-1">
                                                <label htmlFor="last_name">Last Name</label>
                                                <input type="text" id='last_name' className='form-control' value={data?.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} />
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button outline onClick={() => setCancelModalOpen(!cancelModalOpen)}>
                                            Cancel
                                        </Button>
                                        <Button color='primary' onClick={() => saveUserDetail()}>
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </Modal>

                            </div>
                        </CardBody>
                    </>
                }
            </Card>
        </>


    )
}

export default AdminDetailsCard