import EntityPage from './EntityPage';

console.log('Users component loaded; endpoint: users');

export default function Users() {
  return <EntityPage title="Users" endpointName="users" />;
}
