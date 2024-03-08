import React, { useState, useEffect } from "react"
import { Container, Row, Col, ModalBody, ModalHeader, Modal } from "reactstrap"
// import { useNavigate } from "react-router-dom"
import { PermissionProvider } from "../../Helper/Context"
import { getReq, postReq } from "../../assets/auth/jwtService"
import shopifyLogo from '@src/assets/images/logo/shopify-logo.png'
import wooCommerceLogo from '@src/assets/images/logo/WooCommerce_logo.png'
import magentoLogo from '@src/assets/images/logo/magento-logo.png'
import oyeconLogo from '@src/assets/images/logo/oyecon.png'
import FrontBaseLoader from "../Components/Loader/Loader"
import AppCom from "./components/AppComp"
import Spinner from "../Components/DataTable/Spinner"
import toast from "react-hot-toast"
// import { dashboardURL } from "../Validator"

const cardData = [
  // {
  //   title: "Home",
  //   url: "https://www.xircls.com/?aft_no=4086fe38-5541-45e4-a156-939cfa7de1f1",
  //   description: "Get to know your customer better & recommend <br /> products that are fit for them! "
  // },
  {
    title: "Infiniti",
    url: "https://www.xircls.com/products/infiniti/?aft_no=5c27b776-a84d-46b0-b32d-97a64b524025",
    description: <>Get to know your customer better & recommend <br /> products that are fit for them!</>
  },
  {
    title: "SemperFi",
    url: "https://www.xircls.com/products/semperfi/?aft_no=5c27b776-a84d-46b0-b32d-97a64b524025",
    description: <>xyz</>
  },
  {
    title: "Sniper",
    url: "https://www.xircls.com/products/sniper/?aft_no=4086fe38-5541-45e4-a156-939cfa7de1f1",
    description: <>xyz</>
  },
  {
    title: "SuperLeadz",
    url: "https://www.xircls.com/products/superleadz/?aft_no=4086fe38-5541-45e4-a156-939cfa7de1f1",
    description: <>Convert website leads into sales in the <br /> shortest time possible!</>
  },
  {
    title: "Flash Accounts",
    url: "https://www.xircls.com/products/flash_accounts?aft_no=4086fe38-5541-45e4-a156-939cfa7de1f1",
    description: <>Super-fast sign-ups that don’t disrupt the buying process.</>
  }
]

const Apps = () => {

  // const navigate = useNavigate()
  // const [userApps, setUserApps] = useState([])
  // const { setUserPermission, userPermission } = useContext(PermissionProvider)
  const [editModal, setEditModal] = useState(false)
  const [apiLoader, setApiLoader] = useState(false)
  const [data, setData] = useState({
    selectApp: "",
    isLoading: true
  })
  const pending = ["woocommerce", "magento"]

  const getAppsData = () => {
    getReq('getAllApps')
      .then((res) => {
        console.log(res)
        // setUserApps(res?.data)
        const updatedData = {
          isLoading: false
        }
        setData((preData) => ({
          ...preData,
          ...updatedData
        }))
      })
      .catch((error) => {
        console.log(error)
        const updatedData = {
          isLoading: false
        }
        setData((preData) => ({
          ...preData,
          ...updatedData
        }))
      })
  }

  const installApp = (name) => {

    if (pending.includes(name)) {
      // toast.success("Coming Soon!")
    } else {
      setEditModal(false)
      setApiLoader(true)
      const form_data = new FormData()
      form_data.append('plugin_name', name)
      form_data.append('app', data?.selectApp)
      postReq('installPlugin', form_data)
        .then((resp) => {
          console.log(resp)
          // setApiLoader(false)
          window.location.href = resp?.data?.data
        })
        .catch((error) => {
          console.log(error)
          setApiLoader(false)

        })

    }
  }

  useEffect(() => {
    getAppsData()
  }, [])


  return (
    <Container>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }
      {
        <>

          <h4 className="my-2">
            Must-have apps for every step of the buyer journey
          </h4>

          <Row className="match-height">
            {cardData?.map((data, key) => {
              return (
                <>
                  <Col key={key} md="4">
                    <AppCom
                      hideLock={true}
                      title={data.title}
                      data={<>{data.description}</>}
                      button={<><button title={data.url} className="btn btn-primary" onClick={() => {
                        navigator.clipboard
                          .writeText(data.url)
                          .then(() => toast.success("Copied to clipboard!"))
                          .catch(() => toast.error("Copy failed. Please try again."))
                      }} >Copy Link</button></>} />
                  </Col>
                </>
              )
            })}
            {/* {
              !data?.isLoading ? userApps?.map((curElem) => {
                return curElem.name.toLowerCase() === "infiniti" ? <>
                  <Col md="4">
                    <AppCom
                      title={curElem.name}
                      data={<>Get to know your customer better & recommend <br /> products that are fit for them! </>}
                      button={userPermission?.installedApps.includes(curElem.name.toLowerCase()) ? (
                        <a onClick={() => {
                          setUserPermission({ ...userPermission, appName: curElem.name.toLowerCase() })
                          navigate(dashboardURL[curElem.name.toLowerCase()])
                        }}
                          className="btn btn-primary"
                        >
                          Dashboard
                        </a>
                      ) : (
                        <a onClick={() => {
                          setData({ ...data, selectApp: curElem.name.toLowerCase() })
                          setEditModal(!editModal)
                        }} className="btn btn-primary">
                          Install App
                        </a>
                      )
                      } />
                  </Col>
                </> : curElem.name.toLowerCase() === "superleadz" ? <>
                  <Col md="4">
                    <AppCom
                      title={curElem.name}
                      data={<>Convert website leads into sales in the <br /> shortest time possible!</>}
                      button={userPermission?.installedApps.includes(curElem.name.toLowerCase()) ? (
                        <a onClick={() => {
                          setUserPermission({ ...userPermission, appName: curElem.name.toLowerCase() })
                          navigate(dashboardURL[curElem.name.toLowerCase()])
                        }}
                          className="btn btn-primary"
                        >
                          Dashboard
                        </a>
                      ) : (
                        <a onClick={() => {
                          setData({ ...data, selectApp: curElem.name.toLowerCase() })
                          setEditModal(!editModal)
                        }} className="btn btn-primary">
                          Install App
                        </a>
                      )
                      } />
                  </Col>
                </> : curElem.name.toLowerCase() === "referral" ? <>
                  <Col md="4">
                    <AppCom
                      title={curElem.name}
                      data={<>Convert website leads into sales in the <br /> shortest time possible!</>}
                      button={userPermission?.installedApps.includes(curElem.name.toLowerCase()) ? (
                        <a onClick={() => {
                          setUserPermission({ ...userPermission, appName: curElem.name.toLowerCase() })
                          navigate(dashboardURL[curElem.name.toLowerCase()])
                        }}
                          className="btn btn-primary"
                        >
                          Dashboard
                        </a>
                      ) : (
                        <a onClick={() => {
                          setData({ ...data, selectApp: curElem.name.toLowerCase() })
                          setEditModal(!editModal)
                        }} className="btn btn-primary">
                          Install App
                        </a>
                      )
                      } />
                  </Col>
                </> : curElem.name.toLowerCase() === "flash_accounts" ? <>
                  <Col md="4">
                    <AppCom
                      title={'Flash Account'}
                      data={<>Super-fast sign-ups that don’t disrupt the buying process.</>}
                      button={userPermission?.installedApps.includes(curElem.name.toLowerCase()) ? (
                        <a onClick={() => {
                          setUserPermission({ ...userPermission, appName: curElem.name.toLowerCase() })
                          navigate(dashboardURL[curElem.name.toLowerCase()])
                        }}
                          className="btn btn-primary"
                        >
                          Dashboard
                        </a>
                      ) : (
                        <a onClick={() => {
                          setData({ ...data, selectApp: curElem.name.toLowerCase() })
                          setEditModal(!editModal)
                        }} className="btn btn-primary">
                          Install App
                        </a>
                      )
                      } />
                  </Col>
                </> : ''

              }) : <div className="mt-2 d-flex justify-content-center align-items-center">
                <Spinner size={'40px'} />
              </div>
            } */}

          </Row>
        </>
      }

      <Modal
        isOpen={editModal}
        toggle={() => setEditModal(!editModal)}
        className='modal-dialog-centered'
        size='lg'
      >
        <ModalHeader toggle={() => setEditModal(!editModal)}>Select Platform</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-3" title="Shopify" onClick={() => installApp('shopify')}>
              <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{ width: '110px', height: '110px' }}>
                <img width={'100%'} className="p-2" src={shopifyLogo} alt="" />
              </div>
            </div>
            <div className="col-md-3" title="Woo Commerce" onClick={() => installApp('woocommerce')}>
              <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{ width: '110px', height: '110px', filter: 'brightness(40%)' }}>
                <img width={'100%'} className="p-2" src={wooCommerceLogo} alt="" />
              </div>
              <h6>Coming Soon!</h6>
            </div>
            <div className="col-md-3" title="Magento" onClick={() => installApp('magento')}>
              <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{ width: '110px', height: '110px', filter: 'brightness(40%)' }}>
                <img width={'100%'} className="p-2" src={magentoLogo} alt="" />
              </div>
              <h6>Coming Soon!</h6>
            </div>
            <div className="col-md-3" title="Others" onClick={() => installApp('other')}>
              <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{ width: '110px', height: '110px' }}>
                <img width={'100%'} className="p-2" src={oyeconLogo} alt="" />
              </div>
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>
          <Button outline onClick={() => setEditModal(!editModal)}>
            Cancel
          </Button>
          <Button color='primary'>
            Continue
          </Button>
        </ModalFooter> */}
      </Modal>

    </Container>
  )
}

export default Apps