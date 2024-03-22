import { Children, lazy } from 'react'

import AffiliateAdminTable from "../../views/Affiliate/AffiliateAdminTable"
import Affiliate from "../../views/Affiliate/Affiliate"
import AffiliateSignUp from "../../views/Affiliate/AffiliateSignUp"
import SignupLink from "../../views/Affiliate/SignupLink"
import LoginPage from "../../views/Affiliate/LoginPage"
import SignupPage from "../../views/Affiliate/SignupPage"
import AllClicks from "../../views/Affiliate/components/AllClicks"
import AllLeads from "../../views/Affiliate/components/AllLeads"
import AllCustomers from "../../views/Affiliate/components/AllCustomers"
import AllEarnings from "../../views/Affiliate/components/AllEarnings"
import AllRevenue from "../../views/Affiliate/components/AllRevenue"
import AllWithdrawal from "../../views/Affiliate/components/AllWithdrawal"
import WithdrawalTransaction from "../../views/Affiliate/components/WithdrawalTransaction"
import LoginRedirect from '../../views/Affiliate/components/LoginRedirect'
import UserProfile from '../../views/Affiliate/navbar/UserProfile'
import Account from '../../views/Profile/AdminView/Account'
import Security from '../../views/Profile/AdminView/Security'
import Billing from '../../views/Profile/AdminView/Billing'
import Notifications from '../../views/Profile/AdminView/Notifications'
import General from '../../views/Profile/AdminView/General'
import Leads from '../../views/Affiliate/components/Leads'
import Customers from '../../views/Affiliate/components/Customers'
import Earnings from '../../views/Affiliate/components/Earnings'
import Payout from '../../views/Affiliate/components/Payout'
import Statement from '../../views/Affiliate/components/Statement'
import FAQ from '../../views/Affiliate/components/FAQ'
import Support from '../../views/Affiliate/components/Support'
import CreateSupport from '../../views/Affiliate/components/CreateSupport'
import Dash_Payout from '../../views/Affiliate/components/Dash_Payout'
import OrderValue from '../../views/Affiliate/components/OrderValue'
import Conversion_Rate from '../../views/Affiliate/components/Conversion_Rate'
import VerifyEmail from '../../views/Affiliate/VerifyEmail'
import ForgetPassword from '../../views/Affiliate/ForgetPassword'
const Apps = lazy(() => import('../../views/Apps/Apps'))

const MerchantHome = lazy(() => import('../../views/Apps/Home'))

const Affiliate_Routes = [
    {
        path: "*",
        element: <LoginRedirect goTo={"login"} />
    },
    {
        path: '/merchant/affiliate/dashboard/',
        element: <Affiliate />
    },
    {
        path: '/merchant/affiliate/all_clicks/',
        element: <AllClicks />
    },
    {
        path: '/merchant/affiliate/all_leads/',
        element: <AllLeads />
    },
    {
        path: '/merchant/affiliate/all_customers/',
        element: <AllCustomers />
    },
    {
        path: '/merchant/affiliate/all_earnings/',
        element: <AllEarnings />
    },
    {
        path: '/merchant/affiliate/all_revenue/',
        element: <AllRevenue />
    },
    {
        path: '/merchant/affiliate/dash_payout/',
        element: <Dash_Payout />
    },
    {
        path: '/merchant/affiliate/order_value/',
        element: <OrderValue />
    },
    {
        path: '/merchant/affiliate/conversion_rate/',
        element: <Conversion_Rate />
    },
    {
        path: '/merchant/affiliate/all_withdrawal/',
        element: <AllWithdrawal />
    },
    {
        path: '/affiliate/login/',
        element: <LoginPage />,
        meta: {
            layout: "blank"
        }
    },
    {
        path: '/affiliate/signup/',
        element: <SignupPage />,
        meta: {
            layout: "blank"
        }
    },
    {
        path: '/merchant/home/',
        element: <MerchantHome />
    },
    {
        path: '/merchant/apps/',
        element: <Apps />
    },
    {
        path: '/merchant/affiliates/',
        element: <AffiliateAdminTable />
    },
    {
        path: '/merchant/signuplinks/',
        element: <SignupLink />
    },
    {
        path: '/merchant/WithdrawalTransaction/',
        element: <WithdrawalTransaction />
    },
    {
        path: '/merchant/affiliate/admin_view/',
        element: <UserProfile />,
        children: [
            {
                path: '/merchant/affiliate/admin_view/',
                element: <Account />
            },
            {
                path: '/merchant/affiliate/admin_view/security/',
                element: <Security />
            },
            {
                path: '/merchant/affiliate/admin_view/billing/',
                element: <Billing />
            },
            {
                path: '/merchant/affiliate/admin_view/notification/',
                element: <Notifications />
            },
            {
                path: '/merchant/affiliate/admin_view/general/',
                element: <General />
            }
        ]
    },
    {
        path: '/merchant/leads/',
        element: <Leads />
    },
    {
        path: '/merchant/customers/',
        element: <Customers />
    },
    {
        path: '/merchant/earnings/',
        element: <Earnings />
    },
    {
        path: '/merchant/payout/',
        element: <Payout />
    },
    {
        path: '/merchant/statement/',
        element: <Statement />
    },
    {
        path: '/merchant/faq/',
        element: <FAQ />
    },
    {
        path: '/merchant/support/',
        element: <Support />
    },
    {
        path: '/merchant/create_support/',
        element: <CreateSupport />
    },
    {
        path: '/verify-email/:id',
        element: <VerifyEmail />,
        meta: {
            layout: 'fullWidthLayout',
            publicRoute: true
          }
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />,
        meta: {
            layout: 'fullWidthLayout',
            publicRoute: true
          }
    }

]

export default Affiliate_Routes   