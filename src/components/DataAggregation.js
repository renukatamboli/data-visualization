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

export function aggregateDataByDateFilter(filter, data, groupByField) {
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
    dataValueFields.map((dataValueField) => {
      if (aggregatedData.hasOwnProperty(datefilter)) {
        if (!aggregatedData[datefilter].hasOwnProperty(dataValueField)) {
          aggregatedData[datefilter][dataValueField] = 0;
        }
        aggregatedData[datefilter][dataValueField] += parseFloat(
          dataValues[dataValueField]
        );
      } else {
        aggregatedData[datefilter] = {};
      }
    });
  });
  return aggregatedData;
}
