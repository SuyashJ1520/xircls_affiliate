import { lazy } from 'react'
import ResetPassword from '../../views/XirclsFrontend/ResetPassword'
import NewPassword from '../../views/XirclsFrontend/NewPassword'
import VerfiyYourEmail from '../../views/XirclsFrontend/VerfiyYourAccount'
import InstallFailed from '../../views/XirclsFrontend/InstallFailed'
import ProductSuperleads from '../../views/XirclsFrontend/ProductSuperLeadz'
const Allie = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Allie'))
const Lauren = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Lauren'))
const Dineo = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Dineo'))
const Peyton = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Peyton'))
const Kwanele = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Kwanele'))
const Adriana = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Adriana'))
const Shakercha = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Shakercha'))
const Ian = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Ian'))
const Darina = lazy(() => import('../../views/XirclsFrontend/Blog/Authors/Darina'))
const Home = lazy(() => import('../../views/XirclsFrontend'))
const Signup = lazy(() => import('../../views/XirclsFrontend/Signup'))
const WhyXircls = lazy(() => import('../../views/XirclsFrontend/Why_xircls'))
const Blog = lazy(() => import('../../views/XirclsFrontend/Blog/Blog'))
const Collaborative = lazy(() => import('../../views/XirclsFrontend/Collaborative'))
const Infiniti = lazy(() => import('../../views/XirclsFrontend/Infiniti'))
const NewHome = lazy(() => import('../../views/XirclsFrontend/NewHome'))
const Privacy = lazy(() => import('../../views/XirclsFrontend/Privacy'))
const SemperFi = lazy(() => import('../../views/XirclsFrontend/SemperFi'))
const Sniper = lazy(() => import('../../views/XirclsFrontend/Sniper'))
const Team = lazy(() => import('../../views/XirclsFrontend/Team'))
const Vision = lazy(() => import('../../views/XirclsFrontend/Vission'))
const Terms = lazy(() => import('../../views/XirclsFrontend/TermsOfUse'))
const Emplogin = lazy(() => import('../../views/XirclsFrontend/EmployeeLogin'))
const ScheduleDemo = lazy(() => import('../../views/XirclsFrontend/ScheduleDemo'))
const Blog_full_1 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_1'))
const Blog_full_2 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_2'))
const Blog_full_3 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_3'))
const Blog_full_4 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_4'))
const Blog_full_5 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_5'))
const Blog_full_6 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_6'))
const Blog_full_7 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_7'))
const Blog_full_8 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_8'))
const Blog_full_9 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_9'))
const Blog_full_10 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_10'))
const Blog_full_11 = lazy(() => import('../../views/XirclsFrontend/Blog/Blog_full_11'))
const AffiliateSignup = lazy(() => import('../../views/XirclsFrontend/AffiliateSignup'))
const InfluencerWaitlist = lazy(() => import('../../views/XirclsFrontend/InfluencerWaitlist'))
const Apps = lazy(() => import('../../views/Apps/Apps'))
const Error = lazy(() => import('../../views/Error'))
const Processing = lazy(() => import('../../views/Flow/Processing'))
const MerchantHome = lazy(() => import('../../views/Apps/Home'))
const FlowLogin = lazy(() => import("../../views/Flow/Login"))
const FlowSignUp = lazy(() => import("../../views/Flow/SignUp"))

const Xircls_Frontend_Routes = [
  {
    path: '/',
    element: <Home />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  // {
  //   path: '/merchant/signup',
  //   element: <Signup />,
  //   meta: {
  //     layout: 'blank',
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/merchant/login/',
  //   element: <Emplogin />,
  //   meta: {
  //     layout: 'blank',
  //     publicRoute: true
  //   }
  // },
  {
    path: '/password_reset/',
    element: <ResetPassword />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/password_reset_confirm/:slug/',
    element: <NewPassword />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/about-us/why-XIRCLS/',
    element: <WhyXircls />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/about-us/vision-&-mission-statement/',
    element: <Vision />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/',
    element: <Blog />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/team/',
    element: <Team />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/new_index/',
    element: <NewHome />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/products/semperfi/customer-loyalty/',
    element: <SemperFi />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/about-us/why-collaborative-marketing/',
    element: <Collaborative />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/products/infiniti/customer-acquisition-and-loyalty/',
    element: <Infiniti />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/products/sniper/customer-acquisition/',
    element: <Sniper />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/privacy-policy/',
    element: <Privacy />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/terms-of-use/',
    element: <Terms />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/employee-login/',
    element: <Emplogin />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/contactus/',
    element: <ScheduleDemo />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/The-Devils-Currency-Our-Lives-for-Auction/',
    element: <Blog_full_1 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Playing-With-Power-The-Danger-of-Monopolies/',
    element: <Blog_full_2 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/The-Harsh-Truth-About-Customer-Loyalty-Programs/',
    element: <Blog_full_3 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Are-Influencers-Worth-The-Price-Tag/',
    element: <Blog_full_4 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Mind-Games-Why-We-Buy-What-We-Buy/',
    element: <Blog_full_5 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Are-Bargain-Hunters-Killing-Your-Business/',
    element: <Blog_full_6 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Current-Online-Marketing-Practices-Are-Making-You-Pay-More/',
    element: <Blog_full_7 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Target-Audience-Are-Companies-at-War-with-Their-Customers/',
    element: <Blog_full_8 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Why-Companies-Need-to-Move-From-Diversity-to-Inclusion/',
    element: <Blog_full_9 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Collaborative-Marketing-and-the-Future-of-Zero-Party-Data/',
    element: <Blog_full_10 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/Conflict-Torture-or-Tool/',
    element: <Blog_full_11 />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/affiliate/sign-up/',
    element: <AffiliateSignup />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Allie_Hinds/',
    element: <Allie />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Lauren_Deah/',
    element: <Lauren />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Dineo-Magakwa/',
    element: <Dineo />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Peyton-Sweeney/',
    element: <Peyton />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Kwanele_Ngobese/',
    element: <Kwanele />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Adriana_Marcela_Torrenegra/',
    element: <Adriana />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Shakercha_Bradshaw/',
    element: <Shakercha />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Ian_White/',
    element: <Ian />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/blog/author/Darina_Litvina/',
    element: <Darina />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/influencer/waitlist/',
    element: <InfluencerWaitlist />,
    meta: {
      layout: 'blank',
      publicRoute: true
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
    path: '*',
    element: <Error />,
    meta: {
      layout: "custom",
      publicRoute: true
    }
  },
  {
    path: '/processing/',
    element: <Processing />,
    meta: {
      layout: "custom",
      publicRoute: true
    }
  },
  {
    path: '/:flow/signup/',
    element: <FlowSignUp />,
    meta: {
      layout: "custom",
      publicRoute: true
    }
  },
  {
    path: '/flow/login/',
    element: <FlowLogin />,
    meta: {
      layout: "custom",
      publicRoute: true
    }
  },
  {
    path: '/merchant/verify-your-email/:slug/',
    element: <VerfiyYourEmail />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/install_flow_failed/',
    element: <InstallFailed />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/products/SuperLeadz/',
    element: <ProductSuperleads />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  }
]

export default Xircls_Frontend_Routes