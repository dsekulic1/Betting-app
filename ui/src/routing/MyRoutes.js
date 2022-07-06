import React from 'react'
import { Route, Switch } from 'react-router-dom'
import GuestRoute from 'routing/GuestRoute'
import Home from 'pages/Home'
import HomePage from 'pages/HomePage'
import Login from 'pages/Login'
import Register from 'pages/Register'
import PageNotFound from 'pages/PageNotFound'
import { useUserContext } from 'AppContext'
import PrivateRoute from './PrivateRoute'
import EventPage from 'pages/EventPage'
import Tickets from 'pages/Tickets'

const MyRoutes = () => {
  const { loggedIn } = useUserContext()

  return (
    <Switch>
      <Route exact path='/' component={loggedIn ? HomePage : Home} />
      <GuestRoute path='/login' component={Login} />
      <GuestRoute path='/register' component={Register} />
      <PrivateRoute path='/events' component={EventPage} />
      <PrivateRoute path='/tickets' component={Tickets} />
      <Route component={PageNotFound} />
    </Switch>
  )
}

export default MyRoutes
