import { Circle, Home } from "react-feather"
import { ownUrl } from "../../views/Validator"

export const DefaultNav = [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20} />,
        navLink: '/merchant/home/'
    },
    {
        id: 'app',
        title: 'Apps',
        icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/merchant/apps/'
    },
    {
        header: 'Affiliate'
    },
    {
        id: 'home',
        title: 'Home',
        icon: <Circle />,
        navLink: '/merchant/affiliate/dashboard/'
    },
    {
        id: 'leads',
        title: 'Leads',
        icon: <Circle />,
        navLink: '/merchant/leads/'
    },
    {
        id: 'customers',
        title: 'Customers',
        icon: <Circle />,
        navLink: '/merchant/customers/'
    },
    {
        id: 'earnings',
        title: 'Earnings',
        icon: <Circle />,
        navLink: '/merchant/earnings/'
    },
    {
        id: 'payouts',
        title: 'Payouts',
        icon: <Circle />,
        navLink: '/merchant/payout/'
    },
    {
        id: 'statements',
        title: 'Statements',
        icon: <Circle />,
        navLink: '/merchant/statement/'
    },
    {
        id: 'faqs',
        title: 'FAQs',
        icon: <Circle />,
        navLink: '/merchant/faq/'
    }
    // {
    //     id: 'support',
    //     title: 'Support',
    //     icon: <Circle />,
    //     navLink: '/merchant/support/'
    // }
]