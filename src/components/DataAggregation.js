import { Category } from "@material-ui/icons";

export function IdentifyFields(data) {
  const fields = Object.keys(data[0]);
  let datetimeFields = [];
  let dataValueFields = [];
  let categoryFields = [];
  for (let field of fields) {
    if (!isNaN(data[0][field])) {
      dataValueFields.push(field);
    } else {
      if (!isNaN(Date.parse(data[0][field]))) {
        datetimeFields.push(field);
      } else {
        categoryFields.push(field);
      }
    }
  }

  return { datetimeFields, dataValueFields, categoryFields };
}

export function aggregateDataByCategory(data, groupByField, dataValueField) {
  const aggregatedData = {};
  const { datetimeFields, dataValueFields, categoryFields } =
    IdentifyFields(data);
  data.map((dataValues) => {
    dataValueFields.map((dataValueField) => {
      if (!aggregatedData.hasOwnProperty(dataValues[groupByField])) {
        aggregatedData[dataValues[groupByField]] = {};
      }
      if (
        !aggregatedData[dataValues[groupByField]].hasOwnProperty(dataValueField)
      ) {
        aggregatedData[dataValues[groupByField]][dataValueField] = 0;
      }
      aggregatedData[dataValues[groupByField]][dataValueField] += parseFloat(
        dataValues[dataValueField]
      );
    });
  });
  return aggregatedData;
}

export function aggregateDataByDateFilter(
  filter,
  data,
  groupByField,
  category
) {
  const aggregatedData = {};
  const { datetimeFields, dataValueFields, categoryFields } =
    IdentifyFields(data);
  data.map((dataValues) => {
    const date = new Date(dataValues[groupByField]).toString().split(" ");
    let datefilter;
    if (filter === "by month") {
      datefilter = date[1] + " " + date[3];
    } else {
      datefilter = date[3];
    }
    if (!aggregatedData.hasOwnProperty(datefilter)) {
      aggregatedData[datefilter] = {};
    }
    if (!aggregatedData[datefilter].hasOwnProperty(category)) {
      aggregatedData[datefilter][category] = {};
    }
    if (
      !aggregatedData[datefilter][category].hasOwnProperty(dataValues[category])
    ) {
      aggregatedData[datefilter][category][dataValues[category]] = {};
    }
    dataValueFields.map((dataValueField) => {
      if (
        !aggregatedData[datefilter][category][
          dataValues[category]
        ].hasOwnProperty(dataValueField)
      ) {
        aggregatedData[datefilter][category][dataValues[category]][
          dataValueField
        ] = 0;
      }
      if (
        !aggregatedData[datefilter][category][
          dataValues[category]
        ].hasOwnProperty(dataValueField)
      ) {
        aggregatedData[datefilter][category][dataValues[category]][
          dataValueField
        ] = 0;
      }
      aggregatedData[datefilter][category][dataValues[category]][
        dataValueField
      ] += parseFloat(dataValues[dataValueField]);
    });
  });
  return aggregatedData;
}
