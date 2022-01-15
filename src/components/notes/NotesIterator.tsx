import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";

import { Note } from "./Note";
import { NewNote } from "./NewNote";

const useStyles = makeStyles({
  root: {
    marginTop: "0.5em",
  },
});

export const NotesIterator = ({
  showStatus,
  reference,
}: {
  showStatus?: boolean;
  reference: "contacts" | "deals";
}) => {
  const classes = useStyles();
  const { data, ids, loaded } = useListContext();
  if (!loaded) return null;
  return (
    <>
      <NewNote showStatus={showStatus} reference={reference} />
      <div className={classes.root}>
        {ids.map((id, index) => (
          <Note
            note={data[id]}
            showStatus={showStatus}
            reference={reference}
            key={index}
          />
        ))}
      </div>
    </>
  );
};
