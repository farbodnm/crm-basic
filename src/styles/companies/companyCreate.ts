import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  inline: {
    display: "inline-block",
    marginLeft: "1em",
    "&.first-child": {
      marginLeft: 0,
    },
  },
  center: {
    width: "70%",
    margin: "0 auto",
  },
}));
