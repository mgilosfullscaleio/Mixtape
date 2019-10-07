import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@s',
    paddingVertical: '11@s',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white
  },

  sideIcon: {
    width: 36,
    height: undefined,
    aspectRatio: 1
  },

  details: {
    flex: 1,
    marginLeft: '12@s',
    justifyContent: 'center'
  },

  title: {
    fontSize: 22,
    textTransform: 'uppercase'
  },

  singer: {
    fontSize: 12,
    textTransform: 'uppercase'
  }
});

export default styles;
