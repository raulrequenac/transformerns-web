import React, { useState, useEffect, useContext } from "react"
import { Redirect } from "react-router-dom"
import TransformernsService from "../services/TransformernsService"
import AuthContext from "../contexts/AuthContext"
import '../styles/Login.css'

const Login = () => {
  const { login } = TransformernsService
  const { setUser } = useContext(AuthContext)
  const [data, setData] = useState({ username: "", password: "" })
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState({ error: false, loading: false })
  const { error, loading } = status

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus({ error: false, loading: true })
  }

  useEffect(() => {
    if (loading && !error) {
      login(data).then(
        (user) => {
          setStatus({ error: false, loading: false })
          setUser(user)
          setSuccess(true)
        },
        () => setStatus({ error: true, loading: false })
      )
    }
  }, [data, error, loading, login, setUser])

  const errorClassName = error ? "invalid" : ""

  if (success) return <Redirect to="/"/>

  return (
    <div className="Login">
      <img alt="" src="/images/logo.png" className="logo" />
      <form onSubmit={handleSubmit} className="form">
        <label className="form-group">
          <input
            className={errorClassName}
            type="text"
            name="username"
            value={data.username}
            onChange={handleOnChange}
            placeholder="Username"
          ></input>
        </label>
        <label className="form-group">
          <input
            className={errorClassName}
            type="password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
            placeholder="Password"
          ></input>
        </label>
        <input type="submit" value="Log in" className="button" />
      </form>
    </div>
  )
}

export default Login
