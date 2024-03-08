import axios from "axios"
import { getToken, removeToken, setToken } from "./auth"
import jwtDecode from "jwt-decode"

// export const baseURL = "https://api.demo.xircls.in"
// export const SuperLeadzBaseURL = "https://apps.demo.xircls.in"
// export const crmURL = "https://crm.xircls.in"

// Live 
export const ngrokURL = "https://0b43-2402-e280-3d9c-20d-6fb0-19da-f260-f233.ngrok-free.app"
export const baseURL = "https://api.xircls.com"
export const affiliateURL = "https://api.affiliate.xircls.com"
export const SuperLeadzBaseURL = "https://apps.xircls.com"
export const crmURL = "https://crm.xircls.in"

export const configUrl = {
    //affliate
    signupaffliate: '/affiliate/affiliate_person_signup/',
    loginaffliate: '/affiliate/affiliate_person_login/',
    dashboard: '/affiliate/dashboard_view/',  
    //
    login: "/merchant/login/",
    signup: "/merchant/signup/",
    refresh: "/api/token/refresh/",
    //Infiniti
    addPartners: "/merchant/xircls/make-a-xircls/",
    remarketing: "/merchant/campaign_setting/action_email_remarketing/",
    target: "/merchant/campaign/target-criteria/",
    campaign: "/merchant/campaign-stop-setting/",
    email_template_builder: "/merchant/settings/campaign_email_customization/",
    email_template_view: "/merchant/email-settings/INFINITI/",
    website: "/merchant/plugin_setting/",
    outletType: "/merchant/choose-outlet-type/",
    getCategory: "/merchant/categories/",
    saveOutletDetails: "/merchant/create-outlet/",
    networkDashboard: "/merchant/xircls/networks-dashboard/",
    addPlanDetails: "/merchant/xircls/make-a-xircls/",
    getDashboardData: "/dashboard/add_count_dash/",
    getDashboardCampaginDetails: "/dashboard/current_campaign/",
    sendNetworkMail: "/merchant/xircls/create-network/",
    getCustomersDetails: "/merchant/customers/",
    getInvoiceList: "/merchant/subcriptions/invoice_list/",
    getSubscriptionDetails: "/merchant/subcriptions/my-subscriptions/",
    saveInnerXirclsDetails: "/merchant/xircls/inner_circle/",
    myTransactions: "/merchant/subcriptions/my-transactions/",
    saveWebsiteFrontend: "/merchant/plugin_setting/",
    customerGroup: "/merchant/customers/groups/",
    merchantProfile: '/merchant/profile/',
    notificationData: '/merchant/xircls/network_settings/',
    verifyEmail: "/merchant/verify_your_email/",
    verifyDomain: "/merchant/verify_your_domain/",
    outletsDetails: '/merchant/outlets-details/',
    infinitiEmailBuilder: '/merchant/email-settings/INFINITI/',
    changePassword: "/merchant/change-password/",
    deleteTemplate: "/merchant/email-settings/",
    innerXirclTwo: "/merchant/xircls/inner_circle_two/",
    LoyaltySelectOffers: "/offers/show-offer/",
    addCompany: '/merchant/company/profile/',
    productDetails: "/products/get-products-details/",
    singleProductData: "/products/view-product/",
    countries: "/country-details/",
    getState: "/state-details/",
    getCities: "/city-details/",
    merchantFlow: "/merchant/flow/",
    addDomain: '/merchant/add-domain/',
    getApps: "/merchant/get-domains-details/",
    editSingleOutlet: "/merchant/edit-outlet/",
    campaignData: "/merchant/timeline/",
    outletStatus: "/merchant/outlet_timeline/",
    saveOffersInfiniti: "/api/v1/offers/",
    makeVerify: '/offers/is_active_is_verified/',
    setActiveTemplate: "/customization/merchant/set_default_template/",
    totalReachReports: "/api/v1/total_reach/",
    TotalClicksReports: "/api/v1/my_total_clicks/",
    PartnerClicksReports: "/api/v1/my_partner_clicks/",
    OwnClicksReports: "/api/v1/my_own_clicks/",
    TotalRedemptionsReports: "/api/v1/incentives_redeem_total/",
    PartnerRedemptionsReports: "/api/v1/incentives_redeem_partner/",
    OwnRedemptionsReports: "/api/v1/incentives_redeem_own/",
    TotalRevenue: "/api/v1/my_total_revenue/",
    IncentiveViewPartners: "/api/v1/incentives_viewed_partners/",
    IncentiveViewTotal: "/api/v1/incentives_viewed_total/",
    IncentiveViewOwn: "/api/v1/incentives_viewed_own/",
    AcquisitionReports: "/api/v1/acq_detailed/",
    RetentionReports: "/api/v1/ret_detailed/",
    OffersIssuedToPartner: "/api/v1/detailed_partner_report/",
    OffersIssuedToOwn: "/api/v1/detailed_own_report/",
    checkValid: "/merchant/check_validation/",
    getAllApps: "/merchant/all_apps/",
    getTotalCount: "/api/v1/total_total_count/",
    getPartnerCount: "/api/v1/partner_total_count/",
    getOwnCount: "/api/v1/own_total_count/",
    installPlugin: "/merchant/plugin-download/",
    changeOutletStatus: "/merchant/outlet_change_status/",
    startCampagin: "/merchant/start_campaign/",
    logDetails: "/merchant/log_view/",
    // logoutEntry: '/merchant/logout_log/',
    logoutEntry: '/affiliate/affiliate_person_logout/',
    accDetails: '/merchant/profile_info/',
    planDetails: '/merchant/subscriptions/plan_subscriptions_data/',
    emailSend: '/merchant/generate_otp/',
    otpSend: '/merchant/verify_otp/',
    innerXirclsRequest: "/merchant/xircls/preferred-partner/",
    verifyUserEmail: "/merchant/verify-your-email/",
    blockInnerXircls: "/merchant/xircls/block_request/",
    resetPasswordMail: "/api/v1/send_forgot_password/",
    password_reset_confirm: "/api/v1/password_reset/",
    confirm_repassword: "/api/v1/password_reset_confirm/",
    contactUs: "/merchant/api/contact_us/",
    getAllPlans: "/subscriptions/api/v1/get_bill_card/",
    createPayment: "/merchant/subscriptions/create_payment/",
    reportFeed1: "/api/v1/newsfeed1/",
    addFreePlan: "/subscriptions/api/v1/add_free_plan/",
    freePlan: "/subscriptions/api/v1/get_free_infinity_card/",
    getFilterOffer: "/api/v1/outlet_offers_get/",
    createSupportTicket: "/support-system/create-support-ticket/",
    editSupportTicket: "/support-system/ticket-records/",
    supperLeadzBilling: "/auth_merchant/api/v1/get_transactions/",
    // contactMerchant: "merchant/api/contact_us_merchant/",
    //SuperLeadz
    planSubscription: "/merchant/subscriptions/plan_subcription_shopify/",
    getUserData: "/support-system/merchant-basic-details/",
    addOffers: "/add_offer/",
    //referal
    referalPoints: "/referral/referralpoints/",
    // Flash Account 

    //Affiliate
    customer_get_view: "/affiliate/lead/customer_get_view/",
    leads_get_view: "/affiliate/lead/leads_get_view/",
    affiliate_dashboard: "/affiliate/transaction/wallet_transaction_view/",  //--
    affiliate_wallet: "/affiliate/fund/wallet_view/",  //--
    affiliate_clicks: "/affiliate/record/affiliate_clicks_all/",
    affiliate_revenue: "/affiliate/transaction/affiliate_total_revenue/",
    affiliate_withdrawn_transactions: "/affiliate/transaction/affiliate_listWithdrawable/",
    affiliate_withdrawn_request: "/affiliate/transaction/affiliate_withdrawn_req/",
    admin_withdrawn_transactions: "/affiliate/admin/admin_withdrawn_trans",
    admin_withdrawn_request: "/affiliate/admin/admin_withdrawn_req/",
    get_user_account_details: "/affiliate/affiliate_person_get/",
    edit_user_account_details: "/affiliate/affiliate_person_edit/",
    save_bank: "/affiliate/fund/bank_details/",
    get_bank: "/affiliate/fund/affiliate_bank_details_get/",
    dash_payout: "/affiliate/transaction/affiliate_payout_table/",
    conversion_rate: "/affiliate/lead/leads_conversion_rate/",
    average_order_value: "/affiliate/fund/average_order_value/",
    wallet_transactions_get_view: "/affiliate/fund/wallet_transactions_get_view/",
    bank_view: "/affiliate/fund/bank_view/",
    two_step_veri: "/affiliate/two_step_veri/",
    bank_details: "/affiliate/fund/bank_details/",
    password_update: "/affiliate/password_update/"


}

const axiosInstance = axios.create({
    baseURL
})

let isRefreshing = false
let refreshTokenPromise = null

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken() ? JSON.parse(getToken()) : null
        // const userPermission = await localStorage.getItem('userPermission') ? JSON.parse(localStorage.getItem('userPermission')) : null
        // console.log(config, "config")
        if (token) {
            // console.log("going")
            const accessToken = token['access']
            // const refreshToken = token['refresh']
            // console.log(accessToken, "accessToken")
            // console.log(refreshToken, "refreshToken")
            // Check if access token is expired
            const decodedAccessToken = jwtDecode(accessToken)
            const currentTime = Math.floor(Date.now() / 1000)
            if (decodedAccessToken.exp < currentTime) {
                console.log(decodedAccessToken, "decodedAccessToken")
                // Access token is expired, try to refresh it
                if (!isRefreshing) {
                    // isRefreshing = true
                    // refreshTokenPromise = axios.post(`${baseURL}${configUrl['refresh']}`, {
                    //     refresh: refreshToken
                    // })
                    removeToken()
                    window.alert('session expired')
                    window.location.replace('/merchant/login/')
                }
                const newAccessToken = await refreshTokenPromise
                isRefreshing = false
                refreshTokenPromise = null
                if (newAccessToken) {
                    config.headers['Authorization'] = `Bearer ${newAccessToken.data.access}`
                    //config.headers['Api-Key'] = userPermission.apiKey // to get this use HTTP_API_KEY
                    const newToken = JSON.stringify({ access: newAccessToken.data.access, refresh: token.refresh })
                    setToken(newToken)
                } else {
                    // Refresh token is also expired, remove token and redirect to login page
                    removeToken()
                    window.alert('session expired')
                    window.location.replace('/merchant/login/')
                }
            } else {
                config.headers['Authorization'] = `Bearer ${accessToken}`
                //config.headers['Api-Key'] = userPermission.apiKey // to get this use HTTP_API_KEY
            }
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && Number(error.response.status) === 401) {
            removeToken()
            window.alert('session expired')
            window.location.replace('/merchant/login/')
            return error.response
        }
        return Promise.reject(error)
    }
)

export const postReq = (path, data, customBaseURL = baseURL, config) => {
    console.log(customBaseURL, "domian")
    // if (customBaseURL) {true
    axiosInstance.defaults.baseURL = customBaseURL
    // }

    // updateBaseURL(URLs[base])
    const time = new Date().getTime()
    if (path === 'login' || path === "signup" || path === "loginaffliate" || path === "signupaffliate") {
        return axios.post(`${customBaseURL}${configUrl[`${path}`]}?time=${time}`, data)
    } else {
        return axiosInstance.post(`${configUrl[path]}?time=${time}`, data, config ? config : null)
    }
}

export const putReq = (path, data, customBaseURL = baseURtrueL, config) => {
    // console.log(customBaseURL, "domian")
    // if (customBaseURL) {
    axiosInstance.defaults.baseURL = customBaseURL
    // }
    const time = new Date().getTime()
    if (path === 'login' || path === "signup") {
        return axios.put(`${baseURL}${configUrl[`${path}`]}?time=${time}`, data)
    } else {
        return axiosInstance.put(`${configUrl[path]}?time=${time}`, data, config ? config : null)
    }
}


export const getReq = (path, slug, customBaseURL = baseURL) => {
    console.log(customBaseURL, "domian")
    axiosInstance.defaults.baseURL = customBaseURL
    const time = new Date().getTime()
    return slug ? axiosInstance.get(`${configUrl[path]}${slug}&time=${time}`) : axiosInstance.get(`${configUrl[path]}?time=${time}`)
}

export const deleteReq = (path, slug, customBaseURL = baseURL) => {
    console.log(customBaseURL, "domian")
    axiosInstance.defaults.baseURL = customBaseURL
    return axiosInstance.delete(`${configUrl[path]}${slug}`)
}

// With out JWT

export const custPostReq = (path) => {
    return axios.post(`${SuperLeadzBaseURL}${configUrl[`${path}`]}`, data)
}

export const custGetReq = (path, slug) => {
    const time = new Date().getTime()
    return slug ? axios.get(`${SuperLeadzBaseURL}${configUrl[path]}${slug}&time=${time}`) : axios.get(`${SuperLeadzBaseURL}${configUrl[path]}?time=${time}`)
}

export const CustDeleteReq = (path, slug) => {
    return axios.delete(`${SuperLeadzBaseURL}${configUrl[path]}${slug}`)
}