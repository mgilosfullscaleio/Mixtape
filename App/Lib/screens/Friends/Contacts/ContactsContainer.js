import React, { useState } from 'react';
import Contacts from './Contacts';

import normalizeScreenTitle from '../common/normalizeScreenTitle';
import { mockData } from '../../../constants';
import { friendsUtils, arrayUtils } from '../../../utils';

const normalizeForSectionList = list => {
  return Object.entries(list).map(([title, data]) => ({
    title,
    data
  }));
};

const ContactsContainer = () => {
  const [contacts, setContacts] = useState(mockData.contacts);
  const [isEnabled, setEnabled] = useState(false);

  const handleMarkContact = ({ marked = false }, index, sectionKey) => {
    const data = [...contacts[sectionKey]];
    data[index].marked = !marked;
    contacts[sectionKey] = data;

    setContacts({ ...contacts });
  };

  const handleEnable = () => setEnabled(true);

  const normalizedContacts = normalizeForSectionList(contacts);
  const markedContacts = friendsUtils.countMarked(
    arrayUtils.mergeArrays(Object.values(contacts))
  );

  return (
    <Contacts
      contacts={normalizedContacts}
      isEnabled={isEnabled}
      markedContacts={markedContacts}
      onMarkContact={handleMarkContact}
      onEnable={handleEnable}
    />
  );
};

ContactsContainer.navigationOptions = ({ navigation }) => ({
  tabBarLabel: normalizeScreenTitle(navigation.state.routeName)
});

export default ContactsContainer;
