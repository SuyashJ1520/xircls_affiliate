import { Circle, Home } from "react-feather"
import { ownUrl } from "../../views/Validator"
import { AiFillPhone } from "react-icons/ai"

export const flashAccountsNavigation = [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20} />,
        navLink: '/merchant/home/'
    },
    {
        id: 'app',
        title: 'Apps',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}//images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/merchant/apps/'
    },
    {
      header: 'Flash Accounts'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash-Account/'
    },
    {
        id: 'registered_customer',
        title: 'Customers',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash-Account/table/'
    },
    {
        id: 'setup',
        title: 'Setup',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash-Account/form/'
    },
    {
        id: 'setting',
        title: 'Setting',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash-Account/setting/'
    },
    {
        id: 'support',
        title: 'Support',
        icon: <AiFillPhone size={16} />,
        navLink: '/merchant/support/'
    }
]