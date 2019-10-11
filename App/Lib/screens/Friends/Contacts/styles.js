import { ScaledSheet } from '../../../utils';
import { colors } from '../../../styles';

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '20@s'
  },

  title: {
    paddingHorizontal: '20@s',
    paddingVertical: '5@s',
    color: colors.white,
    fontSize: '18@s',
    textTransform: 'uppercase',
    backgroundColor: colors.darkerGray
  },

  list: {
    marginVertical: '20@s'
  },

  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  enableButton: {
    width: '70%'
  },

  separator: {
    height: '21@s'
  }
});

export default styles;
