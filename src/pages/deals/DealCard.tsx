import { ReferenceField, useRedirect, useTranslate } from "react-admin";
import { Card, Typography, Box } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

import { Deal } from "../../utils/types";
import { LogoField } from "../companies/LogoField";
import useStyles from "../../styles/deals/dealCard";
import { i18nProvider } from "../../providers/i18nProvider";

export const DealCard = ({ deal, index }: { deal: Deal; index: number }) => {
  const classes = useStyles();
  const redirect = useRedirect();
  const translate = useTranslate();

  if (!deal) return null;
  const handleClick = () => {
    redirect(`/deals/${deal.id}/show`);
  };

  return (
    <Draggable draggableId={String(deal.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleClick}
        >
          <Card
            style={{
              opacity: snapshot.isDragging ? 0.5 : 1,
            }}
            elevation={snapshot.isDragging ? 3 : 0}
          >
            <div className={classes.cardContent}>
              <Box display="flex">
                <ReferenceField
                  source="company_id"
                  record={deal}
                  reference="companies"
                  resource="deals"
                  basePath="/deals"
                  link="show"
                  className={classes.logoField}
                >
                  <LogoField size="small" />
                </ReferenceField>
                <Typography
                  className={classes.dealName}
                  variant="body2"
                  gutterBottom
                >
                  {deal.name}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" color="textSecondary">
                  {deal.amount.toLocaleString(
                    i18nProvider.getLocale() === "fa" ? "fa-IR" : "en-US",
                    {
                      notation: "compact",
                      style: "currency",
                      currency: "IRR",
                      currencyDisplay: "narrowSymbol",
                      minimumSignificantDigits: 3,
                    }
                  )}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {translate(deal.type)}
                </Typography>
              </Box>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
