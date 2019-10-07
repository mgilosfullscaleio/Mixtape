/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, SectionList } from 'react-native';
import { Container, Text } from '../../../components';
import SearchBar from '../common/SearchBar';
import ContactListItem from '../common/FriendListItem';
import InviteButton from '../common/InviteButton';

import styles from './styles';

const Contacts = ({
  contacts,
  onMarkContact,
  onChangeSearchText,
  onSendInvite
}) => {
  const renderItem = ({ item, index }) => (
    <ContactListItem
      title={item.name}
      subtitle={item.number}
      marked={item.marked}
      onCheckBoxPress={() => onMarkContact(item, index)}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.title}>{title}</Text>
  );

  return (
    <Container contentContainerStyle={styles.container}>
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

      <InviteButton onPress={onSendInvite} />
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
  onMarkContact: PropTypes.func,
  onChangeSearchText: PropTypes.func,
  onSendInvite: PropTypes.func
};

Contacts.defaultProps = {
  contacts: [],
  onMarkContact: () => null,
  onChangeSearchText: () => null,
  onSendInvite: () => null
};

export default Contacts;
