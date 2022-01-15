import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
  },
  small: {
    marginRight: "1em",
    "& .MuiFilledInput-input": {
      paddingTop: 10,
    },
  },
}));
