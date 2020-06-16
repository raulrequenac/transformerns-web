import axios from "axios"

const https = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081",
  withCredentials: true,
})

const login = ({ username, password }) => https.post(
  "/login",
  {},
  {
    auth: {
      username: btoa(username),
      password: btoa(password),
    },
  }
)

export default { login }
