import axios from "axios"

const https = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081",
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

//Authorization
const user = JSON.parse(localStorage.getItem('user'))
const auth = { auth: user ? user.config.auth : {} }

//Contacts
const getAllContacts = () => https.get("/contacts", {}, auth)
const getContactsBy = (data) => https.get(`/contact/find_by/${data}`, {}, auth)

//Salesrep
const newSalesRep = (data) => https.post("/salesrep/save", data, auth)
const getAllSalesReps = () => https.get("/salesreps", {}, auth)

//Accounts
const getAllAccounts = () => https.get("/accounts", {}, auth)
const getMedianEmployeeCount = () => https.get("/accounts/statistics/medianEmployeeCount", {}, auth)
const getMeanEmployeeCount = () => https.get("/accounts/statistics/meanEmployeeCount", {}, auth)
const getMaxEmployeeCount = () => https.get("/accounts/statistics/maxEmployeeCount", {}, auth)
const getMinEmployeeCount = () => https.get("/accounts/statistics/minEmployeeCount", {}, auth)
const getMedianOppsPerAccount = () => https.get("/accounts/statistics/medianOpsPerAccount", {}, auth)
const getMeanOppsPerAccount = () => https.get("/accounts/statistics/meanOpportunitiesPerAccount", {}, auth)
const getMaxOppsPerAccount = () => https.get("/accounts/statistics/maxOpportunitiesPerAccount", {}, auth)
const getMinOppsPerAccount = () => https.get("/accounts/statistics/minOpportunitiesPerAccount", {}, auth)

//Leads
const newLead = (data) => https.post("/lead/save", data, auth)
const getAllLeads = () => https.get("/leads", {}, auth)
const convertLeadWithAccount = (leadId, oppAcc) => https.post(`/lead/convert_with_account/${leadId}`, oppAcc, auth)
const convertLeadNoAccount = (leadId, accId, opp) => https.post(`/lead/convert_no_account/${leadId}/${accId}`, opp, auth)

//Opportunities
const getOppsBy = ({ state1 }) => https.get(`/opportunities/${state1}`, {}, auth)
const getOppsBy2 = ({ state1, state2 }) => https.get(`/opportunities/${state1}/${state2}`, {}, auth)
const getAllOpps = () => https.get("/opportunities", {}, auth)

//Login
const login = ({ username, password }) => https.post("/login", {}, {
  auth: {
    username: username,
    password: password
  }
})

export default {
  getAllContacts,
  getContactsBy,
  newSalesRep,
  getAllSalesReps,
  getAllAccounts,
  getMedianEmployeeCount,
  getMeanEmployeeCount,
  getMaxEmployeeCount,
  getMinEmployeeCount,
  getMedianOppsPerAccount,
  getMeanOppsPerAccount,
  getMaxOppsPerAccount,
  getMinOppsPerAccount,
  newLead,
  getAllLeads,
  convertLeadWithAccount,
  convertLeadNoAccount,
  getOppsBy,
  getOppsBy2,
  getAllOpps,
  login
}
