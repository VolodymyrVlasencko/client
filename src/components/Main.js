import React, { useState, useEffect } from 'react'
import SelectTicker from './SelectTicker'
import StockHeader from './StockHeader'
import '../scss/main.scss'

const Main = () => {
  return(
    <div>
      <StockHeader />
      <SelectTicker />
    </div>
  )
}

export default Main
