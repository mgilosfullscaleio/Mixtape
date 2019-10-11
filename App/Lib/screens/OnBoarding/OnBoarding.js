import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

import { images } from '../../constants';
import { Image } from 'react-native';
import Text from '../../components/Text/index';
import AppIntroSlider from 'react-native-app-intro-slider';
import Container from '../../components/Container/index';
import scale from '../../utils/scaleUtil';
import { colors } from '../../styles';

const slides = [
  {
    key: '1',
    title: 'GETTING STARTED',
    text:
      'Spotify is the only digital music service provider we' +
      ' use to play Mixtape. You will need a premium subscription in' +
      ' order to play. \n\nThere are more on the way in the near future!',
    image: images.spotifyButton,
    imageStyle: { marginTop: scale(75), width: scale(227), aspectRatio: 2.67 },
    textStyle: { marginTop: scale(75) }
  },
  {
    key: '2',
    title: 'GAME PLAY',
    text:
      'You can pick who you want to play with!' +
      '\n\nPlay with people you know or' +
      '\nPlay with Mixtapians around the world!',
    image: images.gamePlay,
    imageStyle: { marginTop: scale(5), width: scale(300), aspectRatio: 1.29 },
    textStyle: { marginTop: scale(20) }
  },
  {
    key: '3',
    title: 'LOBBY HOST\n(Play with friends)',
    text:
      'Invite friends via Facebook or your contacts.' +
      '\nYou can invite your friends with a link!',
    image: images.lobbyHostFriends,
    imageStyle: { marginTop: scale(60), width: scale(280), aspectRatio: 1.88 },
    textStyle: { marginTop: scale(60) }
  },
  {
    key: '4',
    title: 'FRIENDS\n(Facebook)',
    text:
      'Check the box on the right and hit send to invite Facebook friends that have installed Mixtape',
    image: images.facebookFriends,
    imageStyle: { marginTop: scale(5), width: scale(260), aspectRatio: 0.96 },
    textStyle: { marginTop: scale(15) }
  },
  {
    key: '5',
    title: 'FRIENDS\n(Contacts)',
    text:
      'Check the box on the right and hit send to invite contacts to a new game',
    image: images.contactFriends,
    imageStyle: { marginTop: scale(5), width: scale(260), aspectRatio: 0.91 },
    textStyle: { marginTop: scale(15) }
  },
  {
    key: '6',
    title: 'LOBBY\n(Play with others)',
    text: 'Hang tight! Once 5 players join the lobby, \nthe game will start',
    image: images.lobbyOthers,
    imageStyle: { marginTop: scale(60), width: scale(280), aspectRatio: 1.98 },
    textStyle: { marginTop: scale(60) }
  }
];

const OnBoarding = ({ onDone, onSkip }) => (
  <AppIntroSlider
    renderItem={({ item }) => {
      return (
        <Container contentContainerStyle={styles.container}>
          <Text style={[styles.title, item.titleStyle]}>{item.title}</Text>
          <Image style={[styles.image, item.imageStyle]} source={item.image} />
          <Text style={[styles.text, item.textStyle]}>{item.text}</Text>
        </Container>
      );
    }}
    slides={slides}
    showPrevButton
    showSkipButton
    dotStyle={{ backgroundColor: colors.white }}
    activeDotStyle={{ backgroundColor: colors.spotifyGreen }}
    onDone={onDone}
    onSkip={onSkip}
  />
);

OnBoarding.propTypes = {
  onDone: PropTypes.func,
  onSkip: PropTypes.func
};

OnBoarding.defaultProps = {
  onDone: () => null,
  onSkip: () => null
};

export default OnBoarding;
