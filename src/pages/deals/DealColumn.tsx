import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Droppable } from "react-beautiful-dnd";
import { Identifier, RecordMap, useTranslate } from "react-admin";

import { DealCard } from "./DealCard";
import { stageNames } from "./info";
import { Deal } from "../../utils/types";

const useStyles = makeStyles({
  root: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 16,
    "&:first-child": {
      paddingLeft: 5,
      borderTopLeftRadius: 5,
    },
    "&:last-child": {
      paddingRight: 5,
      borderTopRightRadius: 5,
    },
  },
  droppable: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    padding: 5,
    "&.isDraggingOver": {
      backgroundColor: "#dadadf",
    },
  },
});

export const DealColumn = ({
  stage,
  dealIds,
  data,
}: {
  stage: string;
  dealIds: Identifier[];
  data: RecordMap<Deal>;
}) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <div className={classes.root}>
      <Typography align="center" variant="subtitle1">
        {/* @ts-ignore */}
        {translate(stageNames[stage])}
      </Typography>
      <Droppable droppableId={stage}>
        {(droppableProvided, snapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={
              classes.droppable +
              (snapshot.isDraggingOver ? " isDraggingOver" : "")
            }
          >
            {dealIds.map((id, index) => (
              <DealCard key={id} index={index} deal={data[id]} />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
