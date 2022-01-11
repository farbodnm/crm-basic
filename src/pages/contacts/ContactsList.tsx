import {
  List as RaList,
  ListProps,
  SimpleListLoading,
  ReferenceField,
  TextField,
  useListContext,
  ExportButton,
  SortButton,
  TopToolbar,
  CreateButton,
  Pagination,
  useGetIdentity,
  useTranslate,
} from "react-admin";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Typography,
  Theme,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import Avatar from "./Avatar";
import Status from "../../components/Status";
import TagsList from "./TagsList";
import { ContactsListFilter } from "./ContactsListFilter";
import { Contact } from "../../utils/types";

const ContactListContent = () => {
  const translate = useTranslate();
  const { data, ids, loaded, onToggleItem, selectedIds } =
    useListContext<Contact>();
  const now = Date.now();

  if (loaded === false) {
    return <SimpleListLoading hasLeftAvatarOrIcon hasSecondaryText />;
  }

  return (
    <List>
      {ids.map((id) => {
        const contact = data[id];
        return (
          <ListItem
            button
            key={id}
            component={Link}
            to={`/contacts/${id}/show`}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedIds.includes(id)}
                tabIndex={-1}
                disableRipple
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleItem(id);
                }}
              />
            </ListItemIcon>
            <ListItemAvatar>
              <Avatar record={contact} />
            </ListItemAvatar>
            <ListItemText
              primary={`${contact.first_name} ${contact.last_name}`}
              secondary={
                <>
                  {contact.title} {translate("ra.misc.at")}{" "}
                  {/* <ReferenceField
                    record={contact}
                    source="company_id"
                    reference="companies"
                    basePath="/companies"
                    link={`/company/${contact.company_id}/show`}
                  >
                    <TextField source="name" />
                  </ReferenceField>{" "} */}
                  {contact.nb_notes &&
                    `- ${contact.nb_notes} ${translate("ra.misc.notes")}`}
                  <TagsList record={contact} />
                </>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="body2" color="textSecondary">
                {`${translate("ra.contacts.lastActivity")} `}
                {formatDistance(new Date(contact.last_seen), now)} ago{" "}
                <Status status={contact.status} />
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

const useActionStyles = makeStyles((theme: Theme) => ({
  createButton: {
    marginLeft: theme.spacing(2),
  },
}));
const ContactListActions = () => {
  const translate = useTranslate();
  const classes = useActionStyles();
  return (
    <TopToolbar>
      <SortButton fields={["last_name", "first_name", "last_seen"]} />
      <ExportButton />
      <CreateButton
        basePath="/contacts"
        variant="contained"
        label={translate("ra.contacts.newContact")}
        className={classes.createButton}
      />
    </TopToolbar>
  );
};

export const ContactList = (props: ListProps) => {
  const { identity } = useGetIdentity();
  return identity ? (
    <RaList
      {...props}
      actions={<ContactListActions />}
      aside={<ContactsListFilter />}
      perPage={25}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
      filterDefaultValues={{ sales_id: identity?.id }}
      sort={{ field: "last_seen", order: "DESC" }}
    >
      <ContactListContent />
    </RaList>
  ) : null;
};
