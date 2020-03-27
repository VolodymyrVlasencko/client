import React, { useState } from 'react'
import ChartAPI from './ChartAPI'
import CurrentTicker from './CurrentTicker'

const SelectTicker = () => {
  const Tickers = ['AAPL', 'MSFT', 'AMZN', 'KO', 'JPM', 'NKE',
    'PG', 'GOOGL', 'GS', 'FDX', 'MCD', 'PYPL', 'FANG', 'V',
    'MA', 'NFLX', 'TSLA', 'CRM', 'SNEJF', 'UBER']
  const Periods = ['Week', 'Month', '2 Monthes', '6 Months', 'Year', '2 Years', '3 Years', '6 Years']

  const [ticker, setTicker] = useState('AAPL')
  const [period, setPeriod] = useState('Week')

  let viewIndexes = Tickers.map((Ticker, index) => {
      return (<option key = { index }>{ Ticker }</option>)
  })

  return(
    <div className = "select-ticker">
      <CurrentTicker ticker = { ticker }/>
      <ChartAPI index = { ticker } period = { period }/>
      <div className = "select-ticker select-elements">
        <p>Ticker:</p>
        <select onChange = {() => {
          setTicker(event.target.value)
        }}>
          { viewIndexes }
        </select>
        <p>Period:</p>
        <select onChange = {() => {
          setPeriod(event.target.value)
        }}>
          {Periods.map((period, index) => {
            return (<option key = { index }>{ period }</option>)
          })}
        </select>
      </div>
    </div>
  )
}

export default SelectTicker
