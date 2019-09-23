import React from 'react';
import PropTypes from 'prop-types';
import { Header, Text } from '../../../../../components';

import { ScaledSheet } from '../../../../../utils';
import { colors } from '../../../../../styles';
import { localization } from '../../../../../constants';

const styles = ScaledSheet.create({
  header: {
    paddingTop: '13@s',
    paddingBottom: '13@s',
    paddingHorizontal: '20@s'
  },

  sideContainer: {
    width: '45@s',
    height: '100%'
  },

  timeLeft: {
    fontSize: '52@s',
    color: colors.white,
    alignSelf: 'center'
  }
});

const RoundHeader = ({ round, timeLeft }) => (
  <Header
    title={localization[`round${round}`]}
    style={styles.header}
    leftContainerStyle={styles.sideContainer}
    rightContainerStyle={styles.sideContainer}
    right={<Text style={styles.timeLeft}>{timeLeft}</Text>}
  />
);

RoundHeader.propTypes = {
  round: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired
};

export default RoundHeader;
