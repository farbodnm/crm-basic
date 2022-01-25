import {
  ShowBase,
  TextField,
  ReferenceField,
  ReferenceManyField,
  ReferenceArrayField,
  useRecordContext,
  useRedirect,
  Identifier,
  useTranslate,
} from "react-admin";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns-jalali";

import { CompanyAvatar } from "../companies/CompanyAvatar";
import { NotesIterator } from "../../components/notes/NotesIterator";
import { ContactList } from "./ContactList";
import { stageNames } from "./info";

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    top: 50,
  },
});

const DealShowContent = () => {
  const record = useRecordContext();
  const translate = useTranslate();

  if (!record) return null;
  console.log(record);
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="rows">
          <Box
            width={100}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <ReferenceField
              source="company_id"
              reference="companies"
              link="show"
            >
              <CompanyAvatar />
            </ReferenceField>
            <ReferenceField
              source="company_id"
              reference="companies"
              link="show"
            >
              <TextField source="name" align="center" component="div" />
            </ReferenceField>
          </Box>

          <Box display="flex" flexDirection="column" ml={2}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h5">{record.name}</Typography>

              <Box display="flex" mt={2}>
                <Box display="flex" mr={5} flexDirection="column">
                  <Typography color="textSecondary" variant="body2">
                    {translate("ra.deals.start")}
                  </Typography>
                  <Typography variant="subtitle1">
                    {format(new Date(record.start_at), "yyyy MMMM d")}
                  </Typography>
                </Box>

                <Box display="flex" mr={5} flexDirection="column">
                  <Typography color="textSecondary" variant="body2">
                    {translate("ra.deals.budget")}
                  </Typography>
                  <Typography variant="subtitle1">
                    {record.amount.toLocaleString("fa-IR", {
                      notation: "compact",
                      style: "currency",
                      currency: "IRR",
                      currencyDisplay: "narrowSymbol",
                      minimumSignificantDigits: 3,
                    })}
                  </Typography>
                </Box>

                <Box display="flex" mr={5} flexDirection="column">
                  <Typography color="textSecondary" variant="body2">
                    {translate("ra.deals.type")}
                  </Typography>
                  <Typography variant="subtitle1">
                    {translate(record.type)}
                  </Typography>
                </Box>

                <Box display="flex" mr={5} flexDirection="column">
                  <Typography color="textSecondary" variant="body2">
                    {translate("ra.deals.stage")}
                  </Typography>
                  <Typography variant="subtitle1">
                    {/* @ts-ignore */}
                    {translate(stageNames[record.stage])}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box mt={2} mb={2}>
              <Box display="flex" mr={5} flexDirection="column" minHeight={48}>
                <Typography color="textSecondary" variant="body2">
                  {translate("ra.deals.contacts")}
                </Typography>
                <ReferenceArrayField source="contact_ids" reference="contacts">
                  <ContactList />
                </ReferenceArrayField>
              </Box>
            </Box>

            <Box mt={0} mb={2} style={{ whiteSpace: "pre-line" }}>
              <Typography color="textSecondary" variant="body2">
                {translate("ra.deals.description")}
              </Typography>
              <Typography>{record.description}</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box mt={-1}>
          <ReferenceManyField
            target="deal_id"
            reference="dealNotes"
            sort={{ field: "date", order: "DESC" }}
          >
            <NotesIterator reference="deals" />
          </ReferenceManyField>
        </Box>
      </Box>
    </>
  );
};

export const DealShow = ({ open, id }: { open: boolean; id: Identifier }) => {
  const redirect = useRedirect();
  const classes = useStyles();

  const handleClose = () => {
    redirect("/deals");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      classes={{ paper: classes.dialog }}
    >
      <DialogContent>
        <ShowBase resource="deals" basePath="/deals" id={id}>
          <DealShowContent />
        </ShowBase>
      </DialogContent>
    </Dialog>
  );
};
