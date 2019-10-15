import React from 'react';
import PropTypes from 'prop-types';
import { Container, UserProfileHeader as Header } from '../../../components';
import PlayCard from './components/PlayCard';

import styles from './styles';
import { localization, screens } from '../../../constants';

const Home = props => {
  const renderHeader = () => <Header navigation={props.navigation} user={props.user} />;

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <PlayCard
        title={localization.playWithFriends}
        ribbonTitle={localization.free}
        onPress={() => navigation.navigate(screens.root.gamePlay)}
      />
      <PlayCard
        title={localization.playWithOthers}
        ribbonTitle={localization.oneDollar}
        //onPress={() => navigation.navigate(screens.home.lobby)}
        onPress={() => props.getMaximumPlayersByPlayWithOthers()}
      />
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    tapes: PropTypes.number,
    invitedFriends: PropTypes.number
  }).isRequired
};

export default Home;
