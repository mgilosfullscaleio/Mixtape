import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Container, UserProfileHeader as Header, Text } from '../../components';
import ProductCard from './components/ProductCard/ProductCard';

import styles from './styles';
import { localization, images } from '../../constants';

const Shop = ({ navigation, user }) => {
  const renderHeader = () => <Header navigation={navigation} user={user} />;

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <View style={styles.content}>
        <ProductCard
          price={20}
          productImageSource={images.mixtapeBox}
          containerStyle={styles.leftCard}
        >
          <Image
            source={images.breakingGamesLogo}
            style={styles.breakingGamesLogo}
          />
        </ProductCard>

        <ProductCard
          price={5}
          productImageSource={images.coinsGold}
          contentContainerStyle={styles.rightCardContent}
          containerStyle={styles.rightCardContainer}
        >
          <Text style={styles.gameCredits}>
            {localization.twentyGameCredits}
          </Text>
        </ProductCard>
      </View>
    </Container>
  );
};

Shop.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    tapes: PropTypes.number,
    invitedFriends: PropTypes.number
  }).isRequired
};

export default Shop;
