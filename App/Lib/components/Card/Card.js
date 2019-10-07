import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Text from '../Text';

import { images } from '../../constants';
import styles from './styles';

const Card = ({
  children,
  containerStyle,
  contentContainerStyle,
  title,
  titleStyle,
  footer,
  withRibbon,
  ribbonTitle,
  ribbonStyle,
  ribbonTitleStyle,
  onPress
}) => {
  const Component = onPress ? TouchableOpacity : View;

  const renderRibbon = () => (
    <ImageBackground
      source={images.cardRibbon}
      style={[styles.ribbon, ribbonStyle]}
      imageStyle={styles.image}
    >
      <Text style={[styles.ribbonTitle, ribbonTitleStyle]}>{ribbonTitle}</Text>
    </ImageBackground>
  );

  return (
    <Component onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        <View style={contentContainerStyle}>{children}</View>

        {footer}
      </View>

      {withRibbon && renderRibbon()}
    </Component>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  footer: PropTypes.node,
  withRibbon: PropTypes.bool,
  ribbonTitle: PropTypes.string,
  ribbonStyle: ViewPropTypes.style,
  ribbonTitleStyle: Text.propTypes.style,
  onPress: PropTypes.func
};

Card.defaultProps = {
  children: null,
  containerStyle: null,
  contentContainerStyle: null,
  title: null,
  titleStyle: null,
  footer: null,
  withRibbon: false,
  ribbonTitle: null,
  ribbonStyle: null,
  ribbonTitleStyle: null,
  onPress: null
};

export default Card;
