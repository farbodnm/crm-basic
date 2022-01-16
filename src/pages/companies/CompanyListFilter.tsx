import {
  FilterList,
  FilterLiveSearch,
  FilterListItem,
  useGetIdentity,
  useTranslate,
} from "react-admin";
import { Box, Paper } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { sectors, sizes } from "./info";

export const CompanyListFilter = () => {
  const { identity } = useGetIdentity();
  const translate = useTranslate();

  return (
    <Box
      component={Paper}
      height="100%"
      width="15em"
      order="-1"
      mr="1em"
      pl={1}
      pb={1}
      pr={1}
    >
      <FilterLiveSearch />
      <FilterList
        label={translate("ra.companies.sizes")}
        icon={<BusinessIcon />}
      >
        {sizes.map((size) => (
          <FilterListItem
            key={size.id}
            label={size.name}
            value={{ size: size.id }}
          />
        ))}
      </FilterList>
      <FilterList
        label={translate("ra.companies.sectors")}
        icon={<LocalShippingIcon />}
      >
        {sectors.map((sector) => (
          <FilterListItem
            key={sector.id}
            label={sector.name}
            value={{ sector: sector.id }}
          />
        ))}
      </FilterList>
      <FilterList
        label={translate("ra.misc.account")}
        icon={<SupervisorAccountIcon />}
      >
        <FilterListItem
          label="Me"
          value={{
            sales_id: identity && identity.id,
          }}
        />
      </FilterList>
    </Box>
  );
};
