import React, { useState } from 'react';
import Contacts from './Contacts';

import normalizeScreenTitle from '../common/normalizeScreenTitle';
import { mockData } from '../../../constants';

const ContactsContainer = () => {
  const [contacts, setContacts] = useState(mockData.contacts);

  return <Contacts contacts={contacts} />;
};

ContactsContainer.navigationOptions = ({ navigation }) => ({
  tabBarLabel: normalizeScreenTitle(navigation.state.routeName)
});

export default ContactsContainer;
