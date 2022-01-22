import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  paper: {
    height: 180,
    width: 329.3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1em",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  identity: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  singleStat: {
    display: "flex",
    alignItems: "center",
  },
  statIcon: {
    marginRight: theme.spacing(1),
  },
}));
