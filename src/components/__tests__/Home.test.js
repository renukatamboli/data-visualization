import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../Home";
let originalFetch;

beforeEach(() => {
  originalFetch = global.fetch;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          value: "Testing something!",
        }),
    })
  );
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
});
