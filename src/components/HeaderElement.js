import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const HeaderElement = ({ ...props }) => {
  const [observedTicker, setObservedTicker] = useState('AAPL')
  const [observedData, setObservedData] = useState({
    ticker: 'AAPL',
    data: {
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      pc: 0,
      t: 0
    }})

  const Tickers = ['AAPL', 'MSFT', 'AMZN', 'KO', 'JPM', 'NKE',
    'PG', 'GOOGL', 'GS', 'FDX', 'MCD', 'PYPL', 'FANG', 'V',
    'MA', 'NFLX', 'TSLA', 'CRM', 'SNEJF', 'UBER']

  const tickerList = Tickers.map((ticker, index) => {
    return (<option key = { index }>{ ticker }</option>)
  })

  useEffect(() => {
    if (props.currentTickerData.length !== 0) {
      Promise.resolve(props.currentTickerData.map(tickerData => {
        return tickerData.ticker
      }).indexOf(observedTicker))
      .then(res => setObservedData(props.currentTickerData[res]))
      .catch(err => console.log(err))
    }
  }, [props])

  const setColor = (current, close) => {
    if (current > close) return '#28a028'
    if (current <= close) return '#dd3232'
  }

  return (
    <div className = "header-element">
      <div className = "header-element cur-info">
        <h3>{observedData.ticker}</h3>
        <p>
          <b style = {{color: setColor(observedData.data.c, observedData.data.pc)}}>
            {((observedData.data.c-observedData.data.pc)/observedData.data.pc*100).toFixed(2)}% ({(observedData.data.c-observedData.data.pc).toFixed(2)})
          </b>
        </p>
      </div>
      <div className = "header-element gen-info">
        <h3>{observedData.data.c != 0?observedData.data.c:0}</h3>
        <select onChange = {() => {
          setObservedTicker(event.target.value)
          Promise.resolve(props.currentTickerData.map(tickerData => {
            return tickerData.ticker
          }).indexOf(event.target.value))
            .then(res => setObservedData(props.currentTickerData[res]))
            .catch(err => console.log(err))
        }}>
          { tickerList }
        </select>
      </div>
    </div>
  )
}

export default HeaderElement
