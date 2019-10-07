import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  leftIcon: {
    width: 35,
    height: undefined,
    aspectRatio: 1
  },

  title: {
    flex: 1,
    fontSize: 24,
    marginLeft: '19@s',
    color: colors.white
  }
});

export default styles;
