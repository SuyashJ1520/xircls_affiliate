import { lazy } from 'react'
const Analysis = lazy(() => import('../../views/Referral/Analysis'))
const Dashboard = lazy(() => import('../../views/Referral/Dashboard'))
const ReferralOffers = lazy(() => import('../../views/Referral/Offers'))
const Reports = lazy(() => import('../../views/Referral/Reports'))
const Table = lazy(() => import('../../views/Referral/Table'))


const Referral_Routes = [
  {
    path: '/merchant/Referral/',
    element: <Dashboard />
  },
  {
    path: '/merchant/Referral/create_offer/',
    element: <ReferralOffers />
  },
  {
    path: "/merchant/Referral/reports/",
    element: <Reports />
  },
  {
    path: "/merchant/Referral/offers/",
    element: <Table />
  },
  {
    path: "/merchant/Referral/analysis/",
    element: <Analysis />
  }
]

export default Referral_Routes