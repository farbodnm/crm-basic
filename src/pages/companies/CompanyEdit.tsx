import {
  Edit,
  EditProps,
  ReferenceInput,
  SimpleForm,
  TextInput,
  SelectInput,
  useRecordContext,
  required,
  useTranslate,
} from "react-admin";
import { Box, CardContent } from "@material-ui/core";
import clsx from "clsx";

import { CompanyAside } from "./CompanyAside";
import { LogoField } from "./LogoField";
import { sectors, sizes } from "./info";
import useStyles from "../../styles/companies/companyEdit";

const CustomLayout = (props: any) => {
  const record = useRecordContext(props);
  return (
    <CardContent>
      <Box>
        <LogoField record={record as any} />
        <Box ml={2} flex="1" maxWidth={796}>
          {props.children}
        </Box>
      </Box>
    </CardContent>
  );
};

export const CompanyEdit = (props: EditProps) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <Box width="100%">
      <Edit
        {...props}
        mutationMode="pessimistic"
        aside={<CompanyAside link="show" />}
        actions={false}
      >
        <SimpleForm
          component={CustomLayout}
          className={classes.center}
          redirect="show"
        >
          <TextInput
            variant="standard"
            label={translate("ra.companies.name")}
            source="name"
            validate={required()}
            fullWidth
          />
          <SelectInput
            source="sector"
            label={translate("ra.companies.sector")}
            variant="standard"
            choices={sectors}
            formClassName={clsx(classes.inline, "first-child")}
          />
          <SelectInput
            source="size"
            label={translate("ra.companies.size")}
            variant="standard"
            choices={sizes}
            formClassName={classes.inline}
          />
          <TextInput
            variant="standard"
            label={translate("ra.companies.address")}
            source="address"
            fullWidth
            helperText={false}
          />
          <TextInput
            variant="standard"
            label={translate("ra.companies.city")}
            source="city"
            formClassName={clsx(classes.inline, "first-child")}
          />
          <TextInput
            variant="standard"
            label={translate("ra.companies.postalCode")}
            source="postalcode"
            formClassName={classes.inline}
          />
          <TextInput
            variant="standard"
            label={translate("ra.companies.stateAbbr")}
            source="stateAbbr"
            formClassName={classes.inline}
          />
          <TextInput
            variant="standard"
            label={translate("ra.companies.website")}
            dir="ltr"
            source="website"
            fullWidth
            helperText={false}
          />
          <TextInput
            variant="standard"
            label={translate("ra.companies.linkedIn")}
            dir="ltr"
            source="linkedIn"
            fullWidth
            helperText={false}
          />
          <TextInput
            label={translate("ra.companies.logo")}
            variant="standard"
            source="logo"
            fullWidth
          />
          <TextInput
            source="phone_number"
            label={translate("ra.companies.phoneNumber")}
            variant="standard"
            formClassName={clsx(classes.inline, "first-child")}
            helperText={false}
          />
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
        </SimpleForm>
      </Edit>
    </Box>
  );
};
