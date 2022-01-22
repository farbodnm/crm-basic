import {
  CreateBase,
  CreateProps,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  FormWithRedirect,
  Toolbar,
  required,
  useCreateContext,
  useTranslate,
  SelectInput,
} from "react-admin";
import { Card, CardContent, Box, Avatar } from "@material-ui/core";

import { Contact } from "../../utils/types";
import useStyles from "../../styles/contacts/contactCreate";

const Spacer = () => <Box width={20} component="span" />;

const getCurrentDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, -1);
};

export const ContactCreate = (props: CreateProps) => (
  <CreateBase
    {...props}
    transform={(data: Contact) => ({
      ...data,
      first_seen: getCurrentDate(),
      last_seen: getCurrentDate(),
      nb_notes: 0,
      gender: "مرد",
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
    <Card className={classes.center}>
      <CardContent>
        <Box>
          <Box mb={2}>
            <Avatar />
          </Box>
          <Box flex="1">
            <Box display="flex">
              <TextInput
                className={classes.center}
                variant="standard"
                label={translate("ra.contacts.first_name")}
                source="first_name"
                validate={[required()]}
              />
              <Spacer />
              <TextInput
                className={classes.center}
                variant="standard"
                label={translate("ra.contacts.last_name")}
                source="last_name"
                validate={[required()]}
              />
            </Box>
            <Box display="flex">
              <TextInput
                label={translate("ra.contacts.title")}
                variant="standard"
                className={classes.center}
                source="title"
              />
              <Spacer />
              <ReferenceInput
                variant="standard"
                fullWidth
                className={classes.centerReference}
                label={translate("ra.contacts.company")}
                source="company_id"
                reference="companies"
              >
                <AutocompleteInput optionText="name" />
              </ReferenceInput>
            </Box>
            <Box width="100%">
              <TextInput
                dir="ltr"
                variant="standard"
                label={translate("ra.contacts.email")}
                source="email"
                fullWidth
              />
            </Box>
            <Box display="flex">
              <TextInput
                variant="standard"
                label={translate("ra.contacts.phoneNumberWork")}
                className={classes.center}
                source="phone_number1"
              />
              <Spacer />
              <TextInput
                variant="standard"
                label={translate("ra.contacts.phoneNumberPrivate")}
                className={classes.center}
                source="phone_number2"
              />
            </Box>
            <Box width="100%">
              <TextInput
                variant="standard"
                label={translate("ra.contacts.background")}
                source="background"
                multiline
                fullWidth
              />
              <TextInput
                variant="standard"
                label={translate("ra.contacts.avatar")}
                source="avatar"
                fullWidth
              />
              <Box display="flex" position="relative">
                <ReferenceInput
                  source="sales_id"
                  reference="sales"
                  variant="standard"
                  label={translate("ra.companies.accountManager")}
                  formClassName={classes.inline}
                  helperText={false}
                >
                  <SelectInput
                    optionText={(sales: any) =>
                      `${sales.first_name} ${sales.last_name}`
                    }
                  />
                </ReferenceInput>
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
