import DataTable from "../DataTable";
import { render, screen } from "@testing-library/react";
test("data table rendered properly", () => {
  render(
    <DataTable
      data={[
        {
          value: "358752.94",
          type: "A",
          time: "01 Jan 2014",
        },
      ]}
    />
  );
  expect(screen.getByText("time")).toBeInTheDocument();
  expect(screen.getByText("value")).toBeInTheDocument();
  expect(screen.getByText("type")).toBeInTheDocument();
  expect(screen.getByText("A")).toBeInTheDocument();
  expect(screen.getByText("01 Jan 2014")).toBeInTheDocument();
});
