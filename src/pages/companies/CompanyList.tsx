import {
  List,
  ListProps,
  TopToolbar,
  ExportButton,
  CreateButton,
  Pagination,
  useGetIdentity,
  useTranslate,
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";

import { GridList } from "./GridList";
import { CompanyListFilter } from "./CompanyListFilter";

const useActionStyles = makeStyles((theme) => ({
  createButton: {
    marginLeft: theme.spacing(2),
  },
}));

const CompanyListActions = (props: any) => {
  const classes = useActionStyles();
  const translate = useTranslate();

  return (
    <TopToolbar>
      <ExportButton />
      <CreateButton
        basePath="/companies"
        variant="contained"
        label={translate("ra.companies.newCompany")}
        className={classes.createButton}
      />
    </TopToolbar>
  );
};

export const CompanyList = (props: ListProps) => {
  const { identity } = useGetIdentity();
  return identity ? (
    <List
      {...props}
      actions={<CompanyListActions />}
      aside={<CompanyListFilter />}
      filterDefaultValues={{ sales_id: identity?.id }}
      pagination={<Pagination rowsPerPageOptions={[15, 25, 50, 100]} />}
      perPage={15}
      sort={{ field: "name", order: "ASC" }}
    >
      <GridList />
    </List>
  ) : null;
};
