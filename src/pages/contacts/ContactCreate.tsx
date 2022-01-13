import {
  CreateBase,
  CreateProps,
  TextInput,
  // ReferenceInput,
  // AutocompleteInput,
  BooleanInput,
  FormWithRedirect,
  Toolbar,
  required,
  useCreateContext,
  useTranslate,
} from "react-admin";
import { Card, CardContent, Divider, Box, Avatar } from "@material-ui/core";

import { Contact } from "../../utils/types";
import useStyles from "../../styles/contacts/contactCreate";

const Spacer = () => <Box width={20} component="span" />;

export const ContactCreate = (props: CreateProps) => (
  <CreateBase
    {...props}
    transform={(data: Contact) => ({
      ...data,
      last_seen: new Date(),
      tags: [],
    })}
  >
    <ContactCreateContent />
  </CreateBase>
);

const Renderer = (formProps: any) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <Card>
      <CardContent>
        <Box>
          <Box className={classes.center} display="flex">
            <Box mr={2}>
              <Avatar />
            </Box>
            <Box flex="1" mt={-1}>
              <Box display="flex">
                <TextInput
                  className={classes.center}
                  label={translate("ra.contacts.first_name")}
                  source="first_name"
                  validate={[required()]}
                />
                <Spacer />
                <TextInput
                  className={classes.center}
                  label={translate("ra.contacts.last_name")}
                  source="last_name"
                  validate={[required()]}
                />
              </Box>
              <Box display="flex">
                <TextInput
                  label={translate("ra.contacts.title")}
                  className={classes.center}
                  source="title"
                />
                <Spacer />
                {/* <ReferenceInput source="company_id" reference="companies">
                <AutocompleteInput optionText="name" />
              </ReferenceInput> */}
              </Box>
              <Divider />
              <Box mt={2} width="100%">
                <TextInput
                  label={translate("ra.contacts.email")}
                  source="email"
                  fullWidth
                />
              </Box>
              <Box display="flex">
                <TextInput
                  label={translate("ra.contacts.phoneNumber")}
                  className={classes.center}
                  source="phone_number1"
                />
                <Spacer />
              </Box>
              <Divider />
              <Box mt={2} width="100%">
                <TextInput
                  label={translate("ra.contacts.background")}
                  source="background"
                  multiline
                  fullWidth
                />
                <TextInput
                  label={translate("ra.contacts.avatar")}
                  source="avatar"
                  fullWidth
                />
                <BooleanInput
                  label={translate("ra.contacts.newsLetter")}
                  dir="ltr"
                  className={classes.centerNewsLetter}
                  source="has_newsletter"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Toolbar {...formProps} />
    </Card>
  );
};

const ContactCreateContent = () => {
  const { save, record } = useCreateContext();
  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <FormWithRedirect
          redirect="show"
          record={record as any}
          save={save}
          render={Renderer}
        />
      </Box>
    </Box>
  );
};
