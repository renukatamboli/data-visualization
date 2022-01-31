import React from "react";
import Chart from "react-apexcharts";
class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
  }
  setData = () => {
    const time = Object.keys(this.props.data);
    const values = {};
    time.map((timeValue) => {
      const categories = Object.keys(
        this.props.data[timeValue][this.props.category]
      );
      categories.map((category) => {
        if (values.hasOwnProperty(category)) {
          values[category].push(
            this.props.data[timeValue][this.props.category][category][
              this.props.dataValue
            ]
          );
        } else {
          values[category] = [];
          values[category].push(
            this.props.data[timeValue][this.props.category][category][
              this.props.dataValue
            ]
          );
        }
      });
    });
    const seriesData = [];
    const labels = Object.keys(values);
    labels.map((label) => {
      seriesData.push({ name: label, data: values[label] });
    });
    const newOptions = {
      dataLabels: {
        enabled: false,
      },
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
        categories: Object.keys(this.props.data),
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };
    this.setState({ series: seriesData, options: newOptions });
  };
  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.data !== this.props.data ||
      prevProps.dataValue !== this.props.dataValue
    ) {
      this.setData();
    }
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width={550}
        height={320}
      />
    );
  }
}
export default BarGraph;
