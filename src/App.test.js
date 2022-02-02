import { render, screen } from "@testing-library/react";
import App from "./App";

test("match snapshot", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

test("renders home page", () => {
  render(<App />);
  const navElement = screen.getByTestId("nav");
  const homeElement = screen.getByTestId("home");
  expect(navElement).toBeInTheDocument();
  expect(homeElement).toBeInTheDocument();
});
