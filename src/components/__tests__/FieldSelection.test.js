import { fireEvent, render, screen } from "@testing-library/react";
import FieldSelection from "../FieldSelection";

test("match snapshot", () => {
  const { container } = render(
    <FieldSelection
      fieldType="Field Type"
      fields={["A", "B", "C"]}
      setField={jest.fn}
    />
  );
  expect(container).toMatchSnapshot();
});

test("field selection", () => {
  render(
    <FieldSelection
      fieldType="Field Type"
      fields={["A", "B", "C"]}
      setField={jest.fn}
    />
  );
  const labelRadio = screen.getByLabelText("A");
  expect(labelRadio.checked).toEqual(false);
  fireEvent.click(labelRadio);
  expect(labelRadio.checked).toEqual(true);
});
