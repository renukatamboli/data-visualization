import BarGraph from "./BarGraph";
import React from "react";
import PieChart from "./PieChart";
import {
  aggregateDataBy,
  aggregateDataByCategory,
  aggregateDataByDateFilter,
  IdentifyFields,
} from "./DataAggregation";
import FieldSelection from "./FieldSelection";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    display: "inline-flex",
    flexDirection: "row",
    gap: "15em",
  },
  fields: {
    display: "inline-flex",
    flexDirection: "column",
    gap: "1em",
  },
});
class Graphs extends React.Component {
  state = {
    datetimeField: "",
    dataValueField: "",
    categoryField: "",
    filter: "",
    reset: false,
    aggregateData: {},
    graph: "",
  };
  setDateTimeField = (field) => {
    this.setState({ datetimeField: field });
  };

  setDataValueField = (field) => {
    this.setState({ dataValueField: field });
  };

  setCategoryField = (field) => {
    this.setState({ categoryField: field });
  };

  setFilter = (field) => {
    this.setState({ filter: field });
  };

  setResetValueBack = () => {
    this.setState({ reset: false });
  };

  reset = () => {
    this.setState({
      dataValueField: "",
      categoryField: "",
      filter: "",
      datetimeField: "",
      reset: true,
      graph: "",
      aggregateData: {},
    });
  };

  componentDidUpdate(_, prevState) {
    if (
      ((this.state.categoryField !== prevState.categoryField &&
        this.state.dataValueField !== "") ||
        (this.state.dataValueField !== prevState.dataValueField &&
          this.state.categoryField !== "")) &&
      this.state.filter === ""
    ) {
      this.setState({
        aggregateData: aggregateDataByCategory(
          this.props.data,
          this.state.categoryField
        ),
        graph: "pie",
      });
    }
    if (
      ((this.state.datetimeField !== prevState.datetimeField &&
        this.state.dataValueField !== "") ||
        (this.state.dataValueField !== prevState.dataValueField &&
          this.state.datetimeField !== "")) &&
      this.state.filter !== ""
    ) {
      this.setState({
        aggregateData: aggregateDataByDateFilter(
          this.state.filter,
          this.props.data,
          this.state.datetimeField
        ),
        graph: "bar",
      });
    }
  }
  render() {
    const { classes } = this.props;
    const { datetimeFields, dataValueFields, categoryFields } = IdentifyFields(
      this.props.data
    );
    const filters = ["by month", "by year"];

    return (
      <div className={classes.root}>
        <div className={classes.fields}>
          <div>
            <FieldSelection
              fieldType="Date Field"
              fields={datetimeFields}
              setField={this.setDateTimeField}
              reset={this.state.reset}
              setResetValueBack={this.setResetValueBack}
            />
          </div>
          <div>
            <FieldSelection
              fieldType="Filters"
              fields={filters}
              setField={this.setFilter}
              reset={this.state.reset}
              setResetValueBack={this.setResetValueBack}
            />
          </div>
          <div>
            <FieldSelection
              fieldType="Data Value Field"
              fields={dataValueFields}
              setField={this.setDataValueField}
              reset={this.state.reset}
              setResetValueBack={this.setResetValueBack}
            />
          </div>
          <div>
            <FieldSelection
              fieldType="Category Field"
              fields={categoryFields}
              setField={this.setCategoryField}
              reset={this.state.reset}
              setResetValueBack={this.setResetValueBack}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.reset}>
              Reset
            </Button>
          </div>
        </div>
        <div>
          {console.log(this.state.aggregateData)}
          {this.state.graph === "pie" ? (
            <PieChart
              data={this.state.aggregateData}
              dataValue={this.state.dataValueField}
            />
          ) : (
            <BarGraph />
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Graphs);
