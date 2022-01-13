import { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useListSortContext, useTranslate } from "react-admin";

const SortButton = ({ fields }: { fields: string[] }) => {
  const { currentSort, setSort } = useListSortContext();
  const translate = useTranslate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("clickity");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeSort = (event: React.MouseEvent<HTMLElement>) => {
    const field: any = event.currentTarget.dataset.sort;
    setSort(
      field,
      field === currentSort.field ? inverseOrder(currentSort.order) : "ASC"
    );
    setAnchorEl(null);
  };

  const buttonLabel = translate("ra.sort.sort_by", {
    field: translate(`ra.contacts.${currentSort.field}`),
    order: translate(`ra.sort.${currentSort.order}`),
  });

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={(e) => handleClick(e)}
        startIcon={<SortIcon />}
        endIcon={<ArrowDropDownIcon />}
        size="small"
      >
        {buttonLabel}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {fields.map((field: any) => (
          <MenuItem
            onClick={(e) => handleChangeSort(e)}
            data-sort={field}
            key={field}
          >
            {translate(`ra.contacts.${field}`)}{" "}
            {translate(
              `ra.sort.${
                currentSort.field === field
                  ? inverseOrder(currentSort.order)
                  : "ASC"
              }`
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");

export default SortButton;
