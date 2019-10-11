/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  ViewPropTypes,
  Text as BaseText
} from 'react-native';
import AlertCloseButton from './AlertCloseButton';
import Modal from 'react-native-modal';

import styles from './styles';
import AlertButton from './AlertButton';
import { localization } from '../../constants';

const getAlertButtonType = (index, length) => {
  if (length === 1) {
    return 'single';
  }

  if (index === 0) {
    return 'left';
  }

  if (index === length - 1) {
    return 'right';
  }

  return 'middle';
};

const Alert = ({
  children,
  isVisible,
  containerStyle,
  contentContainerStyle,
  options,
  onClose
}) => (
  <Modal
    isVisible={isVisible}
    backdropOpacity={0.6}
    animationIn="tada"
    animationOut="bounceOut"
  >
    <View style={[styles.container, containerStyle]}>
      <AlertCloseButton onPress={onClose} />

      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>

      <View style={styles.optionsContainer}>
        {options.map(({ title, style, titleStyle, onPress }, index) => (
          <AlertButton
            key={`alert-button-${index}`}
            type={getAlertButtonType(index, options.length)}
            title={title}
            style={style}
            titleStyle={titleStyle}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  </Modal>
);

Alert.propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      style: ViewPropTypes.style,
      titleStyle: BaseText.propTypes.style,
      onPress: PropTypes.func
    })
  ),
  onClose: PropTypes.func
};

Alert.defaultProps = {
  children: null,
  isVisible: false,
  containerStyle: {},
  contentContainerStyle: {},
  options: [
    {
      title: localization.okay
    }
  ],
  onClose: () => null
};

export default Alert;
