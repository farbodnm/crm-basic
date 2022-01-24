import { useListContext } from "react-admin";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Contact } from "../../utils/types";

const useStyles = makeStyles({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "inline-block",
  },
  li: {
    display: "inline",
    "&:after": {
      content: '", "',
    },
    "&:last-child:after": {
      content: '""',
    },
  },
});

export const ContactList = () => {
  const { ids, data, loaded } = useListContext<Contact>();
  const classes = useStyles();
  if (!loaded || !data[ids[0]]) return <div style={{ height: "2em" }} />;
  return (
    <ul className={classes.ul}>
      {ids.map((id) => {
        const contact = data[id];
        return (
          <li key={id} className={classes.li}>
            <Link
              component={RouterLink}
              to={`/contacts/${id}/show`}
              variant="subtitle1"
            >
              {contact.first_name} {contact.last_name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
