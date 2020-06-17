import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import '../styles/Navbar.css'
import { Redirect } from 'react-router-dom'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const [home, setHome] = useState(false)

  const onClickLogout = () => logout()
  const onClickHome = () => setHome(true)

  if (home) return <Redirect to="/"/>

  return (
    <div className="Navbar">
      <img alt="" src="/images/logo.png" className="logo" onClick={onClickHome}/>
      <div className="user">
        <h3>{currentUser.data.username}</h3>
        <div className="logout" onClick={onClickLogout}>Logout</div>
      </div>
    </div>
  )
}

export default Navbar