import React, { useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function FieldSelection(props) {
  const classes = useStyles(props);

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.setField(event.target.value);
  };

  useEffect(() => {
    if (props.reset) {
      setSelectedValue("");
      props.setResetValueBack();
    }
  }, [props, props.reset]);

  return (
    <div className={classes.root}>
      <b>{props.fieldType}</b>
      <div className={classes.field}>
        {props.fields.map((field) => (
          <div>
            {field}
            <Radio
              checked={selectedValue === field}
              onChange={handleChange}
              value={field}
              color="default"
              name="radio-button-demo"
              inputProps={{ "aria-label": field }}
              size="small"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
