import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DataTable from "./DataTable";
import BarGraph from "./BarGraph";
class Home extends Component {
  state = {
    data: "",
  };
  getData = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    fetch("http://localhost:8080/api/csv/upload", {
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
    return (
      <div>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={this.getData}
        />

        {this.state.data !== "" ? (
          <>
            <BarGraph></BarGraph>
            <DataTable data={this.state.data} />{" "}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
export default Home;
