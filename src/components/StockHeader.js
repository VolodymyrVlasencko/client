import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import HeaderElement from './HeaderElement'

const StockHeader = () => {
  const [currentTickerData, setCurrentTickerData] = useState([])

  useEffect(() => {
    setTimeout(() => {
      const socket = io('http://ec2-3-16-164-193.us-east-2.compute.amazonaws.com:26271')
      socket.on('connect', () => {
        socket.on('response', response => {
          setCurrentTickerData(prevTickerData => [...prevTickerData, response])
        })
      })
    }, 0)
  }, [])

  if (currentTickerData.length == 40) setCurrentTickerData(currentTickerData.slice(20, 40))

  return (
    <div className = 'stock-header'>
      <HeaderElement currentTickerData = { currentTickerData }/>
      <HeaderElement currentTickerData = { currentTickerData }/>
      <HeaderElement currentTickerData = { currentTickerData }/>
      <HeaderElement currentTickerData = { currentTickerData }/>
      <HeaderElement currentTickerData = { currentTickerData }/>
    </div>
  )

}

export default StockHeader
