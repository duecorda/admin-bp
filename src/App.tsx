import {
  Admin,
  Resource,
} from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { UserList } from "./users/list";
import { UserShow } from "./users/show";
import { createTheme } from '@mui/material/styles';
import './styles/fonts.scss';

const BpTheme = createTheme({
  typography: {
    fontFamily: 'Pretendard Variable, sans-serif',
  },
})

export const App = () => (
  <Admin
    theme={BpTheme}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="users" list={UserList} show={UserShow} />
  </Admin>
);
