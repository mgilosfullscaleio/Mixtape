import { ScaledSheet, scaleUtils } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center'
  },

  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.67
  },

  title: {
    marginTop: '40@s',
    fontSize: '25@s',
    color: colors.white,
    textAlign: 'center'
  },

  logoContainer: {
    marginTop: '60@s',
    alignItems: 'center',
    paddingHorizontal: '24@s'
  },

  buttonsContainer: {
    marginTop: '40@s',
    alignItems: 'center',
    paddingHorizontal: '53@s'
  },

  button: {
    width: '227@s',
    height: undefined,
    aspectRatio: 2.67
  },

  phoneButton: {
    marginTop: '10@s'
  }
});

export default styles;
