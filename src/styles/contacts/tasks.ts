import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  iconEdit: {
    animation: `$keyframes1 250ms ${theme.transitions.easing.easeInOut} infinite`,
    transformOrigin: "50% 10%",
  },
  iconDelete: {
    animation: `$keyframes1 250ms ${theme.transitions.easing.easeInOut} infinite`,
    transformOrigin: "30% 5%",
  },
  "@keyframes keyframes1": {
    "10%": {
      transform: "rotate(-1deg)",
    },
    "50%": {
      transform: "rotate(1.5deg)",
    },
  },
  "@keyframes keyframes2": {
    "10%": {
      transform: "rotate(1deg)",
    },
    "20%": {
      transform: "rotate(-1.5deg)",
    },
  },
}));
