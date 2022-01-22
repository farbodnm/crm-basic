import { Box, Typography, Link as LinkMui } from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/AccountCircle";
import DealIcon from "@material-ui/icons/MonetizationOn";
import { linkToRecord, SelectField, useTranslate } from "react-admin";
import { Link } from "react-router-dom";

import { sectors } from "./info";
import { CompanyAvatar } from "./CompanyAvatar";
import { Company } from "../../utils/types";
import useStyles from "../../styles/companies/companyCard";

export const CompanyCard = ({ record }: { record: Company }) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <LinkMui
      component={Link}
      to={linkToRecord("/companies", record.id, "show")}
      underline="none"
    >
      <Box className={classes.paper}>
        <div className={classes.identity}>
          <CompanyAvatar record={record} />
          <div className={classes.name}>
            <Typography variant="subtitle2">{record.name}</Typography>
            <SelectField
              color="textSecondary"
              source="sector"
              choices={sectors}
              record={record}
            />
          </div>
        </div>
        <div className={classes.stats}>
          <div className={classes.singleStat}>
            <ContactsIcon color="disabled" className={classes.statIcon} />
            <div>
              <Typography variant="subtitle2" style={{ marginBottom: -8 }}>
                {record.nb_contacts}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {record.nb_contacts > 1
                  ? translate("ra.companies.contacts")
                  : translate("ra.companies.contact")}
              </Typography>
            </div>
          </div>
          <div className={classes.singleStat}>
            <DealIcon color="disabled" className={classes.statIcon} />
            <div>
              <Typography variant="subtitle2" style={{ marginBottom: -8 }}>
                {record.nb_deals}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {record.nb_deals > 1
                  ? translate("ra.companies.deals")
                  : translate("ra.companies.deal")}
              </Typography>
            </div>
          </div>
        </div>
      </Box>
    </LinkMui>
  );
};
