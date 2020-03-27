import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from "apollo-cache-inmemory";

import App from './components/App'
import './scss/main.scss'

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://ec2-3-16-164-193.us-east-2.compute.amazonaws.com:26271/graphql',
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
  introspection: true
})

hydrate(
  <ApolloProvider client = { client }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>, document.getElementById('root'))
