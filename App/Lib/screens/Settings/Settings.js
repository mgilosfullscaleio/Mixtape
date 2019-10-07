import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Container,
  Button,
  Header,
  Avatar,
  Text,
  TextInput
} from '../../components';

import styles from './styles';
import { localization } from '../../constants';

const Settings = ({ user, onLogout }) => {
  const renderHeader = () => <Header title={localization.profile} />;

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <Avatar
        style={styles.avatar}
        size={60}
        source={{ uri: user.profileImage }}
      />

      <View>
        <TextInput label={localization.username} defaultValue={user.name} />
        <TextInput
          containerStyle={styles.email}
          label={localization.email}
          defaultValue={user.email}
          editable={false}
        />
      </View>

      <Button
        style={styles.button}
        title={localization.logout}
        onPress={onLogout}
      />
    </Container>
  );
};

Settings.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    tapes: PropTypes.number,
    profileImage: PropTypes.string
  }).isRequired,
  onLogout: PropTypes.func
};

Settings.defaultProps = {
  onLogout: () => null
};

export default Settings;
