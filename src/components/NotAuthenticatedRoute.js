import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'

const NotAuthenticatedRoute = ({ component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return currentUser ?
      <Route {...rest} component={component} /> :
    <Redirect to="/login" />
}

export default NotAuthenticatedRoute