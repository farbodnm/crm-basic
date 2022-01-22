import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 50,
    height: 43.54,
  },
  appName: {
    transition: "250ms",
    "&:hover": {
      cursor: "default",
      textShadow: "0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF",
    },
  },
  tabs: {
    transition: "250ms",
    "&:hover": {
      color: "#ffffff",
      textShadow: "0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF",
    },
  },
  dropdownMenu: {
    color: "rgba(0, 0, 0, 0.54)",
    justifyContent: "space-between",
    fontSize: "1rem",
  },
}));
