import {
  TextField,
  EmailField,
  DateField,
  ReferenceManyField,
  EditButton,
  ShowButton,
  useListContext,
  useTranslate,
} from "react-admin";
import { Box, Typography, Divider, List, ListItem } from "@material-ui/core";

import { TagsListEdit } from "./TagsListEdit";

const TasksIterator = () => {
  const translate = useTranslate();
  const { data, ids, loading } = useListContext();
  if (loading || ids.length === 0) return null;
  return (
    <Box>
      <Typography variant="subtitle2">
        {translate("ra.contacts.tasks")}
      </Typography>
      <Divider />

      <List>
        {ids.map((id) => {
          const task = data[id];
          return (
            <ListItem key={id} disableGutters>
              <Box>
                <Typography variant="body2">{task.text}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {translate("ra.misc.due")}{" "}
                  <DateField source="due_date" record={task} />
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export const ContactAside = ({ record, link = "edit" }: any) => {
  const translate = useTranslate();
  return (
    <Box ml={4} width={250} minWidth={250}>
      <Box textAlign="center" mb={2}>
        {link === "edit" ? (
          <EditButton
            basePath="/contacts"
            record={record}
            label={translate("ra.contacts.editContact")}
          />
        ) : (
          <ShowButton
            basePath="/contacts"
            record={record}
            label={translate("ra.contacts.showContact")}
          />
        )}
      </Box>

      <Typography variant="subtitle2">
        {translate("ra.contacts.personalInfo")}
      </Typography>
      <Divider />

      <Box mt={2}>
        <EmailField source="email" />
      </Box>

      <Box mt={1}>
        <TextField source="phone_number1" />{" "}
        <Typography variant="body2" color="textSecondary" component="span">
          {translate("ra.contacts.work")}
        </Typography>
      </Box>

      <Box mb={1}>
        <TextField source="phone_number2" />{" "}
        <Typography variant="body2" color="textSecondary" component="span">
          {translate("ra.contacts.home")}
        </Typography>
      </Box>

      <Box mb={3}>
        <Typography variant="body2">
          {record.gender === "male"
            ? translate("ra.contacts.male")
            : translate("ra.contacts.female")}
        </Typography>
      </Box>

      <Typography variant="subtitle2">
        {translate("ra.contacts.background")}
      </Typography>
      <Divider />

      <Box mt={2}>{record && record.background}</Box>
      <Box mt={1} mb={3}>
        <Typography component="span" variant="body2" color="textSecondary">
          {translate("ra.contacts.addedOn")}
        </Typography>{" "}
        <DateField
          source="first_seen"
          options={{ year: "numeric", month: "long", day: "numeric" }}
          color="textSecondary"
        />
        <br />
        <Typography component="span" variant="body2" color="textSecondary">
          {translate("ra.seenTime.lastSeen")} {translate("ra.misc.on")}
        </Typography>{" "}
        <DateField
          source="last_seen"
          options={{ year: "numeric", month: "long", day: "numeric" }}
          color="textSecondary"
        />
        <br />
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle2">{translate("ra.tags.tags")}</Typography>
        <Divider />
        <TagsListEdit record={record} />
      </Box>

      <ReferenceManyField
        resource="contacts"
        target="contact_id"
        reference="tasks"
      >
        <TasksIterator />
      </ReferenceManyField>
    </Box>
  );
};
