import { Friends, Contacts, Facebook } from '../../screens/Friends';
import { friends } from '../../constants/screens';

const routes = {
  [friends.facebook]: Facebook,
  [friends.friends]: Friends,
  [friends.contacts]: Contacts
};

export default routes;
