import { Circle, Home } from "react-feather"
import { ownUrl } from "../../views/Validator"

export const referralNavigation = [
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
      header: 'Referral'
    },
    {
        id: 'home',
        title: 'Dashboard',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/'
    },
    // {
    //     id: 'referralOffers',
    //     title: 'Offers',
    //     icon: <Circle size={20} />,
    //     navLink: '/merchant/Referral/create_offer/'
    // },
    {
        id: 'ReferralsTable',
        title: 'Offers',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/offers/'
    },
    {
        id: 'ReferralsAnalysis',
        title: 'Referrals',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/analysis/'
    },
    {
        id: 'ReferralsReports',
        title: 'Reports',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/reports/'
    }
]