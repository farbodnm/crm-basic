import {
  Tabs,
  Tab,
  Toolbar,
  AppBar,
  Box,
  Typography,
  ListItem,
} from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import {
  UserMenu,
  Logout,
  LoadingIndicator,
  useTranslate,
  useSetLocale,
} from "react-admin";
import TranslateIcon from "@material-ui/icons/TranslateRounded";

import useStyles from "../styles/components/header";
import { i18nProvider } from "../providers/i18nProvider";

const LangButton = () => {
  const setLocale = useSetLocale();
  const classes = useStyles();

  const handleLanguageChange = () => {
    const newLanguage = i18nProvider.getLocale() === "en" ? "fa" : "en";
    setLocale(newLanguage);
  };

  return (
    <ListItem
      button
      className={classes.dropdownMenu}
      onClick={handleLanguageChange}
      color="inherit"
    >
      <TranslateIcon />
      {i18nProvider.getLocale() === "fa" ? "فارسی" : "English"}
    </ListItem>
  );
};

const Header = () => {
  const classes = useStyles();
  const translate = useTranslate();
  const match = useRouteMatch(["/contacts", "/companies", "/deals"]);
  const currentPath = match?.path ?? "/";

  return (
    <nav dir="rtl" className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box flex={1} display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <img
                className={classes.logo}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                }
                alt="Bosch Logo"
              />
              <Box ml={1}>
                <Typography
                  component="span"
                  variant="h5"
                  className={classes.appName}
                >
                  {translate("ra.misc.crm")}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Tabs
                value={currentPath}
                aria-label="Navigation Tabs"
                indicatorColor="primary"
              >
                <Tab
                  label={translate("ra.contacts.contacts")}
                  component={Link}
                  to="/contacts"
                  value="/contacts"
                  className={classes.tabs}
                />
                <Tab
                  label={translate("ra.companies.companies")}
                  component={Link}
                  to="/companies"
                  value="/companies"
                  className={classes.tabs}
                />
                <Tab
                  label={translate("ra.deals.deals")}
                  component={Link}
                  to="/deals"
                  value="/deals"
                  className={classes.tabs}
                />
              </Tabs>
            </Box>
            <Box display="flex">
              <LoadingIndicator />
              <UserMenu children={<LangButton />} logout={<Logout button />} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Header;
