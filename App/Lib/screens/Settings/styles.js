import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '18@s',
    paddingTop: '30@s'
  },

  avatar: {
    alignSelf: 'center',
    marginBottom: '15@s'
  },

  inputLabel: {
    color: colors.orange,
    fontSize: 22
  },

  input: {
    fontFamily: 'AkzidenzGroteskBE-Cn',
    paddingVertical: '2@s',
    fontSize: 22,
    color: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.white
  },

  email: {
    marginTop: '30@s'
  },

  button: {
    alignSelf: 'center',
    width: '70%',
    marginTop: '110@s'
  }
});

export default styles;
