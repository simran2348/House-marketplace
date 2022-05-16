import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UseAuthStatus } from '../Hooks/UseAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  const { loggedIn, checking } = UseAuthStatus()
  if (checking) {
    return <Spinner />
  }
  return loggedIn ? <Outlet /> : <Navigate to={'/sign-in'} />
}

export default PrivateRoute
