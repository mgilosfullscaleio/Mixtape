import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { Header, Text } from '../../../../components';

import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';
import { localization } from '../../../../constants';

const styles = ScaledSheet.create({
  header: {
    paddingHorizontal: '20@s',
    height: '83@s'
  },

  sideContainer: {
    width: '45@s',
    height: '100%'
  },

  timeLeft: {
    fontSize: '45@s',
    color: colors.white,
    alignSelf: 'center'
  }
});

const RoundHeader = ({ title, round, timeLeft, rightElementType }) => {
  const rightElement =
    rightElementType === 'loading' ? (
      <ActivityIndicator size="large" color={colors.white} />
    ) : (
      <Text style={styles.timeLeft}>{timeLeft}</Text>
    );

  return (
    <Header
      title={title || localization[`round${round}`]}
      style={styles.header}
      leftContainerStyle={styles.sideContainer}
      rightContainerStyle={styles.sideContainer}
      right={rightElement}
    />
  );
};

RoundHeader.propTypes = {
  title: PropTypes.string,
  round: PropTypes.number,
  timeLeft: PropTypes.number.isRequired,
  rightElementType: PropTypes.oneOf(['timer', 'loading'])
};

RoundHeader.defaultProps = {
  title: null,
  round: null,
  rightElementType: 'timer'
};

export default RoundHeader;
