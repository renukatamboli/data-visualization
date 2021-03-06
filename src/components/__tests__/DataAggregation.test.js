import {
  aggregateDataByCategory,
  aggregateDataByDateFilter,
  IdentifyFields,
} from "../DataAggregation";

test("Identify fields function with 'month year' date format", () => {
  const data = [{ time: "nov 2017", value: "2", type: "A" }];
  const { datetimeFields, dataValueFields, categoryFields } =
    IdentifyFields(data);
  expect(datetimeFields).toEqual(["time"]);
  expect(dataValueFields).toEqual(["value"]);
  expect(categoryFields).toEqual(["type"]);
});

test("Identify fields function with d/m/yy date format", () => {
  const data = [{ time: "2/3/2017", value: "2", type: "A" }];
  const { datetimeFields, dataValueFields, categoryFields } =
    IdentifyFields(data);
  expect(datetimeFields).toEqual(["time"]);
  expect(dataValueFields).toEqual(["value"]);
  expect(categoryFields).toEqual(["type"]);
});

test("Identify fields function with d-m-yy date format", () => {
  const data = [{ time: "2-3-2017", value: "2", type: "A" }];
  const { datetimeFields, dataValueFields, categoryFields } =
    IdentifyFields(data);
  expect(datetimeFields).toEqual(["time"]);
  expect(dataValueFields).toEqual(["value"]);
  expect(categoryFields).toEqual(["type"]);
});

test("Identify fields function with year given", () => {
  const data = [{ time: "2017", value: "2", type: "A" }];
  const { datetimeFields, dataValueFields, categoryFields } =
    IdentifyFields(data);
  expect(datetimeFields).toEqual(["time"]);
  expect(dataValueFields).toEqual(["value"]);
  expect(categoryFields).toEqual(["type"]);
});

test("aggregate Data By Category function", () => {
  const data = [
    { time: "nov 2017", value: "2", type: "A" },
    { time: "nov 2018", value: "4", type: "A" },
    { time: "nov 2019", value: "8", type: "B" },
  ];
  const aggregateData = aggregateDataByCategory(data, "type", "value");
  expect(aggregateData).toEqual({ A: { value: 6 }, B: { value: 8 } });
});

test("aggregate Data By year filter", () => {
  const data = [
    { time: "nov 2017", value: "2", type: "A" },
    { time: "nov 2018", value: "4", type: "A" },
    { time: "nov 2019", value: "8", type: "B" },
  ];
  const aggregateData = aggregateDataByDateFilter(
    "by year",
    data,
    "time",
    "type"
  );
  expect(aggregateData).toEqual({
    2017: {
      type: { A: { value: 2 } },
    },
    2018: { type: { A: { value: 4 } } },
    2019: { type: { B: { value: 8 } } },
  });
});

test("aggregate Data By month filter", () => {
  const data = [
    { time: "nov 2017", value: "2", type: "A" },
    { time: "nov 2018", value: "4", type: "A" },
    { time: "nov 2019", value: "8", type: "B" },
  ];
  const aggregateData = aggregateDataByDateFilter(
    "by month",
    data,
    "time",
    "type"
  );
  expect(aggregateData).toEqual({
    "Nov 2017": {
      type: { A: { value: 2 } },
    },
    "Nov 2018": { type: { A: { value: 4 } } },
    "Nov 2019": { type: { B: { value: 8 } } },
  });
});
