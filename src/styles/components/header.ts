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
    transition: "0.5s",
    "&:hover": {
      cursor: "default",
      textShadow: "0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF",
    },
  },
  tabs: {
    transition: "0.5s",
    "&:hover": {
      color: "#ffffff",
      textShadow: "0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF",
    },
  },
}));
