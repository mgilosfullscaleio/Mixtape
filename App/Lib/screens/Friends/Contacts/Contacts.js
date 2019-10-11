/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, SectionList } from 'react-native';
import { Container, Text, Button } from '../../../components';
import SearchBar from '../common/SearchBar';
import ContactListItem from '../common/FriendListItem';
import InviteButton from '../common/InviteButton';

import styles from './styles';
import { localization } from '../../../constants';

const Contacts = ({
  contacts,
  markedContacts,
  isEnabled,
  onMarkContact,
  onChangeSearchText,
  onSendInvite,
  onEnable
}) => {
  const renderItem = ({ item, index, section }) => (
    <ContactListItem
      title={item.name}
      subtitle={item.number}
      marked={item.marked}
      onCheckBoxPress={() => onMarkContact(item, index, section.title)}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.title}>{title}</Text>
  );

  return (
    <Container contentContainerStyle={styles.container}>
      {isEnabled ? (
        <>
          <SearchBar
            containerStyle={styles.searchBar}
            onChangeSearchText={onChangeSearchText}
          />

          <SectionList
            style={styles.list}
            sections={contacts}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />

          <InviteButton invitesCount={markedContacts} onPress={onSendInvite} />
        </>
      ) : (
        <View style={styles.middleContainer}>
          <Button
            style={styles.enableButton}
            title={localization.enableContacts}
            onPress={onEnable}
          />
        </View>
      )}
    </Container>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string,
      marked: PropTypes.bool
    })
  ),
  markedContacts: PropTypes.number,
  isEnabled: PropTypes.bool,
  onMarkContact: PropTypes.func,
  onChangeSearchText: PropTypes.func,
  onSendInvite: PropTypes.func,
  onEnable: PropTypes.func
};

Contacts.defaultProps = {
  contacts: [],
  markedContacts: 0,
  isEnabled: false,
  onMarkContact: () => null,
  onChangeSearchText: () => null,
  onSendInvite: () => null,
  onEnable: () => null
};

export default Contacts;
