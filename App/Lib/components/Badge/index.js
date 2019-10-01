import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import Text from '../Text';

import { ScaledSheet } from '../../utils';
import scale from '../../utils/scaleUtil';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: undefined,
    aspectRatio: 1
  },

  orange: {
    backgroundColor: colors.orange
  },

  orangeBadgeCount: {
    color: colors.white
  },

  green: {
    backgroundColor: colors.spotifyGreen
  },

  greenBadgeCount: {
    color: colors.black
  }
});

const Badge = ({ style, size, type, value }) => {
  const sizeStyle = {
    width: scale(size),
    borderRadius: scale(size / 2)
  };
  const typeStyle = styles[type];

  const countSizeStyle = {
    fontSize: scale(size - 3)
  };
  const countStyle = styles[`${type}BadgeCount`];

  return (
    <View style={[styles.container, sizeStyle, typeStyle, style]}>
      <Text style={[styles.badgeText, countSizeStyle, countStyle]}>
        {value}
      </Text>
    </View>
  );
};

Badge.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number,
  type: PropTypes.oneOf(['orange', 'green']),
  value: PropTypes.number
};

Badge.defaultProps = {
  style: null,
  size: 20,
  type: 'orange',
  value: 0
};

export default Badge;
