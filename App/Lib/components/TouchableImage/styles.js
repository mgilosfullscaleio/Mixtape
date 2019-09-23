import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },

  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '-10@s',
    right: '-2@s',
    zIndex: '2@s',
    width: '25@s',
    height: undefined,
    aspectRatio: 1,
    borderRadius: '12.5@s',
    backgroundColor: colors.orange
  },

  badgeText: {
    color: colors.white,
    textAlign: 'center'
  }
});

export default styles;
