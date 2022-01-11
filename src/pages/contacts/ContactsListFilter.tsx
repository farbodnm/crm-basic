import {
  FilterList,
  FilterLiveSearch,
  FilterListItem,
  useGetIdentity,
  useGetList,
  useTranslate,
} from "react-admin";
import { Box, Chip } from "@material-ui/core";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { endOfYesterday, startOfWeek, startOfMonth } from "date-fns";

import Status from "../../components/Status";
import useStyles from "../../styles/contacts/contactsListFilter";

export const ContactsListFilter = () => {
  const classes = useStyles();
  const translate = useTranslate();
  const { identity } = useGetIdentity();
  const { data, ids } = useGetList(
    "tags",
    { page: 1, perPage: 10 },
    { field: "name", order: "ASC" }
  );
  return (
    <Box width="15em" order="-1" marginRight="1em">
      <FilterLiveSearch />
      <FilterList
        label={translate("ra.seenTime.lastSeen")}
        icon={<AccessTimeIcon />}
      >
        <FilterListItem
          label={translate("ra.seenTime.today")}
          value={{
            last_seen_gte: endOfYesterday().toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <FilterListItem
          label={translate("ra.seenTime.thisWeek")}
          value={{
            last_seen_gte: startOfWeek(new Date()).toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <FilterListItem
          label={translate("ra.seenTime.thisMonth")}
          value={{
            last_seen_gte: startOfMonth(new Date()).toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <FilterListItem
          label={translate("ra.seenTime.beforeThisWeek")}
          value={{
            last_seen_gte: undefined,
            last_seen_lte: startOfWeek(new Date()).toISOString(),
          }}
        />
        <FilterListItem
          label={translate("ra.seenTime.beforeThisMonth")}
          value={{
            last_seen_gte: undefined,
            last_seen_lte: startOfMonth(new Date()).toISOString(),
          }}
        />
      </FilterList>
      <FilterList
        label={translate("ra.statuses.status")}
        icon={<TrendingUpIcon />}
      >
        <FilterListItem
          label={
            <>
              {translate("ra.statuses.cold")} <Status status="cold" />
            </>
          }
          value={{
            status: "cold",
          }}
        />
        <FilterListItem
          label={
            <>
              {translate("ra.statuses.warm")} <Status status="warm" />
            </>
          }
          value={{
            status: "warm",
          }}
        />
        <FilterListItem
          label={
            <>
              {translate("ra.statuses.hot")} <Status status="hot" />
            </>
          }
          value={{
            status: "hot",
          }}
        />
        <FilterListItem
          label={
            <>
              {translate("ra.statuses.inContract")}{" "}
              <Status status="in-contract" />
            </>
          }
          value={{
            status: "in-contract",
          }}
        />
      </FilterList>
      <FilterList label={translate("ra.tags.tags")} icon={<LocalOfferIcon />}>
        {ids &&
          data &&
          ids.map((id) => (
            <FilterListItem
              key={id}
              label={
                <Chip
                  label={data[id]?.name}
                  size="small"
                  style={{
                    backgroundColor: data[id]?.color,
                    border: 0,
                    cursor: "pointer",
                  }}
                />
              }
              value={{ tags: [id] }}
            />
          ))}
      </FilterList>
      {/* change here */}
      <FilterList
        label={translate("ra.misc.account")}
        icon={<SupervisorAccountIcon />}
      >
        <FilterListItem
          label="Me"
          value={{ sales_id: identity && identity.id }}
        />
      </FilterList>
    </Box>
  );
};
