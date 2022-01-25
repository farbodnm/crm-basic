import {
  CreateButton,
  ExportButton,
  FilterButton,
  List,
  ListProps,
  SearchInput,
  TopToolbar,
  useGetIdentity,
  useTranslate,
} from "react-admin";
import { Route } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import { DealListContent } from "./DealListContent";
import { DealShow } from "./DealShow";
import { OnlyMineInput } from "./OnlyMineInput";
import { DealEdit } from "./DealEdit";
import { DealCreate } from "./DealCreate";

const dealFilters = [
  <SearchInput source="q" alwaysOn />,
  <OnlyMineInput alwaysOn />,
];

const useActionStyles = makeStyles((theme) => ({
  createButton: {
    marginLeft: theme.spacing(2),
  },
}));
const DealActions = () => {
  const classes = useActionStyles();
  const translate = useTranslate();

  return (
    <TopToolbar>
      <FilterButton />
      <ExportButton />
      <CreateButton
        basePath="/deals"
        variant="contained"
        label={translate("ra.deals.newDeal")}
        className={classes.createButton}
      />
    </TopToolbar>
  );
};

export const DealList = (props: ListProps) => {
  const { identity } = useGetIdentity();
  return identity ? (
    <>
      <List
        {...props}
        perPage={100}
        sort={{ field: "index", order: "ASC" }}
        filterDefaultValues={{ sales_id: identity && identity?.id }}
        filters={dealFilters}
        actions={<DealActions />}
        pagination={false}
      >
        <DealListContent />
      </List>
      <Route path="/deals/create">
        {({ match }) => <DealCreate open={!!match} {...props} />}
      </Route>
      <Route path="/deals/:id/edit">
        {({ match }) => {
          console.log(match?.params?.id);
          return !!match ? (
            <DealEdit open={!!match} id={match?.params?.id} {...props} />
          ) : null;
        }}
      </Route>
      <Route path="/deals/:id/show">
        {({ match }) =>
          !!match ? <DealShow open={!!match} id={match?.params?.id} /> : null
        }
      </Route>
    </>
  ) : null;
};
