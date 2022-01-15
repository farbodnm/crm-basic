import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useTranslate } from "react-admin";

import Status from "../Status";

const useStyles = makeStyles({
  root: {
    width: 150,
  },
});

export const StatusSelector = ({
  status,
  setStatus,
  className = "",
  disabled,
}: any) => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <TextField
      select
      value="cold"
      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
        setStatus(event.target.value);
      }}
      label={false}
      margin="none"
      size="small"
      className={clsx(className, classes.root)}
      disabled={disabled}
    >
      <MenuItem value="cold">
        <Status status="cold" /> {translate("ra.statuses.cold")}
      </MenuItem>
      <MenuItem value="warm">
        <Status status="warm" /> {translate("ra.statuses.warm")}
      </MenuItem>
      <MenuItem value="hot">
        <Status status="hot" /> {translate("ra.statuses.hot")}
      </MenuItem>
      <MenuItem value="in-contract">
        <Status status="in-contract" /> {translate("ra.statuses.inContract")}
      </MenuItem>
    </TextField>
  );
};
