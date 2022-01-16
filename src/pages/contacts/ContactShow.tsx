import {
  ReferenceManyField,
  ShowBase,
  ShowProps,
  TextField,
  ReferenceField,
  useShowContext,
  useTranslate,
} from "react-admin";
import { Box, Card, CardContent, Typography } from "@material-ui/core";

import Avatar from "./Avatar";
import { ContactAside } from "./ContactAside";
import { LogoField } from "../companies/LogoField";
import { NotesIterator } from "../../components/notes/NotesIterator";
import { Contact } from "../../utils/types";

const ContactShowContent = () => {
  const { record, loaded } = useShowContext<Contact>();
  const translate = useTranslate();
  if (!loaded || !record) return null;
  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <Card>
          <CardContent>
            <Box display="flex">
              <Avatar record={record} />
              <Box ml={2} flex="1">
                <Typography variant="h5">
                  {record.first_name} {record.last_name}
                </Typography>
                <Typography variant="body2">
                  {record.title} {translate("ra.misc.at")}{" "}
                  <ReferenceField
                    source="company_id"
                    reference="companies"
                    link="show"
                  >
                    <TextField source="name" />
                  </ReferenceField>
                </Typography>
              </Box>
              <Box>
                <ReferenceField
                  source="company_id"
                  reference="companies"
                  link="show"
                >
                  <LogoField />
                </ReferenceField>
              </Box>
            </Box>
            <ReferenceManyField
              target="contact_id"
              reference="contactNotes"
              sort={{ field: "date", order: "DESC" }}
            >
              <NotesIterator showStatus reference="contacts" />
            </ReferenceManyField>
          </CardContent>
        </Card>
      </Box>
      <ContactAside record={record} />
    </Box>
  );
};

export const ContactShow = (props: ShowProps) => (
  <ShowBase {...props}>
    <ContactShowContent />
  </ShowBase>
);
