import { ScaledSheet } from '../../../../utils';
import { widthPercentage } from '../../../../utils/scaleUtil';

const styles = ScaledSheet.create({
  container: {
    width: widthPercentage(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1
  },

  contentContainer: {
    alignItems: 'center'
  },

  productImageContainer: {
    width: widthPercentage(18),
    height: undefined,
    aspectRatio: 1.07
  },

  productImage: {
    flex: 1,
    width: undefined,
    height: undefined
  },

  footer: {
    alignItems: 'center'
  },

  price: {
    fontSize: '35@s',
    marginBottom: '5@s'
  },

  purchaseButtonImage: {
    width: '70%',
    height: undefined,
    aspectRatio: 1.94,
    marginBottom: '2@s'
  }
});

export default styles;
