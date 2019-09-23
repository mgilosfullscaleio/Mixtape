import { ScaledSheet, scaleUtils } from '../../../utils';
import { colors } from '../../../styles';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '20@s',
    paddingVertical: '40@s',
    alignItems: 'center'
  },

  logo: {
    width: scaleUtils.widthPercentage(89),
    height: undefined,
    aspectRatio: 1.67
  },

  title: {
    marginVertical: '70@s',
    fontSize: '30@s',
    textAlign: 'center',
    color: colors.white
  },

  requireSpotify: {
    marginTop: '20@s',
    marginBottom: '40@s',
    fontSize: '20@s',
    textAlign: 'center',
    color: colors.white
  },

  button: {
    width: scaleUtils.widthPercentage(73),
    height: undefined,
    aspectRatio: 3.87,
    borderRadius: scaleUtils.widthPercentage(9.43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.spotifyGreen
  },

  buttonImage: {
    width: scaleUtils.widthPercentage(38),
    height: undefined,
    aspectRatio: 3.33,
    tintColor: colors.white
  }
});

export default styles;
