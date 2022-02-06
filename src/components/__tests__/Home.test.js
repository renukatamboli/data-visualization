import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../Home";
let originalFetch;
let promise;

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

beforeEach(() => {
  originalFetch = global.fetch;
  const promise = Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          TotalValue: "358752.94",
          Category: "A",
          Year: "01 Jan 2014",
          Quantity: "68646.896",
        },
        {
          TotalValue: "2432036.26",
          Category: "B",
          Year: "02 Jan 2014",
          Quantity: "400296.928",
        },
        {
          TotalValue: "2375685.48",
          Category: "C",
          Year: "03 Jan 2014",
          Quantity: "398729.693",
        },
        {
          TotalValue: "35656.8",
          Category: "D",
          Year: "04 Jan 2014",
          Quantity: "13525.89",
        },
      ]),
  });
  global.fetch = jest.fn(() => promise);
});

afterEach(() => {
  global.fetch = originalFetch;
});

test("match snapshot", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});

test("fetch call", async () => {
  const file = new File(["test"], "test.csv", { type: "csv" });
  render(<Home />);
  const inputElem = screen.getByTestId("inputFile");
  userEvent.upload(inputElem, file);
  await waitFor(() => {
    expect(inputElem).not.toBeInTheDocument();
  });
  const graph = screen.getByTestId("graph");
  const dataTable = screen.getByTestId("table");
  expect(graph).toBeInTheDocument();
  expect(dataTable).toBeInTheDocument();
});
