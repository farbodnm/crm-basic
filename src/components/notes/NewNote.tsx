import { useState, FormEvent } from "react";
import {
  useRecordContext,
  useCreate,
  useUpdate,
  useRefresh,
  useNotify,
  useGetIdentity,
  Identifier,
  useTranslate,
  useResourceContext,
} from "react-admin";
import { TextField as TextInput, Button, Box } from "@material-ui/core";

import { StatusSelector } from "./StatusSelector";
import useStyles from "../../styles/components/notes/newNote";

const getCurrentDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, -1);
};

export const NewNote = ({
  showStatus,
  reference,
}: {
  showStatus?: boolean;
  reference: "contacts" | "deals";
}) => {
  const classes = useStyles();
  const translate = useTranslate();
  const record = useRecordContext();
  const resource = useResourceContext();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("cold");
  const [create, { loading }] = useCreate();
  const [update] = useUpdate();
  const refresh = useRefresh();
  const notify = useNotify();
  const { identity } = useGetIdentity();

  const foreignKeyMapping = {
    contacts: "contact_id",
    deals: "deal_id",
  };

  if (!identity) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: any = {
      [foreignKeyMapping[reference]]: record.id,
      sales_id: identity.id,
      date: getCurrentDate(),
      text,
    };
    if (showStatus) {
      data.status = status;
    }
    update(
      reference,
      (record && record.id) as unknown as Identifier,
      {
        last_seen: getCurrentDate(),
        status,
        nb_notes: record.nb_notes + 1,
      },
      record
    );
    create(resource, data, {
      onSuccess: () => {
        setText("");
        notify(translate("ra.notes.noteAddedSuccessfuly"));
        refresh();
      },
    });
    return false;
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label={translate("ra.notes.addANote")}
          size="small"
          fullWidth
          multiline
          value={text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setText(event.target.value)
          }
          rows={3}
          maxRows={10}
        />
        <Box className={classes.toolbar}>
          <span>
            {showStatus && (
              <StatusSelector
                status={status}
                setStatus={setStatus}
                className={classes.small}
                disabled={!text}
              />
            )}
          </span>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            disabled={!text || loading}
          >
            {translate("ra.notes.addThisNote")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
