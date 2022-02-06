import { shallow, configure } from "enzyme";
import BarGraph from "../BarGraph";
const newOptions = {
  chart: {
    height: 350,
    stacked: true,
    toolbar: { show: true },
    type: "bar",
    zoom: { enabled: true },
  },
  dataLabels: { enabled: false },
  fill: { opacity: 1 },
  legend: { offsetY: 40, position: "right" },
  plotOptions: { bar: { borderRadius: 10, horizontal: false } },
  responsive: [
    {
      breakpoint: 480,
      options: { legend: { offsetX: -10, offsetY: 0, position: "bottom" } },
    },
  ],
  xaxis: { categories: ["2017", "2018", "2019"], type: "datetime" },
};

const newSeries = [
  { data: [2, 4], name: "A" },
  { data: [8], name: "B" },
];
test.only("Renders OK", async () => {
  const component = shallow(
    <BarGraph
      data={{
        2017: {
          type: { A: { value: 2 } },
        },
        2018: { type: { A: { value: 4 } } },
        2019: { type: { B: { value: 8 } } },
      }}
      dataValue="value"
      category="type"
      datetimeField="year"
    />
  );
  expect(component.state().series).toEqual(newSeries);
  expect(component.state().options).toEqual(newOptions);
});
