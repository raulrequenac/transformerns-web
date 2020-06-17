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

export default { login }
