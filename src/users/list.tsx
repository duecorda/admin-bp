import {
  List,
  Datagrid,
  TextField,
  EmailField,
  TextInput,
} from 'react-admin';
import TruncatedField from '../components/TruncatedField';

const userFilters = [
  <TextInput key="q" label="Search" source="q" alwaysOn />,
  <TextInput key="name" label="Name" source="name" defaultValue="John Doe" />,
  <TextInput key="country" label="Country" source="country" />,
  <TextInput key="status" label="Status" source="status" />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TruncatedField source="name" maxChars="5" />
      <TextField source="country" />
      <EmailField source="email" />
      <TextField source="status" />
    </Datagrid>
  </List>
);