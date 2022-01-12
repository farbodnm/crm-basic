import {
  Tabs,
  Tab,
  Toolbar,
  AppBar,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import {
  UserMenu,
  Logout,
  LoadingIndicator,
  useTranslate,
  useSetLocale,
} from "react-admin";

import useStyles from "../styles/components/header";
import { i18nProvider } from "../providers/i18nProvider";

const Header = () => {
  const classes = useStyles();
  const translate = useTranslate();
  const match = useRouteMatch(["/contacts"]);
  const currentPath = match?.path ?? "/";
  const setLocale = useSetLocale();

  const handleLanguageChange = () => {
    const newLanguage = i18nProvider.getLocale() === "en" ? "fa" : "en";
    setLocale(newLanguage);
  };

  return (
    <nav className={classes.root}>
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
              <Typography
                component="span"
                variant="h5"
                className={classes.appName}
              >
                {translate("ra.misc.crm")}
              </Typography>
            </Box>
            <Box>
              <Tabs
                value={currentPath}
                aria-label="Navigation Tabs"
                indicatorColor="primary"
              >
                <Tab
                  label={translate("ra.misc.dashboard")}
                  component={Link}
                  to="/"
                  value="/"
                  disabled
                />
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
                  disabled
                />
              </Tabs>
            </Box>
            <Box display="flex">
              <IconButton onClick={handleLanguageChange} color="inherit">
                {i18nProvider.getLocale()}
              </IconButton>
              <LoadingIndicator />
              <UserMenu logout={<Logout button />} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Header;
