import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import Apex from './Chart'

const TICKER_QUERY = gql`
  query Ticker($index: String, $period: Int) {
    ticker(index: $index, period: $period) {
      index
      close
      high
      low
      open
      time
    }
  }
`
const ChartAPI = ({ ...props }) => {
  let data_period;
  if (props.period == 'Week') data_period = 604800
  if (props.period == 'Month') data_period = 2629746
  if (props.period == '2 Monthes') data_period = 2*2629746
  if (props.period == '6 Months') data_period = 6*2629746
  if (props.period == 'Year') data_period = 12*2629746
  if (props.period == '2 Years') data_period = 24*2629746
  if (props.period == '3 Years') data_period = 36*2629746
  if (props.period == '6 Years') data_period = 72*2629746
  const { loading, err, data } = useQuery(TICKER_QUERY, {
    variables: {
      index: props.index,
      period: data_period
    }
  })
  if (loading) return <h3>Loading...</h3>
  if (err) console.error(err);
  return <Apex chartData = { data }/>
}

export default ChartAPI
