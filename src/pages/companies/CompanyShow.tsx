import { useState, ChangeEvent } from "react";
import {
  ShowBase,
  ShowProps,
  TextField,
  ReferenceManyField,
  SelectField,
  useShowContext,
  // useRecordContext,
  useListContext,
  useTranslate,
} from "react-admin";
import {
  Box,
  // Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link as RouterLink } from "react-router-dom";
import { formatDistance } from "date-fns-jalali";
import { faIR, enUS } from "date-fns/locale";

import Avatar from "../contacts/Avatar";
import Status from "../../components/Status";
import TagsList from "../contacts/TagsList";
import { sizes } from "./info";
import { LogoField } from "./LogoField";
import { CompanyAside } from "./CompanyAside";
import {
  Company,
  //  Deal,
  Contact,
} from "../../utils/types";
import { i18nProvider } from "../../providers/i18nProvider";
// import { stageNames } from "../deals/stages";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

const ContactsIterator = () => {
  const { data, ids, loaded } = useListContext<Contact>();
  // const record = useRecordContext();
  const translate = useTranslate();
  const now = Date.now();

  if (!loaded) return null;
  return (
    <Box>
      <List>
        {ids.map((id) => {
          const contact = data[id];
          return (
            <ListItem
              button
              key={id}
              component={RouterLink}
              to={`/contacts/${id}/show`}
            >
              <ListItemAvatar>
                <Avatar record={contact} />
              </ListItemAvatar>
              <ListItemText
                primary={`${contact.first_name} ${contact.last_name}`}
                secondary={
                  <>
                    {contact.title} <TagsList record={contact} />
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                >
                  {`${translate("ra.contacts.last_seen")} `}
                  {formatDistance(new Date(contact.last_seen), now, {
                    locale: i18nProvider.getLocale() === "fa" ? faIR : enUS,
                  })}{" "}
                  {translate("ra.misc.ago")} <Status status={contact.status} />
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

// const CreateRelatedContactButton = ({ record }: any) => {
//   const translate = useTranslate();

//   return (
//     <Button
//       component={RouterLink}
//       to={{
//         pathname: "/contacts/create",
//         state: { record: { company_id: record.id } },
//       }}
//       color="primary"
//       variant="contained"
//       size="small"
//       startIcon={<PersonAddIcon />}
//     >
//       {translate("ra.copmanies.addContact")}
//     </Button>
//   );
// };

// const DealsIterator = () => {
//   const { data, ids, loaded } = useListContext<Deal>();
//   const translate = useTranslate();
//   const now = Date.now();

//   if (!loaded) return null;
//   return (
//     <Box>
//       <List>
//         {ids.map((id) => {
//           const deal = data[id];
//           return (
//             <ListItem
//               button
//               key={id}
//               component={RouterLink}
//               to={`/deals/${id}/show`}
//             >
//               <ListItemText
//                 primary={deal.name}
//                 secondary={
//                   <>
//                     {/* @ts-ignore */}
//                     {stageNames[deal.stage]},{" "}
//                     {deal.amount.toLocaleString("fa-IR", {
//                       notation: "compact",
//                       style: "currency",
//                       currency: "IRR",
//                       currencyDisplay: "narrowSymbol",
//                       minimumSignificantDigits: 3,
//                     })}
//                     , {deal.type}
//                   </>
//                 }
//               />
//               <ListItemSecondaryAction>
//                 <Typography
//                   variant="body2"
//                   color="textSecondary"
//                   component="span"
//                 >
//                   {`${translate("ra.contacts.last_seen")} `}
//                   {formatDistance(new Date(deal.updated_at), now, {
//                     locale: i18nProvider.getLocale() === "fa" ? faIR : enUS,
//                   })}{" "}
//                   {translate("ra.misc.ago")}{" "}
//                 </Typography>
//               </ListItemSecondaryAction>
//             </ListItem>
//           );
//         })}
//       </List>
//     </Box>
//   );
// };

const CompanyShowContent = () => {
  const { record, loaded } = useShowContext<Company>();
  const [value, setValue] = useState(0);
  const translate = useTranslate();

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!loaded || !record) return null;
  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <Card>
          <CardContent>
            <Box display="flex" mb={1}>
              <LogoField record={record as any} />
              <Box ml={2} flex="1">
                <Typography variant="h5">{record.name}</Typography>
                <Typography variant="body2">
                  <TextField source="sector" />,{" "}
                  <SelectField source="size" choices={sizes} />
                </Typography>
              </Box>
            </Box>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              centered
            >
              {record.nb_contacts && (
                <Tab
                  label={
                    record.nb_contacts === 1
                      ? `1 ${translate("ra.companies.contact")}`
                      : `${record.nb_contacts} ${translate(
                          "ra.companies.contacts"
                        )}`
                  }
                />
              )}
              {record.nb_deals && (
                <Tab
                  label={
                    record.nb_deals === 1
                      ? `1 ${translate("ra.companies.deal")}`
                      : `${record.nb_deals} ${translate("ra.companies.deals")}`
                  }
                />
              )}
            </Tabs>
            <Divider />
            <TabPanel value={value} index={0}>
              <ReferenceManyField
                reference="contacts"
                target="company_id"
                sort={{ field: "last_name", order: "ASC" }}
              >
                <ContactsIterator />
              </ReferenceManyField>
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
              <ReferenceManyField
                reference="deals"
                target="company_id"
                sort={{ field: "name", order: "ASC" }}
              >
                <DealsIterator />
              </ReferenceManyField>
            </TabPanel> */}
          </CardContent>
        </Card>
      </Box>
      <CompanyAside record={record} />
    </Box>
  );
};

export const CompanyShow = (props: ShowProps) => (
  <ShowBase {...props}>
    <CompanyShowContent />
  </ShowBase>
);
