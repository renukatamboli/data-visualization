import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DataTable from "./DataTable";
import Graphs from "./Graphs";
const styles = (theme) => ({
  graphs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
  },
});
class Home extends Component {
  state = {
    data: "",
  };
  getData = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    return fetch("http://localhost:8080/api/csv/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
      })
      .catch((error) => {
        console.log("Unable to fetch data");
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div data-testid="home">
        <br />
        {this.state.data !== "" ? (
          <>
            <Graphs data={this.state.data} />
            <DataTable data={this.state.data} />{" "}
          </>
        ) : (
          <input
            accept="image/*"
            id="fileUpload"
            multiple
            type="file"
            onChange={this.getData}
            data-testid="inputFile"
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles)(Home);
