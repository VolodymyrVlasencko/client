import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { InMemoryCache } from 'apollo-cache-inmemory'


import Main from './Main'

export default class App extends React.Component {
  render() {
    return(
        <Switch>
          <Route path='/*' exact={ true } component={ Main } />
        </Switch>
    )
  }
}
