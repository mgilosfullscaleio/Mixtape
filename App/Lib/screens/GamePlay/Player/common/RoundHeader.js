import React from 'react';
import PropTypes from 'prop-types';
import { Header, Text } from '../../../../components';

import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';
import { localization } from '../../../../constants';

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

  title: {
    fontSize: '28@s'
  },

  timeLeft: {
    fontSize: '45@s',
    color: colors.white,
    alignSelf: 'center'
  }
});

const RoundHeader = ({ title, round, timeLeft }) => (
  <Header
    title={title || localization[`round${round}`]}
    titleStyle={styles.title}
    style={styles.header}
    leftContainerStyle={styles.sideContainer}
    rightContainerStyle={styles.sideContainer}
    right={<Text style={styles.timeLeft}>{timeLeft}</Text>}
  />
);

RoundHeader.propTypes = {
  title: PropTypes.string,
  round: PropTypes.number,
  timeLeft: PropTypes.number.isRequired
};

RoundHeader.defaultProps = {
  title: null,
  round: null
};

export default RoundHeader;
