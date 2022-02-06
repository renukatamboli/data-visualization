import { shallow } from "enzyme";
import PieChart from "../PieChart";
const options = {
  chart: { type: "pie", width: 380 },
  labels: ["A", "B"],
  responsive: [
    {
      breakpoint: 480,
      options: { chart: { width: 200 }, legend: { position: "bottom" } },
    },
  ],
};

test.only("Renders OK", async () => {
  const component = shallow(
    <PieChart data={{ A: { value: 6 }, B: { value: 8 } }} dataValue="value" />
  );
  expect(component.state().series).toEqual([6, 8]);
  expect(component.state().options).toEqual(options);
});
