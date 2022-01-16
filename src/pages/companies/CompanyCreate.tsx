import {
  Create,
  CreateProps,
  ReferenceInput,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useTranslate,
} from "react-admin";
import { Box, CardContent, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BusinessIcon from "@material-ui/icons/Business";
import clsx from "clsx";

import { sectors, sizes } from "./info";

const useStyles = makeStyles({
  inline: {
    display: "inline-block",
    marginLeft: "1em",
    "&.first-child": {
      marginLeft: 0,
    },
  },
});

const CustomLayout = (props: any) => (
  <CardContent>
    <Box display="flex">
      <Box paddingTop={1}>
        <Avatar>
          <BusinessIcon />
        </Avatar>
      </Box>
      <Box ml={2} flex="1" maxWidth={796}>
        {props.children}
      </Box>
    </Box>
  </CardContent>
);

export const CompanyCreate = (props: CreateProps) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <Create {...props} actions={false}>
      <SimpleForm component={CustomLayout} redirect="show">
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
          dir="ltr"
          source="website"
          fullWidth
          helperText={false}
        />
        <TextInput
          variant="standard"
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
          formClassName={clsx(classes.inline, "first-child")}
          helperText={false}
        />
        <ReferenceInput
          source="sales_id"
          reference="sales"
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
    </Create>
  );
};
