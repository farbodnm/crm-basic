import { Admin, Resource, ListGuesser } from "react-admin";
import {
  createTheme,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";

import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { i18nProvider } from "./providers/i18nProvider";
import Layout from "./Layout";
import contacts from "./pages/contacts";
import companies from "./pages/companies";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: `'Noto Sans Arabic', sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const App = () => (
  <StylesProvider jss={jss}>
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      layout={Layout}
      theme={theme}
    >
      <Resource name="contacts" {...contacts} />
      <Resource name="companies" {...companies} />
      <Resource name="contactNotes" />
      <Resource name="dealNotes" />
      <Resource name="tasks" list={ListGuesser} />
      <Resource name="sales" list={ListGuesser} />
      <Resource name="tags" list={ListGuesser} />
    </Admin>
  </StylesProvider>
);

export default App;
