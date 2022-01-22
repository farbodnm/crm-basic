import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  center: {
    width: "50%",
    margin: "0 auto",
  },
  centerNewsLetter: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginLeft: "0",
  },
  centerReference: {
    margin: "0 auto",
  },
  inline: {
    display: "inline-block",
    marginLeft: "1em",
    "&.first-child": {
      marginLeft: 0,
    },
  },
}));
