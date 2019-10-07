/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Container, Text, PlayerQueue, Header } from '../../../../components';
import PlayerAvatar from '../common/PlayerAvatar';

import styles from './styles';
import { localization } from '../../../../constants';
import SlotMachine from '../../../../components/SlotMachine/SlotMachine';

const RoundWinnerRandomizer = ({ songs, players, scenario, onQuitGame }) => {
  const renderHeader = () => <Header title={localization.winner} />;

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <ScrollView
        style={styles.topContainer}
        contentContainerStyle={styles.topContentContainer}
      >
        <Text style={styles.scenario}>{scenario}</Text>
      </ScrollView>

      <Container
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <SlotMachine
          text={['WHEN A MAN LOVES A WOMAN']}
          range={['WHEN A MAN LOVES A WOMAN', 'HOW DEEP IS YOUR LOVE']}
        />
      </Container>

      <View style={styles.playerQueueContainer}>
        <PlayerQueue
          joinedPlayers={players}
          maxPlayers={5}
          renderItem={player => <PlayerAvatar player={player} showBadge />}
        />
      </View>
    </Container>
  );
};

RoundWinnerRandomizer.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      singer: PropTypes.string,
      albumCover: PropTypes.string
    })
  ),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    })
  ).isRequired,
  scenario: PropTypes.string.isRequired,
  onQuitGame: PropTypes.func
};

RoundWinnerRandomizer.defaultProps = {
  songs: [],
  onQuitGame: () => null
};

export default RoundWinnerRandomizer;
