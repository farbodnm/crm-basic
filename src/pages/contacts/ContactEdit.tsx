import {
  EditBase,
  EditProps,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  FormWithRedirect,
  Toolbar,
  useEditContext,
  useTranslate,
} from "react-admin";
import { Card, CardContent, Box } from "@material-ui/core";
import omit from "lodash/omit";

import Avatar from "./Avatar";
import { ContactAside } from "./ContactAside";
import { Contact } from "../../utils/types";
import useStyles from "../../styles/contacts/contactEdit";

const Spacer = () => <Box width={20} component="span" />;

const CustomToolbar = (formProps: any) => (
  <Toolbar
    {...omit(formProps, [
      // FIXME Not super user friendly way to remove warnings
      "dirtyFields",
      "dirtyFieldsSinceLastSubmit",
      "dirtySinceLastSubmit",
      "hasSubmitErrors",
      "hasValidationErrors",
      "initialValues",
      "modifiedSinceLastSubmit",
      "submitError",
      "submitErrors",
      "submitFailed",
      "submitSucceeded",
      "submitting",
      "valid",
    ])}
  />
);

const ContactEditContent = () => {
  const { record, loaded, save } = useEditContext<Contact>();
  const classes = useStyles();
  const translate = useTranslate();

  if (!loaded || !record) return null;
  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <FormWithRedirect
          record={record}
          redirect="show"
          save={save}
          render={(formProps) => (
            <Card className={classes.root}>
              <CardContent>
                <Box>
                  <Box mb={2}>
                    <Avatar record={record} />
                  </Box>
                  <Box flex="1" mt={0}>
                    <Box display="flex">
                      <TextInput
                        className={classes.center}
                        variant="standard"
                        label={translate("ra.contacts.first_name")}
                        source="first_name"
                      />
                      <Spacer />
                      <TextInput
                        className={classes.center}
                        variant="standard"
                        label={translate("ra.contacts.last_name")}
                        source="last_name"
                      />
                    </Box>
                    <Box display="flex">
                      <TextInput
                        variant="standard"
                        label={translate("ra.contacts.title")}
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
                    <Box mt={0} width="100%">
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
                        label={translate("ra.contacts.phoneNumberWork")}
                        variant="standard"
                        className={classes.center}
                        source="phone_number1"
                      />
                      <Spacer />
                      <TextInput
                        label={translate("ra.contacts.phoneNumberPrivate")}
                        className={classes.center}
                        variant="standard"
                        source="phone_number2"
                      />
                    </Box>
                    <Box mt={0}>
                      <TextInput
                        label={translate("ra.contacts.background")}
                        source="background"
                        variant="standard"
                        multiline
                        fullWidth
                      />
                      <TextInput
                        label={translate("ra.contacts.avatar")}
                        variant="standard"
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
              </CardContent>
              <CustomToolbar {...formProps} />
            </Card>
          )}
        />
      </Box>
      <ContactAside record={record} link="show" />
    </Box>
  );
};

export const ContactEdit = (props: EditProps) => (
  <EditBase {...props}>
    <ContactEditContent />
  </EditBase>
);
