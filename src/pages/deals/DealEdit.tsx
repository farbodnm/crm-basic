import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  useRedirect,
  useTranslate,
  useInput,
  InputProps,
  SelectArrayInput,
  FormDataConsumer,
  ReferenceArrayInput,
} from "react-admin";
import { Dialog, DialogContent } from "@material-ui/core";
import moment, { Moment } from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";

import { stageChoices, typeChoices } from "./info";
import useStyles from "../../styles/deals/dealCreate";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const getCurrentDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, -1);
};

const InputDatePicker = (props: InputProps<any>) => {
  const {
    input,
    meta: { touched, error },
  } = useInput(props);

  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <DatePicker
        margin="normal"
        disableToolbar
        variant="inline"
        labelFunc={(date) => (date ? date.format("jYYYY/jMM/jDD") : "")}
        label={props.label}
        error={!!(touched && error)}
        helperText={touched && error}
        {...input}
      />
    </MuiPickersUtilsProvider>
  );
};

export const DealEdit = ({
  open,
  id,
  ...props
}: {
  open: boolean;
  id: any;
}) => {
  const classes = useStyles();
  const redirect = useRedirect();
  const translate = useTranslate();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  const handleDateChange = (moment: Moment | null) => {
    setSelectedDate(moment);
  };

  const handleClose = () => {
    redirect(`/deals/${id}/show`);
  };

  const onSuccess = () => {
    redirect(`/deals/${id}/show`);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Edit
          className={classes.root}
          onSuccess={onSuccess}
          mutationMode="pessimistic"
          id={id}
          {...props}
          transform={(data: any) => ({
            ...data,
            updated_at: getCurrentDate(),
          })}
        >
          <SimpleForm initialValues={{ index: 0 }}>
            <TextInput
              variant="standard"
              source="name"
              label={translate("ra.deals.dealName")}
              fullWidth
              validate={[required()]}
            />
            <TextInput
              variant="standard"
              source="description"
              label={translate("ra.deals.description")}
              multiline
              minRows={3}
              maxRows={10}
              fullWidth
            />
            <ReferenceInput
              variant="standard"
              source="company_id"
              label={translate("ra.deals.company")}
              reference="companies"
              fullWidth
              validate={[required()]}
            >
              <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <FormDataConsumer fullWidth>
              {({ formData, ...rest }) => (
                <ReferenceArrayInput
                  source="contact_ids"
                  reference="contacts"
                  filter={{ company_id: formData.company_id }}
                  label={translate("ra.deals.contacts")}
                  disabled={!formData.company_id}
                  {...rest}
                >
                  <SelectArrayInput
                    optionText={(contacts: any) =>
                      `${contacts.first_name} ${contacts.last_name}`
                    }
                    variant="standard"
                    helperText={false}
                  />
                </ReferenceArrayInput>
              )}
            </FormDataConsumer>
            <SelectInput
              variant="standard"
              source="stage"
              label={translate("ra.deals.stage")}
              choices={stageChoices}
              fullWidth
              validate={[required()]}
            />
            <SelectInput
              variant="standard"
              label={translate("ra.deals.type")}
              source="type"
              choices={typeChoices}
              validate={[required()]}
              fullWidth
            />
            <NumberInput
              variant="standard"
              source="amount"
              label={translate("ra.deals.amount")}
              fullWidth
            />
            <ReferenceInput
              source="sales_id"
              reference="sales"
              variant="standard"
              label={translate("ra.companies.accountManager")}
              helperText={false}
            >
              <SelectInput
                validate={[required()]}
                optionText={(sales: any) =>
                  `${sales.first_name} ${sales.last_name}`
                }
              />
            </ReferenceInput>
            <InputDatePicker
              source="start_at"
              minDateMessage={translate("ra.date.minDateMessage")}
              value={selectedDate}
              label={translate("ra.date.startDate")}
              onChange={(e) => handleDateChange(e)}
            />
          </SimpleForm>
        </Edit>
      </DialogContent>
    </Dialog>
  );
};
