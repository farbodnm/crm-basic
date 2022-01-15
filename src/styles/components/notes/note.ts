import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  metadata: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  textarea: {
    paddingTop: 16,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
    lineHeight: 1.3,
    backgroundColor: "#f5f5f5",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
  },
  cancel: {
    marginRight: theme.spacing(1),
  },
  content: {
    backgroundColor: "#f5f5f5",
    padding: "0 1em",
    borderRadius: 10,
    display: "flex",
    alignItems: "stretch",
    marginBottom: theme.spacing(1),
  },
  text: {
    flex: 1,
  },
  paragraph: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: 1.3,
    marginBottom: theme.spacing(2.4),
  },
  toolbar: {
    marginLeft: theme.spacing(2),
    visibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));
