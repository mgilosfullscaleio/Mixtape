import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import Button from '../../../components/Button';

import { ScaledSheet } from '../../../utils';
import { localization } from '../../../constants';

const styles = ScaledSheet.create({
  button: {
    width: '70%',
    alignSelf: 'center'
  }
});

const InviteButton = ({ style, invitesCount, ...props }) => (
  <Button
    style={[styles.button, style]}
    title={localization.sendInvites(invitesCount)}
    {...props}
  />
);

InviteButton.propTypes = {
  style: ViewPropTypes.style,
  invitesCount: PropTypes.number
};

InviteButton.defaultProps = {
  style: {},
  invitesCount: 0
};

export default InviteButton;
