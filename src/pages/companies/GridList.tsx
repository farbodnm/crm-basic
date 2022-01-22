import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useListContext, Identifier } from "react-admin";

import { CompanyCard } from "./CompanyCard";
import { Company } from "../../utils/types";

const useStyles = makeStyles((theme) => ({
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    width: 1008,
    gap: "10px",
    paddingTop: 10,
    paddingBottom: 10,
  },
  paper: {
    height: 200,
    width: 329.3,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.grey[200],
  },
}));

const times = (nbChildren: number, fn: (key: number) => any) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
  const classes = useStyles();
  return (
    <Box className={classes.gridList}>
      {times(15, (key) => (
        <Paper className={classes.paper} key={key} />
      ))}
    </Box>
  );
};

const LoadedGridList = () => {
  const { ids, data } = useListContext<Company>();
  const classes = useStyles();

  if (!ids || !data) return null;

  return (
    <Box className={classes.gridList}>
      {ids.map((id: Identifier) => (
        <CompanyCard key={id} record={data[id]} />
      ))}
    </Box>
  );
};

export const GridList = () => {
  const { loaded } = useListContext();
  return loaded ? <LoadedGridList /> : <LoadingGridList />;
};
