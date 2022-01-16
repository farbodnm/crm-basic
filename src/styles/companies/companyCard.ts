import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  paper: {
    height: 200,
    width: 193.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1em",
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
