import Chart from "react-apexcharts";
import React from "react";
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    const categories = Object.keys(props.data);
    const values = [];
    console.log(props.dataValue);
    categories.map((category) => {
      values.push(props.data[category][props.dataValue]);
    });
    this.state = {
      series: values,
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: categories,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="pie"
        width={380}
      />
    );
  }
}
export default PieChart;
