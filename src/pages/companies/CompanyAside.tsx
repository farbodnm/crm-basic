import {
  TextField,
  DateField,
  FunctionField,
  ReferenceField,
  EditButton,
  ShowButton,
  useTranslate,
} from "react-admin";
import { Box, Typography, Divider, Link, Paper } from "@material-ui/core";

import { Company, Sale } from "../../utils/types";
import { i18nProvider } from "../../providers/i18nProvider";

export const CompanyAside = ({
  record,
  link = "edit",
}: {
  record?: Company;
  link?: string;
}) => {
  const translate = useTranslate();

  return record ? (
    <Box
      ml={2}
      component={Paper}
      height="100%"
      p={2}
      width={250}
      minWidth={250}
    >
      <Box textAlign="center" mb={2}>
        {link === "edit" ? (
          <EditButton
            basePath="/companies"
            record={record}
            label={translate("ra.companies.editCompany")}
          />
        ) : (
          <ShowButton
            basePath="/companies"
            record={record}
            label={translate("ra.companies.showCompany")}
          />
        )}
      </Box>
      <Typography
        variant="subtitle2"
        dir={i18nProvider.getLocale() === "fa" ? "rtl" : "ltr"}
      >
        {translate("ra.companies.companyInfo")}
      </Typography>
      <Divider />
      <Box mt={2} dir="ltr">
        Website: <Link href={record.website}>{record.website}</Link>
        <br />
        LinkedIn: <Link href={record.linkedIn}>LinkedIn</Link>
      </Box>
      <Box mt={1} dir={i18nProvider.getLocale() === "fa" ? "rtl" : "ltr"}>
        <TextField source="phone_number" record={record} />{" "}
        <Typography variant="body2" color="textSecondary" component="span">
          {translate("ra.companies.phoneNumber")}
        </Typography>
        <Box mt={1} mb={3}>
          <TextField source="address" />
          <br />
          <TextField source="city" /> <TextField source="postalcode" />{" "}
          <TextField source="stateAbbr" />
        </Box>
        <Typography variant="subtitle2">
          {translate("ra.contacts.background")}
        </Typography>
        <Divider />
        <Box mt={1}>
          <Typography variant="body2" color="textSecondary" component="span">
            {translate("ra.contacts.addedOn")}
          </Typography>{" "}
          <DateField
            source="created_at"
            locales={i18nProvider.getLocale()}
            options={{ year: "numeric", month: "long", day: "numeric" }}
            color="textSecondary"
          />
          <br />
          <Typography component="span" variant="body2" color="textSecondary">
            {translate("ra.companies.followedBy")}
          </Typography>{" "}
          <ReferenceField
            resource="companies"
            source="sales_id"
            reference="sales"
          >
            <FunctionField<Sale>
              source="last_name"
              render={(record) =>
                record ? `${record.first_name} ${record.last_name}` : ""
              }
            />
          </ReferenceField>
        </Box>
      </Box>
    </Box>
  ) : null;
};
