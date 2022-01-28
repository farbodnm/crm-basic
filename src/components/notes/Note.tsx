import { useState, FormEvent, ChangeEvent } from "react";
import {
  TextField,
  ReferenceField,
  DateField,
  useResourceContext,
  useDelete,
  useUpdate,
  useNotify,
  useRecordContext,
  useTranslate,
  useRefresh,
} from "react-admin";
import {
  Typography,
  Tooltip,
  IconButton,
  TextField as TextFieldMui,
  Button,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";

import Status from "../Status";
import useStyles from "../../styles/components/notes/note";

export const Note = ({
  showStatus,
  note,
  reference,
}: {
  showStatus?: boolean;
  note: any;
  reference: string;
}) => {
  const [isHover, setHover] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [noteText, setNoteText] = useState(note.text);
  const resource = useResourceContext();
  const record = useRecordContext();
  const notify = useNotify();
  const classes = useStyles();
  const translate = useTranslate();
  const refresh = useRefresh();
  const [update, { loading }] = useUpdate();

  const [handleDelete] = useDelete(resource, note.id, note, {
    mutationMode: "undoable",
    onSuccess: () => {
      notify(translate("ra.notes.noteDeleted"), {
        type: "info",
        undoable: true,
      });
      update(reference, record.id, { nb_notes: record.nb_notes - 1 }, record);
      refresh();
    },
  });

  const handleEnterEditMode = () => {
    setEditing(true);
    setNoteText(note.text);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setNoteText(note.text);
    setHover(false);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const handleNoteUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    update(resource, note.id, { text: noteText }, note, {
      onSuccess: () => {
        setEditing(false);
        setHover(false);
        setNoteText(noteText);
        refresh();
      },
    });
  };

  return (
    <Box
      className={classes.root}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box position="relative" className={classes.metadata}>
        <Box
          display="flex"
          position="absolute"
          right={0}
          style={{ visibility: isHover && !isEditing ? "visible" : "hidden" }}
        >
          <Tooltip title={translate("ra.notes.editNote")}>
            <IconButton
              className={isHover ? classes.iconEdit : ""}
              size="small"
              onClick={handleEnterEditMode}
            >
              <EditIcon style={{ fill: "#1976d2" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={translate("ra.notes.deleteNote")}>
            <IconButton
              className={isHover ? classes.iconDelete : ""}
              size="small"
              onClick={handleDelete}
            >
              <DeleteIcon style={{ fill: "#DC143C" }} />
            </IconButton>
          </Tooltip>
        </Box>
        {showStatus && <Status status={note.status} />}{" "}
        <ReferenceField
          record={note}
          resource="contactNotes"
          source="sales_id"
          reference="sales"
          basePath="/contactNotes"
        >
          <TextField source="first_name" variant="body1" />
        </ReferenceField>{" "}
        <Typography component="span" variant="body1">
          {translate("ra.notes.addedaNoteOn")}{" "}
        </Typography>
        <DateField
          source="date"
          record={note}
          variant="body1"
          showTime
          locales="fa-IR"
          options={{
            dateStyle: "full",
            timeStyle: "short",
          }}
        />
      </Box>
      {isEditing ? (
        <form onSubmit={handleNoteUpdate}>
          <TextFieldMui
            value={noteText}
            onChange={handleTextChange}
            fullWidth
            multiline
            className={classes.textarea}
          />
          <Box className={classes.buttons}>
            <Button
              className={classes.cancel}
              onClick={handleCancelEdit}
              color="primary"
            >
              {translate("ra.action.cancel")}
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              disabled={loading}
            >
              {translate("ra.notes.updateNote")}
            </Button>
          </Box>
        </form>
      ) : (
        <Box className={classes.content}>
          <Box className={classes.text}>
            {note.text.split("\n").map((paragraph: string, index: number) => (
              <p className={classes.paragraph} key={index}>
                {paragraph}
              </p>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
