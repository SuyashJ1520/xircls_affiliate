import { lazy } from 'react'
const Table = lazy(() => import('../../views/FlashAccounts/Table'))
const Dashboard = lazy(() => import('../../views/FlashAccounts/Dashboard'))
const Form = lazy(() => import('../../views/FlashAccounts/Form.jsx'))


const FlashAccounts_Routes = [
  {
    path: '/merchant/Flash-Account/',
    element: <Dashboard />
  },
  {
    path: '/merchant/Flash-Account/table/',
    element: <Table />
  },
  {
    path: "/merchant/Flash-Account/form/",
    element: <Form />
  }
]

export default FlashAccounts_Routes