import { Category } from "@material-ui/icons";

export function IdentifyFields(data) {
  const fields = Object.keys(data[0]);
  let datetimeFields = [];
  let dataValueFields = [];
  let categoryFields = [];
  for (let field of fields) {
    if (!isNaN(Date.parse(data[0][field]))) {
      datetimeFields.push(field);
    } else {
      if (!isNaN(data[0][field])) {
        dataValueFields.push(field);
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
      if (aggregatedData.hasOwnProperty(dataValues[groupByField])) {
        if (
          !aggregatedData[dataValues[groupByField]].hasOwnProperty(
            dataValueField
          )
        ) {
          aggregatedData[dataValues[groupByField]][dataValueField] = 0;
        }
        aggregatedData[dataValues[groupByField]][dataValueField] += parseFloat(
          dataValues[dataValueField]
        );
      } else {
        aggregatedData[dataValues[groupByField]] = {};
      }
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
    if (aggregatedData.hasOwnProperty(datefilter)) {
      if (aggregatedData[datefilter].hasOwnProperty(category)) {
        if (
          aggregatedData[datefilter][category].hasOwnProperty(
            dataValues[category]
          )
        ) {
          dataValueFields.map((dataValueField) => {
            if (
              aggregatedData[datefilter][category][
                dataValues[category]
              ].hasOwnProperty(dataValueField)
            ) {
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
            } else {
              aggregatedData[datefilter][category][dataValues[category]][
                dataValueField
              ] = 0;
            }
          });
        } else {
          aggregatedData[datefilter][category][dataValues[category]] = {};
        }
      } else {
        aggregatedData[datefilter][category] = {};
      }
    } else {
      aggregatedData[datefilter] = {};
    }
  });
  return aggregatedData;
}
