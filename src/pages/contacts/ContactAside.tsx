import {
  TextField,
  EmailField,
  DateField,
  ReferenceManyField,
  EditButton,
  ShowButton,
  useTranslate,
} from "react-admin";
import { Box, Typography, Divider, Paper } from "@material-ui/core";

import { TagsListEdit } from "./TagsListEdit";
import { i18nProvider } from "../../providers/i18nProvider";
import TasksIterator from "./TasksIterator";

// @TODO color papers for new tasks.

export const ContactAside = ({ record, link = "edit" }: any) => {
  const translate = useTranslate();
  return (
    <Box component={Paper} p={2} ml={2} width={250} minWidth={250}>
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
      <Box
        dir={i18nProvider.getLocale() === "fa" ? "rtl" : "ltr"}
        mt={1}
        mb={3}
      >
        <Typography component="span" variant="body2" color="textSecondary">
          {translate("ra.contacts.addedOn")}
        </Typography>{" "}
        <DateField
          source="first_seen"
          locales="fa-IR"
          options={{ year: "numeric", month: "long", day: "numeric" }}
          color="textSecondary"
        />
        <br />
        <Typography component="span" variant="body2" color="textSecondary">
          {translate("ra.contacts.last_seen")} {translate("ra.misc.on")}
        </Typography>{" "}
        <DateField
          source="last_seen"
          locales="fa-IR"
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
        <TasksIterator record={record} />
      </ReferenceManyField>
    </Box>
  );
};
