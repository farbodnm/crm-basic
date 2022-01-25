import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    border: "1px solid #eee",
    transition: "0.5s",
    borderRadius: 3,
    "&:hover": {
      border: "1px solid #1976d2",
    },
  },
  cardContent: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  dealName: {
    marginLeft: theme.spacing(1),
    minHeight: theme.spacing(4),
  },
  logoField: {
    height: "100%",
  },
}));
