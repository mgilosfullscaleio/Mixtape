import React from 'react';
import { Image, View } from 'react-native';
import { Card } from '../../../../components';

import { ScaledSheet } from '../../../../utils';
import { images } from '../../../../constants';
import { widthPercentage, heightPercentage } from '../../../../utils/scaleUtil';

const styles = ScaledSheet.create({
  container: {
    width: widthPercentage(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 25
  },

  title: {
    marginBottom: '75@s',
    paddingHorizontal: '10@s',
    paddingTop: '10@s',
    fontSize: '30@s'
  },

  box: {
    alignItems: 'center'
  },

  mixtapeImage: {
    width: '87@s',
    height: undefined,
    aspectRatio: 5.12
  }
});

const PlayCard = props => (
  <Card
    containerStyle={styles.container}
    titleStyle={styles.title}
    footer={
      <View style={styles.box}>
        <Image source={images.mixtape} style={styles.mixtapeImage} />
      </View>
    }
    withRibbon
    {...props}
  />
);

export default PlayCard;
