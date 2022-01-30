import Chart from "react-apexcharts";
import React from "react";
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: Object.keys(this.props.data),
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

  componentDidMount() {
    const categories = Object.keys(this.props.data);
    const values = [];
    categories.map((category) => {
      values.push(this.props.data[category][this.props.dataValue]);
      this.setState({ series: values });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.data !== this.props.data ||
      prevProps.dataValue !== this.props.dataValue
    ) {
      const categories = Object.keys(this.props.data);
      const values = [];
      categories.map((category) => {
        values.push(this.props.data[category][this.props.dataValue]);
        this.setState({ series: values });
      });
    }
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
