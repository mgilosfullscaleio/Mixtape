import { ScaledSheet } from '../../utils';
import { widthPercentage } from '../../utils/scaleUtil';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    padding: '10@s',
    borderRadius: '10@s',
    backgroundColor: colors.white
  },

  title: {
    fontSize: '35@s',
    color: colors.black
  },

  ribbon: {
    width: widthPercentage(12),
    height: undefined,
    aspectRatio: 0.67,
    marginRight: '25@s',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    zIndex: -1,
    marginTop: -5
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },

  ribbonTitle: {
    fontSize: '20@s',
    color: colors.white,
    textAlign: 'center',
    marginTop: 10
  }
});

export default styles;
