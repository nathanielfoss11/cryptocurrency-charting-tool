import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceHistory: props.price,
      dateHistory: props.date,
      chart: '',
    }
    this.createChart = this.createChart.bind(this);
    this.createChart();
  }

  createChart() {
    console.log('ran')
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.dateHistory,
        datasets: [
          { 
            data: this.state.priceHistory,
          }
        ]
      }
    });
    this.setState({chart: myChart})
  }

  render() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.state.dateHistory,
      datasets: [
        { 
          data: this.state.priceHistory,
        }
      ]
    }
  });
    return (
      {myChart}
    );
  }
}

export default Graph;