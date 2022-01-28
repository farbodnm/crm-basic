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
  SelectInput,
  DeleteButton,
  SaveButton,
  useUpdate,
  useRecordContext,
  useGetOne,
  useRedirect,
} from "react-admin";
import { Card, CardContent, Box } from "@material-ui/core";
import omit from "lodash/omit";

import Avatar from "./Avatar";
import { ContactAside } from "./ContactAside";
import { Contact } from "../../utils/types";
import useStyles from "../../styles/contacts/contactEdit";

const Spacer = () => <Box width={20} component="span" />;

const CustomToolbar = (formProps: any) => {
  const [update] = useUpdate();
  const record = useRecordContext();
  const redirect = useRedirect();
  const { data } = useGetOne("companies", record.company_id);

  const handleDelete = () => {
    update("companies", record.company_id, {
      nb_contacts: data?.nb_contacts - 1,
    });
    redirect("/contacts");
  };

  return (
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
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <SaveButton />
      <DeleteButton mutationMode="pessimistic" onSuccess={handleDelete} />
    </Toolbar>
  );
};

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
                    <SelectInput
                      style={{ width: "48%", margin: "0 auto" }}
                      variant="standard"
                      source="gender"
                      label={translate("ra.contacts.gender")}
                      choices={[
                        { id: "مرد", name: "مرد" },
                        { id: "زن", name: "زن" },
                      ]}
                    />
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
