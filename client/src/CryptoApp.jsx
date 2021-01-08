import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chart from 'chart.js';

class CryptoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      priceHistory: {},
    }
    this.getPriceData = this.getPriceData.bind(this)
    this.createGraph = this.createGraph.bind(this)
    this.getPriceData()
  }

  getPriceData() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then((results) => {this.setState({priceHistory: results.data.bpi}); return results.data.bpi})
    .then((results) => this.createGraph())
    .catch((err) => console.log(err))
  }

  createGraph() {
    let price = []
    let date = []
    let history = this.state.priceHistory
    for(let key in history) {
      let dollarConversion = '$' + history[key].toFixed(2);
      price.push(history[key])
      date.push(key)
    }
    let ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          { 
            label: 'Bitcoin',
            data: price,
          }
        ]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                }
            }]
        },
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Cryptocurrency Charting Tool</h1>
        <h2>30 Day Trend</h2>
        <div id='graph'>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    );
  }
}

export default CryptoApp;