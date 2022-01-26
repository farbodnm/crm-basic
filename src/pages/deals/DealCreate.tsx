import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  useRedirect,
  useDataProvider,
  useTranslate,
  useInput,
  InputProps,
  SelectArrayInput,
  FormDataConsumer,
  ReferenceArrayInput,
  CreateProps,
} from "react-admin";
import moment, { Moment } from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";

import { stageChoices, typeChoices } from "./info";
import { Deal } from "../../utils/types";
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

export const DealCreate = (props: CreateProps) => {
  const classes = useStyles();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  const handleDateChange = (moment: Moment | null) => {
    setSelectedDate(moment);
  };

  const onSuccess = ({ data: deal }: { data: Deal }) => {
    redirect("/deals");
    dataProvider
      .getList("deals", {
        pagination: { page: 1, perPage: 50 },
        sort: { field: "id", order: "ASC" },
        filter: { stage: deal.stage },
      })
      .then(({ data: deals }) =>
        Promise.all(
          deals
            .filter((oldDeal) => oldDeal.id !== deal.id)
            .map((oldDeal) =>
              dataProvider.update("deals", {
                id: oldDeal.id,
                data: { index: oldDeal.index + 1 },
                previousData: oldDeal,
              })
            )
        )
      );
  };

  return (
    <Create
      className={classes.root}
      onSuccess={onSuccess}
      {...props}
      transform={(data: any) => ({
        ...data,
        created_at: getCurrentDate(),
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
    </Create>
  );
};
