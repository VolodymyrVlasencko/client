import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const CurrentTicker = ({...props}) => {
  const [currentTickerValue, setCurrentTickerValue] = useState([])
  const [currentValue, setCurrentValue] = useState({
    ticker: 'AAPL',
    data: {
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      pc: 0,
      t: 0
    }})

  useEffect(() => {
    const socket = io('http://ec2-3-16-164-193.us-east-2.compute.amazonaws.com:26271')
    socket.on('connect', () => {
      socket.on('response', response => {
        setCurrentTickerValue(prevTickerValue => [...prevTickerValue, response])
      })
    })
  }, [])


  useEffect(() => {
    if (currentTickerValue.length == 20) {
      Promise.resolve(currentTickerValue.map(ticker => {
        return ticker.ticker
      }).indexOf(props.ticker))
        .then(res => setCurrentValue(currentTickerValue[res]))
        .catch(err => console.log(err))
    }
  }, [currentTickerValue, props])
  if (currentTickerValue.length == 40) setCurrentTickerValue(currentTickerValue.slice(20, 40))

  const setColor = (current, close) => {
    if (current > close) return '#28a028'
    if (current <= close) return '#dd3232'
  }
  const setSymbol = (current, close) => {
    if (current > close) return '▲'
    if (current <= close) return '▼'
  }

  return (
    <div className = "current-value">
      <div className = "current-value gen-data">
      <div className = "current-value gen-data first">
        <p>Open: <b>{ currentValue.data.o }</b></p>
        <p>High: <b>{ currentValue.data.h }</b></p>
      </div>
      <div className = "current-value gen-data second">
        <p>Low: <b>{ currentValue.data.l }</b></p>
        <p>Prev close: <b>{ currentValue.data.pc }</b></p>
      </div>
      </div>
      <div className = "current-value cur-data">
        <h2>Current: <b>{ currentValue.data.c }</b></h2>
        <h1 style = { { color: setColor(currentValue.data.c, currentValue.data.pc) } }>
          <span>{ setSymbol(currentValue.data.c, currentValue.data.pc) }</span>
          {((currentValue.data.c-currentValue.data.pc)/currentValue.data.pc*100).toFixed(2)}% ({(currentValue.data.c-currentValue.data.pc).toFixed(2)})
        </h1>
      </div>
    </div>
  )
}

export default CurrentTicker
