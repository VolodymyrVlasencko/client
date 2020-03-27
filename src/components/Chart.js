import React, { PureComponent } from 'react';
import moment from 'moment'
import loadable from 'loadable-components'
const Chart = loadable(() => import('react-apexcharts'))


class Apex extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: []
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: props.chartData.ticker[0]?props.chartData.ticker[0].index:'CandleStick Chart',
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: (value, timestamp) => {
              return moment(timestamp).format("MMM Do YY") 
            }
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const Tickers = nextProps.chartData.ticker.map(ticker => {
      return {
        x: ticker.time*1000,
        y: [ticker.open, ticker.high, ticker.low, ticker.close]
      }
    })
    if (Tickers.length > 200) {
      const rounded = Math.round(Tickers.length/200);

      const filtredTickers = Tickers.filter((ticker, index) => {
        if (index % rounded !== 0) {
          return false
        }
        return true
      }).map(ticker => {return ticker})

      if (prevState.series[0].data !== filtredTickers) {
        return {
          series: [{
            data: filtredTickers
          }]
        };
      }
    } else {
      if (prevState.series[0].data !== Tickers) {
        return {
          series: [{
            data: Tickers
          }]
        };
      }
    }
  }

  render() {
    return (
        <div className="chart">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="candlestick"
            />
          </div>
        </div>
    );
  }
}

export default Apex;
