import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Image } from 'react-native';
import { Card, Text, TouchableImage } from '../../../../components';

import styles from './styles';
import { images } from '../../../../constants';

const ProductCard = ({
  children,
  productImageSource,
  price,
  onPurchase,
  containerStyle,
  contentContainerStyle,
  ...props
}) => (
  <Card
    containerStyle={[styles.container, containerStyle]}
    contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
    footer={
      <View style={styles.footer}>
        <Text style={styles.price}>{`$${price.toFixed(2)}`}</Text>
        <TouchableImage
          source={images.purchaseButton}
          imageStyle={styles.purchaseButtonImage}
          onPress={onPurchase}
        />
      </View>
    }
    {...props}
  >
    <View style={styles.productImageContainer}>
      <Image source={productImageSource} style={styles.productImage} />
    </View>

    {children}
  </Card>
);

ProductCard.propTypes = {
  children: PropTypes.node,
  productImageSource: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onPurchase: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style
};

ProductCard.defaultProps = {
  children: null,
  containerStyle: null,
  onPurchase: () => null,
  contentContainerStyle: null
};

export default ProductCard;
