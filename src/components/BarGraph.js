import React from "react";
import Chart from "react-apexcharts";
import { aggregateDataBy, IdentifyFields } from "./DataAggregation";
class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: "datetime",
          categories: Object.keys(props.data),
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }

  componentDidMount() {
    const time = Object.keys(this.props.data);
    const values = [];
    time.map((timeValue) => {
      const categories = Object.keys(
        this.props.data[timeValue][this.props.category]
      );
      categories.map((category) => {
        values.push(
          this.props.data[timeValue][this.props.category][category][
            this.props.dataValue
          ]
        );
      });
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
        type="bar"
        width={500}
        height={320}
      />
    );
  }
}
export default BarGraph;
