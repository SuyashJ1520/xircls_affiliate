import { lazy } from 'react'
const Dashboard = lazy(() => import('../../views/dashboard/Dashboard'))


const Dashboard_Routes = [
  {
    path: '/merchant/dashboard',
    element: <Dashboard />,
    permissions: ['Infiniti']
  }
]

export default Dashboard_Routes