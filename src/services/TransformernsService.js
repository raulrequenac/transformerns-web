import axios from "axios"

const https = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081",
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

const login = ({ username, password }) => https.post("/login", {}, {
  auth: {
    username: username,
    password: password
  },
})

const opportunities = ({status1, status2 }) => https.get(`/opportunity/${status1}/${status2}`, {}, {
  auth: JSON.parse(localStorage.getItem('user')).config.auth
})

const allOpp = () => https.get("/opportunities",  {}, {
  auth: JSON.parse(localStorage.getItem('user')).config.auth
})

export default { login, opportunities, allOpp }
