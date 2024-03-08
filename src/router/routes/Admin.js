import { lazy } from 'react'
import Outlet from '../../views/Admin/Outlet'
import LoginRedirect from '../../views/Affiliate/components/LoginRedirect'
//main login
const Admin = lazy(() => import('../../views/Admin/Admin'))
//logins
const AdminHome = lazy(() => import('../../views/Admin/AdminHome'))
//cps pages
const CPS = lazy(() => import('../../views/Admin/CPS'))
//reports pages
const MainDash = lazy(() => import('../../views/Admin/MainDash'))
const UserDash = lazy(() => import('../../views/Admin/UserDash'))
const DetailReport = lazy(() => import('../../views/Admin/DetailReport'))
const LeadsDash = lazy(() => import('../../views/Admin/LeadsDash'))

const Admin_Routes = [
  {
    path: '/admin/',
    element: <Admin />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/merchant/login/',
    element: <LoginRedirect goTo={"login"} />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/merchant/signup/',
    element: <LoginRedirect goTo={"signup"} />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/admin/cps',
    element: <CPS />,
    meta: {
      layout: 'custom'
    }
  },
  {
    path: '/admin/reports',
    element: <MainDash />,
    meta: {
      layout: 'custom'
    }
  },
  {
    path: '/admin/reports/users',
    element: <UserDash />,
    meta: {
      layout: 'custom'
    }
  },
  {
    path: '/admin/reports/detailrep',
    element: <DetailReport />,
    meta: {
      layout: 'custom'
    }
  },
  {
    path: '/admin/reports/leadsrep',
    element: <LeadsDash />,
    meta: {
      layout: 'custom'
    }
  },
  {
    path: '/admin/reports/outlets/',
    element: <Outlet />,
    meta: {
      layout: 'custom'
    }
  }
  
]

export default Admin_Routes